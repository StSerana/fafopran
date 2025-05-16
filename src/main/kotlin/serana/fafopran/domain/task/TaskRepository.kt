package serana.fafopran.domain.task

import org.springframework.data.repository.reactive.ReactiveCrudRepository

interface TaskRepository : ReactiveCrudRepository<Task, Long> {

}