package serana.fafopran.domain.user

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table

@Table(name = "users")
data class User(
    @Id val id: Long,
    val username: String,
    val password: String,
    val teamId: Long,
) {
}