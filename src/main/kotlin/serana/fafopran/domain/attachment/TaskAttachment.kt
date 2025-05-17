package serana.fafopran.domain.attachment

data class TaskAttachment(
    val aType: AttachmentType,
    val path: String,
    val context: Any?,
)
