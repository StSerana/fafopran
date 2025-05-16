package serana.fafopran.domain.user

import org.springframework.security.core.userdetails.ReactiveUserDetailsService
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono
import reactor.kotlin.core.publisher.toMono

@Component
class UserDetailsService(
    private val userRepository: UserRepository,
) : ReactiveUserDetailsService {

    override fun findByUsername(username: String?): Mono<UserDetails> {

        return userRepository.findByUsername(username)
            .flatMap { UserPrincipal(it.username, it.teamId, it.password).toMono() }
            .switchIfEmpty(Mono.error(UsernameNotFoundException("")))
            .cast(UserDetails::class.java)
    }
}