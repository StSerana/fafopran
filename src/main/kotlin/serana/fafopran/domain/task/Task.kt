package serana.fafopran.domain.task

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table

@Table(value = "tasks")
data class Task(
    @Id
    val id: Long,
    val conditionType: ConditionType,
    val name: String,
    val description: String?,
    val answer: String,
    val weight: Int,
) {
}
