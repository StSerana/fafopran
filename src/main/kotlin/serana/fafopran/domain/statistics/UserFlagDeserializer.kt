package serana.fafopran.domain.statistics

import com.fasterxml.jackson.core.JsonParseException
import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.JsonDeserializer
import serana.fafopran.domain.statistics.UserFlag.Flag
import serana.fafopran.domain.task.ConditionType
import java.nio.charset.Charset
import kotlin.io.encoding.Base64
import kotlin.io.encoding.ExperimentalEncodingApi

class UserFlagDeserializer : JsonDeserializer<Flag>() {

    private val FLAG_REGEXP: Regex = Regex("flag-\\{([a-zA-Z0-9_]*==)(\\d{2})([a-zA-Z0-9_]*)}")

    @OptIn(ExperimentalEncodingApi::class)
    override fun deserialize(p: JsonParser?, ctxt: DeserializationContext?): Flag {

        val result = FLAG_REGEXP.find(p!!.valueAsString)
        if (result == null || result.groupValues.size != 4) {
            throw JsonParseException("Invalid flag pattern")
        }
        val (type, task, answer) = result.destructured
        val taskType = ConditionType.valueOf(String(Base64.decode(type), Charset.forName("UTF-8")))
        val t = task.toLong()
        return Flag(taskType, t, answer)
    }
}