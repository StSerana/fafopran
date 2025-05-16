package serana.fafopran.domain.auth

import lombok.Builder
import org.springframework.data.annotation.Id
import org.springframework.data.annotation.Version
import org.springframework.data.relational.core.mapping.Table
import serana.fafopran.config.auth.AuthorizedToken
import serana.fafopran.domain.user.UserPrincipal
import java.time.Instant
import java.util.*

@Builder
@Table("sessions")
data class UserSession(
    @Id
    val id: UUID,
    @Version
    val version: Long,
    val username: String,
    var createdAt: Instant,
    var expiresAt: Instant,
) {
    companion object {
        fun of(id: UUID, authentication: AuthorizedToken): UserSession {
            val principal: UserPrincipal = authentication.principal as UserPrincipal
            return UserSession(
                id = id,
                version = 0,
                username = principal.username,
                createdAt = authentication.createdAt,
                expiresAt = authentication.expiresAt
            )
        }
    }

    fun isValid(): Boolean {
        return this.expiresAt > Instant.now()
    }
}