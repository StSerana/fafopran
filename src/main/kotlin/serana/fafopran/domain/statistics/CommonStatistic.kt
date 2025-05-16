package serana.fafopran.domain.statistics

import reactor.core.publisher.Mono

data class CommonStatistic(
    val info: List<TeamInfo>,
) {

    data class TeamInfo(
        val name: String,
        val score: Mono<Map<Long, TaskScore>>?,
    )

    data class TaskScore(
        val id: Long,
        val attempts: Int,
        val solved: Boolean,
    )
}