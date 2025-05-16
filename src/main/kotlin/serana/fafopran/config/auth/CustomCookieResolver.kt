package serana.fafopran.config.auth

import org.springframework.web.server.ServerWebExchange
import org.springframework.web.server.session.CookieWebSessionIdResolver

class CustomCookieResolver : CookieWebSessionIdResolver() {
    override fun setSessionId(exchange: ServerWebExchange, id: String) {

        exchange.attributes["authentication_session_id"].let { super.setSessionId(exchange, it.toString()) }
    }

    override fun resolveSessionIds(exchange: ServerWebExchange): MutableList<String> {
        val ids = super.resolveSessionIds(exchange)
        val mainId = exchange.attributes["authentication_session_id"]

        if (mainId != null) {
            return mutableListOf(exchange.attributes["authentication_session_id"].toString())
        } else {
            if (ids.isNotEmpty()) {
                exchange.attributes["authentication_session_id"] = ids[0]
            }
            return ids
        }
    }
}