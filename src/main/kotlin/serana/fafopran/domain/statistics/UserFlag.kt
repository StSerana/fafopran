package serana.fafopran.domain.statistics

import com.fasterxml.jackson.databind.annotation.JsonDeserialize

data class UserFlag(
    @JsonDeserialize(using = UserFlagDeserializer::class)
    val flag: Flag,
) {

    data class Flag(
        val type: TaskType,
        val task: Long,
        val answer: String,
    ) {

    }
}