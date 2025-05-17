package serana.fafopran.config.auth

import org.springframework.security.authentication.AbstractAuthenticationToken
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import serana.fafopran.domain.auth.UserSession
import serana.fafopran.domain.user.UserPrincipal
import java.time.Instant
import java.util.*

class AuthorizedToken(
    private var sessionId: UUID?,
    private var principal: UserPrincipal?,
    var username: String?,
    var createdAt: Instant,
    var expiresAt: Instant,
    authorities: MutableCollection<out GrantedAuthority>?,
) : AbstractAuthenticationToken(authorities) {

    constructor(principal: UserPrincipal) :
        this(
            UUID.randomUUID(),
            principal,
            principal.username,
            Instant.now(),
            Instant.now().plusSeconds(600),
            mutableListOf(SimpleGrantedAuthority("ROLE_USER"))
        )

    constructor(uuid: UUID?, role: SimpleGrantedAuthority) : this(
        uuid,
        UserPrincipal(),
        null,
        Instant.now(),
        Instant.now(),
        mutableListOf(role)
    )

    constructor(uuid: UUID?) : this(
        uuid,
        UserPrincipal(),
        null,
        Instant.now(),
        Instant.now(),
        mutableListOf()
    )

    constructor(u: UserPrincipal?, s: UserSession, roles: MutableCollection<GrantedAuthority>) : this(
        s.id,
        u,
        s.username,
        s.createdAt,
        s.expiresAt,
        (mutableListOf(SimpleGrantedAuthority("ROLE_USER")) + roles).toMutableList()
    )

    override fun getCredentials(): Any {
        return sessionId!!
    }

    override fun getPrincipal(): Any {
        return principal!!
    }

    fun setPrincipal(principal: UserPrincipal?) {
        this.principal = principal
    }
}