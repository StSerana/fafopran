package serana.fafopran.config.auth

import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.core.context.SecurityContextImpl
import org.springframework.security.web.server.authentication.ServerHttpBasicAuthenticationConverter
import org.springframework.security.web.server.context.WebSessionServerSecurityContextRepository
import org.springframework.stereotype.Component
import org.springframework.web.server.ServerWebExchange
import reactor.core.publisher.Mono
import reactor.kotlin.core.publisher.toMono
import serana.fafopran.domain.auth.SessionRepository
import serana.fafopran.domain.auth.UserSession
import java.util.*

@Component
class CustomSecurityContextRepository(
    private val sessionRepository: SessionRepository,
) : WebSessionServerSecurityContextRepository() {

    val basicConverter = ServerHttpBasicAuthenticationConverter()

    override fun save(exchange: ServerWebExchange?, context: SecurityContext?): Mono<Void> {

        val authentication: AuthorizedToken = context?.authentication as AuthorizedToken
        if (authentication.isAuthenticated) {
            exchange!!.attributes["authentication_session_id"] = authentication.credentials
            return exchange.toMono()
                .then(super.save(exchange, context))
                .then(
//                    exchange!!.session
//                        .flatMap { s ->
//                            sessionRepository.findById(UUID.fromString(s.id))
//                                .sw
//                        }
//                        .then()
//                )
                    sessionRepository.findById(authentication.credentials as UUID)
                        .switchIfEmpty(exchange.session.flatMap {
                            exchange.attributes["authentication_id"] = authentication.credentials
                            sessionRepository.save(
                                UserSession.of(
                                    authentication.credentials as UUID,
                                    authentication
                                )
                            )
                        }
                        ).then())


        }
        return Mono.empty()
    }

    override fun load(exchange: ServerWebExchange?): Mono<SecurityContext> {
        return super.load(exchange).flatMap { it.authentication.toMono() }
            .cast(Authentication::class.java)
            .switchIfEmpty(basicConverter.convert(exchange))
            .flatMap { SecurityContextImpl(it).toMono() }
//        return super.load(exchange)
//            .switchIfEmpty(basicConverter.convert(exchange)
//                .flatMap { SecurityContextImpl(it).toMono() })
//                .switchIfEmpty(cookie(exchange).flatMap { c ->
//            sessionRepository.findById(c)
//                .flatMap {
//                    val token = AuthorizedToken(c, it.username, it.createdAt, it.expiresAt)
//                    token.isAuthenticated = true
//                    SecurityContextImpl(token).toMono()
//                }
//        }))
    }

//    private fun cookie(exchange: ServerWebExchange?): Mono<UUID> {
//        val cookies = exchange!!.request.cookies
//        val session = cookies.getFirst("CSESSION")?.value
//        return if (session != null) UUID.fromString(session).toMono() else Mono.empty()
//    }
}