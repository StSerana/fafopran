package serana.fafopran.adapter.web

import org.springframework.util.StringUtils
import org.springframework.web.bind.annotation.CookieValue
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono

@RestController
@RequestMapping("/api/admin")
class AdminController {

    @PostMapping("/admintask")
    fun adminTask(@CookieValue("secret") cookieValue: String) : Mono<TaskResolution> {
        if (!StringUtils.hasText(cookieValue)) return Mono.just(TaskResolution("V0VCVA==11qwerty"))
        return Mono.just(TaskResolution("You must be admin!"))
    }

}