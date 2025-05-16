package serana.fafopran.config.auth

import org.springframework.security.core.Authentication
import org.springframework.security.web.server.authentication.ServerAuthenticationConverter
import org.springframework.security.web.server.authentication.ServerHttpBasicAuthenticationConverter
import org.springframework.web.server.ServerWebExchange
import reactor.core.publisher.Mono
import reactor.kotlin.core.publisher.switchIfEmpty
import reactor.kotlin.core.publisher.toMono
import serana.fafopran.domain.auth.SessionRepository
import java.util.*

class CustomAuthenticationConverter(val sessionRepository: SessionRepository) : ServerAuthenticationConverter {

    private val basicConverter = ServerHttpBasicAuthenticationConverter()

    override fun convert(exchange: ServerWebExchange?): Mono<Authentication> {
        return exchange!!.session.flatMap {
            val sessionId: Any? = exchange.attributes["authentication_session_id"]
            if (sessionId != null) {
                val uuid = UUID.fromString(sessionId.toString())
                return@flatMap sessionRepository.findById(uuid)
                    .flatMap { if (it.isValid()) AuthorizedToken(uuid).toMono() else Mono.empty<Authentication>() }
            }
            return@flatMap Mono.empty<Authentication>()
        }
            .switchIfEmpty {
                basicConverter.convert(exchange)
                    .flatMap {
                        exchange.attributes.remove("authentication_id")
                        exchange.attributes.remove("authentication_session_id")
                        return@flatMap it.toMono()
                    }
                    .switchIfEmpty(Mono.empty())
            }
    }
}