package serana.fafopran.adapter.web

import lombok.RequiredArgsConstructor
import org.slf4j.LoggerFactory
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import serana.fafopran.domain.statistics.FlagResponse
import serana.fafopran.domain.statistics.StatisticService
import serana.fafopran.domain.statistics.UserFlag
import serana.fafopran.domain.user.UserPrincipal

var logger = LoggerFactory.getLogger(StatisticsController::class.java)!!

@RestController
@RequiredArgsConstructor
class StatisticsController(private val service: StatisticService) {

    @GetMapping("/statistics")
    fun getStatistics(): Flux<StatisticService.TeamInfo> {
        return service.loadStatistics()
    }

    @PostMapping("/api/capture-the-flag")
    fun captureTheFlag(
        @AuthenticationPrincipal principal: Mono<UserPrincipal>,
        @RequestBody userFlag: UserFlag,
    ): Mono<FlagResponse> {
        return service.captureTheFlag(userFlag, principal)
    }
}