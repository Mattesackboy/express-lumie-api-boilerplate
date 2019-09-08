'use strict'

const { body, validationResult } = require('express-validator')
const Response = require('../../models/response'), APIError = require('../../models/APIError')

/**
* export Middlewares
*/
module.exports.middlewares = [
    body('name', 'Invalid name').trim().not().isEmpty().escape()
]

/**
* export Action
*/

/**
 * @api {put} /users/:id Update User's name.
 * @apiName UpdateUserName
 * @apiGroup Users
 *
 * @apiParam {String} id User's unique ID.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "meta": {
 *          "code": 201,
 *          "message": "Resource updated."
 *       }
 *     }
 */
module.exports.updateName = (req, res, next) => {
    const err = validationResult(req)
    if (!err.isEmpty()) throw new APIError('VALIDATION')
    // ... Name updated!
    const response = new Response('UPDATED', { msg: `Now the User's name is: ${req.body.name}` })
    res.status(response.meta.code).json(response)
}