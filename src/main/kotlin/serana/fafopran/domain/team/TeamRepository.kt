package serana.fafopran.domain.team

import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository

@Repository
interface TeamRepository : ReactiveCrudRepository<Team, Long> {

}
