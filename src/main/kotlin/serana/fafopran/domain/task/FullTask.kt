package serana.fafopran.domain.task

data class FullTask(
    val id: Long,
    val conditionType: ConditionType,
    val name: String,
    val description: String?,
    val attachments: List<String>?,
)
