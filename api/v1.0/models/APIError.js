'use strict'

module.exports = class APIError extends Error {

    /**
     * Create an APIError Object
     * @param {String} message or you can use: `'AUTH'`, `'AUTHORIZATION'`, `'VALIDATION'` for automatic message and statusCode
     * @param {Number} statusCode
     * @param {any} data Some data about the error
     */
    constructor(message, statusCode, data = undefined) {
        if (typeof statusCode !== "number" && !data) data = statusCode
        super()

        this.data = data
        const baseMessage = String(message).toUpperCase()
        if (baseMessage === 'AUTH' || baseMessage === 'AUTHORIZATION') {
            if (baseMessage === 'AUTH') {
                this.message = 'Authentication error, not authenticated.'
                this.statusCode = 401
            } else {
                this.message = 'Access denied.'
                this.statusCode = 403
            }
        }
        else if (baseMessage === 'VALIDATION') {
            this.message = 'Validation failed, entered data is incorrect.'
            this.statusCode = 422
        } else {
            if (!message || isNaN(statusCode)) throw new Error('APIError initialization Error')
            this.message = String(message)
            this.statusCode = Number(statusCode)
        }
    }
}