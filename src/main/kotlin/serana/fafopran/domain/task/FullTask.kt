package serana.fafopran.domain.task

import serana.fafopran.domain.attachment.TaskAttachment

data class FullTask(
    val id: Long,
    val conditionType: ConditionType,
    val name: String,
    val description: String?,
    val attachments: List<TaskAttachment>?,
)
