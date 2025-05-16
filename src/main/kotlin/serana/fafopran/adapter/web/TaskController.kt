package serana.fafopran.adapter.web

import lombok.RequiredArgsConstructor
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import serana.fafopran.domain.task.FullTask
import serana.fafopran.domain.task.ShortTask
import serana.fafopran.domain.task.TaskService

@RestController
@RequiredArgsConstructor
class TaskController(private val taskService: TaskService) {

    @GetMapping("/tasks")
    fun getTasks(): Flux<ShortTask> {
        return taskService.getAllTasks()
        //return Flux.fromIterable(listOf(Task(1, ConditionType.WEB, "test", null, "123")))
    }

    @GetMapping("/tasks/{taskId}")
    fun getTask(@PathVariable taskId: Long): Mono<FullTask> {
        return taskService.getTask(taskId)
    }
}