package serana.fafopran.domain.attachment

import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux

@Repository
interface AttachmentRepository : ReactiveCrudRepository<Attachment, Long> {

    fun findByTaskId(taskId: Long): Flux<Attachment>
}