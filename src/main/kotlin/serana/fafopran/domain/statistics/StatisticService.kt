package serana.fafopran.domain.statistics

import lombok.RequiredArgsConstructor
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import reactor.core.scheduler.Schedulers
import reactor.kotlin.core.publisher.toMono
import serana.fafopran.adapter.web.advice.FlagException
import serana.fafopran.domain.task.TaskRepository
import serana.fafopran.domain.team.TeamRepository
import serana.fafopran.domain.user.UserPrincipal
import java.time.Instant
import java.util.*

private val logger = LoggerFactory.getLogger("StatisticService")

@Service
@RequiredArgsConstructor
class StatisticService(
    private val statisticsRepository: StatisticsRepository,
    private val teamRepository: TeamRepository,
    private val taskRepository: TaskRepository,
) {

    @Transactional(readOnly = true)
    fun loadStatistics(): Flux<TeamInfo> {
        return teamRepository.findAll()
            .collectMap { it.id }
            .flatMapMany { teamMap ->
                statisticsRepository.findAll().groupBy { it.teamId }
                    .publishOn(Schedulers.boundedElastic())
                    .map { g ->
                        TeamInfo(g.key(), teamMap[g.key()]!!.name,
                            g.map { score ->
                                TaskScore(
                                    score.taskId,
                                    score.attemptsCount,
                                    score.solved,
                                    score.lastAnswer
                                )
                            }
                                .collectMap { k -> k.id }
                                .blockOptional().orElseGet { null })
                    }
            }
    }

    @Transactional
    fun captureTheFlag(userFlag: UserFlag, userPrincipal: Mono<UserPrincipal>): Mono<FlagResponse> {
        logger.info("Capture: {}", userFlag)

        return userPrincipal.map { user -> user.getTeamId() }
            .flatMap { teamId ->
                taskRepository.findByIdAndConditionType(userFlag.flag.task, userFlag.flag.type)
                    .flatMap { task ->
                        val result = task.answer == userFlag.flag.answer
                        statisticsRepository.findByTeamAndTask(teamId, userFlag.flag.task)
                            .log()
                            .flatMap { found ->
                                if (found.solved) {
                                    Mono.error(FlagException.alreadySolved())
                                } else {
                                    statisticsRepository.updateStatistics(
                                        result,
                                        found.teamId,
                                        found.taskId,
                                        Instant.now()
                                    )
                                        .map { FlagResponse(result) }
                                }
                            }
                            .switchIfEmpty(
                                statisticsRepository.save(
                                    Statistic(
                                        UUID.randomUUID(),
                                        teamId,
                                        userFlag.flag.task,
                                        1,
                                        result,
                                        Instant.now()
                                    )
                                )
                                    .map { FlagResponse(result) }
                            )
                    }
                    .switchIfEmpty(FlagResponse(false).toMono())
            }
            .switchIfEmpty(FlagResponse(false).toMono())
    }

    data class TeamInfo(
        val id: Long,
        val name: String,
        val score: Map<Long, TaskScore>?,
    )

    data class TaskScore(
        val id: Long,
        val attempts: Int,
        val solved: Boolean,
        val lastAttempt: Instant?,
    )
}