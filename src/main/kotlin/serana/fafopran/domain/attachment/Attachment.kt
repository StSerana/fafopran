package serana.fafopran.domain.attachment

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table

@Table(value = "attachments")
data class Attachment(
    @Id
    val id: Long,
    val aType: AttachmentType,
    val path: String,
    val taskId: Long,
    val context: Any?,
) {
}