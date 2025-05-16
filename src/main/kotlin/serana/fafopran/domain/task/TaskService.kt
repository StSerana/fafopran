package serana.fafopran.domain.task

import lombok.RequiredArgsConstructor
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
@RequiredArgsConstructor
class TaskService(private val taskRepository: TaskRepository) {

    @Transactional(readOnly = true)
    fun getAllTasks(): Flux<ShortTask> {
        return taskRepository.findAll()
            .map { ShortTask(it.id, it.name) }
    }

    @Transactional(readOnly = true)
    fun getTask(taskId: Long): Mono<FullTask> {
        return taskRepository.findById(taskId)
            .map { FullTask(it.id, it.conditionType, it.name, it.description, listOf()) }
    }
}
