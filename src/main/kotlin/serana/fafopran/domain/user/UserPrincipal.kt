package serana.fafopran.domain.user

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

data class UserPrincipal(
    private val username: String?,
    private val teamId: Long?,
    private val password: String?,
) : UserDetails {

    constructor() : this(null, null, null)

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return mutableListOf(SimpleGrantedAuthority("ROLE_USER"))
    }

    override fun getPassword(): String {
        return password!!
    }

    fun getTeamId(): Long {
        return teamId!!
    }

    override fun getUsername(): String {
        return username!!
    }
}