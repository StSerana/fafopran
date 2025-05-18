package serana.fafopran.adapter.web.advice

class FlagException(
    val code: String,
    errorMessage: String
) : RuntimeException(errorMessage) {

    companion object {
        fun badFormat() = FlagException("bad_flag_format", "Flag format is wrong")
        fun alreadySolved() = FlagException("already_solved", "Flag is already solved")
    }
}
