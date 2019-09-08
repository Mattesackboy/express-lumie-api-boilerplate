'use strict'

const { body, validationResult } = require('express-validator')
const rateLimit = require('express-rate-limit')
const Response = require('../../models/response'), APIError = require('../../models/APIError')

const createAccountLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 min window
    max: 5, // start blocking after 5 requests
    handler: (req, res) => {
        res.status(429).json(new Response({ code: 429, message: 'Too many signup requests from this IP, please try again later' }))
    }
})

const validationMiddleware = (req, res, next) => {
    const err = validationResult(req)
    if (!err.isEmpty()) throw new APIError('VALIDATION', err.array())
    next()
}

/**
* export Middlewares
*/
module.exports.signupMiddlewares = [
    body('email', 'Invalid email').isEmail().withMessage('Please enter a valid email.').normalizeEmail(),
    body('password', 'Invalid password').trim().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/), //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
    body(['name', 'surname']).trim().not().isEmpty().escape(),
    validationMiddleware,
    createAccountLimiter,
]

module.exports.loginMiddlewares = [
    body('email', 'Invalid email').isEmail().withMessage('Please enter a valid email.').normalizeEmail(),
    body('password', 'Invalid password').exists(),
    validationMiddleware
]

/**
* export Action
*/

/**
 * @api {post} /auth/signup Create a new account
 * @apiName CreateUsersAccount
 * @apiGroup Auth
 * 
 * @apiSuccess {any} data  Some data!
 */
module.exports.signup = (req, res, next) => {
    // ... Successfully registered!
    const response = new Response('CREATED', { somedata: 'Data' })
    res.status(response.meta.code).json(response)
}

/**
 * @api {post} /auth/signin Login to an existing account
 * @apiName LoginToAccount
 * @apiGroup Auth
 * 
 * @apiSuccess {any} data  Some data!
 */
module.exports.login = (req, res, next) => {
    // ... Logged in!
    res.status(200).json(new Response('OK', { jwt: 'very_useful_token' }))
}