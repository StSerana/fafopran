package serana.fafopran.adapter.web

import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono
import reactor.kotlin.core.publisher.toMono
import serana.fafopran.domain.auth.LoginResponse
import serana.fafopran.domain.user.UserPrincipal
import java.time.Duration

@RestController
@RequestMapping("/public/login")
class LoginController {

    @GetMapping("/isAuthenticated")
    fun isAuthenticated(
        @AuthenticationPrincipal user: UserPrincipal?,
    ): Mono<LoginResponse> {

        return if (user != null) LoginResponse(true).toMono() else LoginResponse(false).toMono()
    }

    @PostMapping
    fun login(
        @AuthenticationPrincipal user: UserPrincipal?,
    ): Mono<LoginResponse> {

        return if (user != null) LoginResponse(true).toMono() else LoginResponse(false).toMono()
    }
}