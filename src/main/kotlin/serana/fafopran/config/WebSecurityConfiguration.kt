package serana.fafopran.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.ResponseCookie.ResponseCookieBuilder
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import org.springframework.security.config.web.server.SecurityWebFiltersOrder
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.config.web.server.ServerHttpSecurity.AuthorizeExchangeSpec
import org.springframework.security.core.userdetails.ReactiveUserDetailsService
import org.springframework.security.crypto.factory.PasswordEncoderFactories
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.server.SecurityWebFilterChain
import org.springframework.security.web.server.authentication.AuthenticationWebFilter
import org.springframework.security.web.server.authentication.DelegatingServerAuthenticationSuccessHandler
import org.springframework.security.web.server.authentication.WebFilterChainServerAuthenticationSuccessHandler
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.reactive.CorsWebFilter
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource
import org.springframework.web.server.session.WebSessionIdResolver
import serana.fafopran.config.auth.*
import serana.fafopran.domain.auth.SessionRepository


@Configuration
@EnableWebFluxSecurity
class WebSecurityConfiguration(
    var userDetailsService: ReactiveUserDetailsService,
    val sessionRepository: SessionRepository,
) {
    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder()
    }

    @Bean
    fun corsFilter(): CorsWebFilter {

        val config = CorsConfiguration()

        // Possibly...
        config.applyPermitDefaultValues()

        config.allowCredentials = true
        config.allowedOriginPatterns = listOf("*")
        config.allowedHeaders = listOf("*")
        config.allowedMethods = listOf("*")

        val source = UrlBasedCorsConfigurationSource().apply {
            registerCorsConfiguration("/**", config)
        }
        return CorsWebFilter(source)
    }

    @Bean
    fun webSessionIdResolver(): WebSessionIdResolver {
        val resolver = CustomCookieResolver()
        resolver.cookieName = "SESSION"
        resolver.addCookieInitializer { builder: ResponseCookieBuilder ->
            builder.path(
                "/"
            )
        }
        resolver.addCookieInitializer { builder: ResponseCookieBuilder ->
            builder.sameSite(
                "Strict"
            )
        }

        return resolver
    }

    fun authenticationWebFilter(): AuthenticationWebFilter {
        val filter = AuthenticationWebFilter(CustomAuthenticationManager(userDetailsService, sessionRepository))
        filter.setServerAuthenticationConverter(CustomAuthenticationConverter(sessionRepository))
        filter.setAuthenticationSuccessHandler(
            DelegatingServerAuthenticationSuccessHandler(
                listOf(CustomAuthenticationSuccessHandler(), WebFilterChainServerAuthenticationSuccessHandler())
            )
        )
        filter.setSecurityContextRepository(CustomSecurityContextRepository(sessionRepository))
        return filter
    }

    @Bean
    fun springSecurityFilterChain(
        http: ServerHttpSecurity,
    ): SecurityWebFilterChain {
        http
            .cors {}
            .httpBasic { it.disable() }
            .formLogin(ServerHttpSecurity.FormLoginSpec::disable)
            .csrf { c -> c.disable() }
            .logout { l -> l.logoutUrl("/logout") }
            .authorizeExchange { exchanges: AuthorizeExchangeSpec ->
                exchanges
                    .pathMatchers("/public/**").permitAll()
                    //.pathMatchers("api/admin/**").hasRole("ADMIN")
                    .pathMatchers("/api/**").authenticated()
                    .anyExchange().authenticated()
            }
            .addFilterAfter(authenticationWebFilter(), SecurityWebFiltersOrder.REACTOR_CONTEXT)
        return http.build()
    }
}