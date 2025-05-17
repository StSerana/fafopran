package serana.fafopran.domain.task

import lombok.RequiredArgsConstructor
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import reactor.kotlin.core.publisher.toMono
import serana.fafopran.domain.attachment.AttachmentRepository
import serana.fafopran.domain.attachment.TaskAttachment

@Service
@RequiredArgsConstructor
class TaskService(
    private val taskRepository: TaskRepository,
    private val attachmentRepository: AttachmentRepository,
) {

    @Transactional(readOnly = true)
    fun getAllTasks(): Flux<ShortTask> {
        return taskRepository.findAllByOrderById()
            .map { ShortTask(it.id, it.name) }
    }

    @Transactional(readOnly = true)
    fun getTask(taskId: Long): Mono<FullTask> {
        return taskRepository.findById(taskId)
            .flatMap {
                attachmentRepository.findByTaskId(it.id)
                    .map { a -> TaskAttachment(a.aType, a.path, a.context) }
                    .collectList()
                    .flatMap { a -> FullTask(it.id, it.conditionType, it.name, it.description, a).toMono() }
                    .switchIfEmpty(FullTask(it.id, it.conditionType, it.name, it.description, listOf()).toMono())
            }
    }
}
