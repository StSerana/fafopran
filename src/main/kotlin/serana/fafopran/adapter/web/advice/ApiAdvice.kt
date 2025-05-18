package serana.fafopran.adapter.web.advice

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class ApiAdvice {

    @ExceptionHandler(FlagException::class)
    fun handleBadFlagFormatException(e: FlagException): ResponseEntity<ErrorResponse> {
        val response = ResponseEntity(ErrorResponse(e.code, e.message!!), HttpStatus.BAD_REQUEST)
        return response
    }

    data class ErrorResponse(val code: String, val message: String)
}