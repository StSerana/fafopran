package serana.fafopran.domain.statistics

import com.fasterxml.jackson.databind.annotation.JsonDeserialize
import serana.fafopran.domain.task.ConditionType

data class UserFlag(
    @JsonDeserialize(using = UserFlagDeserializer::class)
    val flag: Flag,
) {

    data class Flag(
        val type: ConditionType,
        val task: Long,
        val answer: String,
    ) {

    }
}