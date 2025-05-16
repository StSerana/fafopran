package serana.fafopran.domain.auth

import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface SessionRepository : ReactiveCrudRepository<UserSession, UUID> {
}