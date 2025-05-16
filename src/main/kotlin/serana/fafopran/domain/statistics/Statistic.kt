package serana.fafopran.domain.statistics

import org.springframework.data.relational.core.mapping.Table
import java.time.Instant
import java.util.*

@Table(value = "statistics")
class Statistic(
    val id: UUID,
    val teamId: Long,
    val taskId: Long,
    var attemptsCount: Int = 0,
    var solved: Boolean = false,
    var lastAnswer: Instant?,
)
