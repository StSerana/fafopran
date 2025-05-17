package serana.fafopran.domain.task

import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Mono

interface TaskRepository : ReactiveCrudRepository<Task, Long> {

    fun findByIdAndConditionType(id: Long, type: ConditionType): Mono<Task>

}