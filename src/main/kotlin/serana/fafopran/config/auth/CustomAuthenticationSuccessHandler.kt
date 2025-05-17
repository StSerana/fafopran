package serana.fafopran.config.auth

import org.springframework.http.ResponseCookie
import org.springframework.security.core.Authentication
import org.springframework.security.web.server.WebFilterExchange
import org.springframework.security.web.server.authentication.ServerAuthenticationSuccessHandler
import reactor.core.publisher.Mono
import reactor.kotlin.core.publisher.toMono

class CustomAuthenticationSuccessHandler : ServerAuthenticationSuccessHandler {

    private val SECRET_COOKIE_NAME = "secret"
    private val SECRET_COOKIE_VALUE =
        "MDExMTEwMTEgMDAxMDAwMTAgMDExMDEwMDEgMDExMTAwMTEgMDEwMTExMTEgMDExMDAwMDEgMDExMDAxMDAgMDExMDExMDEgMDExMDEwMDEgMDExMDExMTAgMDAxMDAwMTAgMDAxMTEwMTAgMDAxMDAwMTAgMDEwMDAxMTAgMDExMDAwMDEgMDExMDExMDAgMDExMTAwMTEgMDExMDAxMDEgMDAxMDAwMTAgMDExMTExMDE="

    override fun onAuthenticationSuccess(
        webFilterExchange: WebFilterExchange?,
        authentication: Authentication?,
    ): Mono<Void> {
        return webFilterExchange.toMono()
            .flatMap {
                if (it.exchange.request.cookies.getFirst(SECRET_COOKIE_NAME) == null) {
                    val cookie = ResponseCookie.from(SECRET_COOKIE_NAME, SECRET_COOKIE_VALUE)
                        .path("/")
                        .sameSite("Lax")
                        .build()

                    it.exchange.response.addCookie(cookie)
                }
                return@flatMap Mono.empty<Void>()
            }
            .then()
    }
}
