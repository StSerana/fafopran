package serana.fafopran.domain.team

import org.springframework.data.relational.core.mapping.Table

@Table(name = "teams")
data class Team(
    val id: Long,
    val name: String,
) {
}