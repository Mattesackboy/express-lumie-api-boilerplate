'use strict'

const { body, validationResult } = require('express-validator')
const Response = require('../../models/response'), APIError = require('../../models/APIError')

/**
* export Middlewares
*/
module.exports.middlewares = [
    body(['name', 'surname']).trim().not().isEmpty().escape()
]

/**
* export Action
*/

/**
 * @api {put} /users/:id Update User's informations.
 * @apiName UpdateUser
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
module.exports.update = (req, res, next) => {
    const err = validationResult(req)
    if (!err.isEmpty()) throw new APIError('VALIDATION')
    // ... User updated!
    const response = new Response('UPDATED')
    res.status(response.meta.code).json(response)
}