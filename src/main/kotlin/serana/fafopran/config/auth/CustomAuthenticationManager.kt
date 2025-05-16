package serana.fafopran.config.auth

import org.springframework.security.authentication.AbstractUserDetailsReactiveAuthenticationManager
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.userdetails.ReactiveUserDetailsService
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono
import serana.fafopran.domain.auth.SessionRepository
import serana.fafopran.domain.user.UserPrincipal
import java.util.*

class CustomAuthenticationManager(
    var userDetailsService: ReactiveUserDetailsService,
    var sessionRepository: SessionRepository,
) : AbstractUserDetailsReactiveAuthenticationManager() {


    override fun authenticate(authentication: Authentication): Mono<Authentication> {

        if (authentication is UsernamePasswordAuthenticationToken) {
            return super.authenticate(authentication)
                .flatMap {
                    if (it.isAuthenticated) {
                        val token = AuthorizedToken(it.principal as UserPrincipal)
                        token.isAuthenticated = true
                        return@flatMap Mono.just(token)
                    }
                    return@flatMap Mono.just(authentication)
                }
        }
        if (authentication is AuthorizedToken) {
            return authenticateToken(authentication)

        }

        return Mono.just(authentication);
    }

    private fun authenticateToken(authentication: AuthorizedToken): Mono<Authentication> {
        return sessionRepository.findById(authentication.credentials as UUID)
            .flatMap<Authentication?> {
                retrieveUser(it.username)
                    .flatMap { u ->
                        val token = AuthorizedToken(u as UserPrincipal, it)
                        token.isAuthenticated = true
                        Mono.just(token)
                    }
            }.switchIfEmpty(Mono.error(BadCredentialsException("Invalid Credentials")))
    }

    override fun retrieveUser(username: String?): Mono<UserDetails> {
        return userDetailsService.findByUsername(username)
    }
}