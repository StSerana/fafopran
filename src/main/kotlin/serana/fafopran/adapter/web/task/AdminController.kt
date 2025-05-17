package serana.fafopran.adapter.web.task

import org.springframework.web.bind.annotation.CookieValue
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono
import serana.fafopran.adapter.web.TaskResolution
import java.net.URLDecoder

@RestController
@RequestMapping("/api/admin")
class AdminController {

    private val SECRET_VALUE: String =
        "MDExMTEwMTEgMDAxMDAwMTAgMDExMDEwMDEgMDExMTAwMTEgMDEwMTExMTEgMDExMDAwMDEgMDExMDAxMDAgMDExMDExMDEgMDExMDEwMDEgMDExMDExMTAgMDAxMDAwMTAgMDAxMTEwMTAgMDAxMDAwMTAgMDEwMTAxMDAgMDExMTAwMTAgMDExMTAxMDEgMDExMDAxMDEgMDAxMDAwMTAgMDExMTExMDE="

    @PostMapping("/admintask")
    fun adminTask(@CookieValue("secret") cookieValue: String?): Mono<TaskResolution> {
        val isAccepted = URLDecoder.decode(cookieValue, "UTF-8") == SECRET_VALUE
        if (isAccepted) return Mono.just(TaskResolution("V0VCVA==11SVNBRE1JTlVOTE9DS0VE"))
        return Mono.just(TaskResolution("You must be admin!"))
    }

}