type ApiErrorResponse = {
	success: false
	error: {
		message: string
		status: number
		code: string
	}
}

type ApiSuccessResponse<T> = {
	success: true
	status: number
	data: T
}

export type ApiResponseType<T> = ApiErrorResponse | ApiSuccessResponse<T>

export class ApiError extends Error {
	public readonly code: string
	public readonly status: number

	constructor(code: string, status: number = 500, message: string) {
		super(message)
		this.code = code
		this.status = status
		this.name = this.constructor.name
	}

	toResponse(): ApiErrorResponse {
		return {
			success: false,
			error: {
				code: this.code,
				message: this.message,
				status: this.status
			}
		}
	}
}

export class UnauthorizedError extends ApiError {
	constructor(message: string = 'Not authorized') {
		super('UNAUTHORIZED', 401, message)
		this.name = 'UnauthorizedError'
	}
}

export class RegisterError extends ApiError {
	constructor(message: string = 'Registration filed') {
		super('REGISTRATION_FAILED', 400, message)
		this.name = 'RegisteredError'
	}
}
