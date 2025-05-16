package serana.fafopran.domain.statistics

import org.springframework.data.r2dbc.repository.Modifying
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Mono
import java.time.Instant
import java.util.*


@Repository
interface StatisticsRepository : ReactiveCrudRepository<Statistic, UUID> {
    @Query("select * from statistics s where s.team_id = :teamId and s.task_id = :taskId")
    fun findByTeamAndTask(teamId: Long, taskId: Long): Mono<Statistic>

    @Modifying
    @Query("update statistics s set attempts_count = attempts_count + 1, solved = :solved, last_answer = :time  where s.team_id = :teamId and s.task_id = :taskId")
    fun updateStatistics(solved: Boolean, teamId: Long, taskId: Long, time: Instant): Mono<Int>

//    @Query("select * from statistics s left join team t on s. ")
//    override fun findAll(): Flux<TeamInfo>

//    interface  TeamInfo {
//        fun getName(): String
//        fun getTasks(): TaskInfo
//    }
//
//    interface TaskInfo {
//        fun getTaskId() : Long
//        fun getAttempts() : Int
//        fun isSolved(): Boolean
//    }
}