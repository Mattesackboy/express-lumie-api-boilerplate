'use strict'

const Response = require('../../models/response')
const APIError = require('../../models/APIError')
const users = [
    { _id: '1', name: 'Matteo', email: 'matteo@gmail.com' },
    { _id: '2', name: 'Giovanni', email: 'giovanni@gmail.com' },
    { _id: '3', name: 'Piermenti', email: 'piermenti@gmail.com' },
]

/**
* export Actions
*/

/**
 * @api {get} /users Request all Users
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiSuccess {Object[]}   profiles  List of user profiles.
 * @apiSuccess {String}   profiles.name  Name of the User.
 * @apiSuccess {String}   profiles.email  Email of the User.
 */
module.exports.getAll = (req, res, next) => {
    res.status(200).json(new Response('OK', users))
}

/**
 * @api {get} /users/:id Request User information
 * @apiName GetUser
 * @apiGroup Users
 *
 * @apiParam {String} id User's unique ID.
 *
 * @apiSuccess {String} _id User's unique ID.
 * @apiSuccess {String} name Name of the User.
 * @apiSuccess {String} email Email of the User.
 */
module.exports.getOne = (req, res, next) => {
    const { id } = req.params, user = users.find(u => u._id === id )
    if (!user) throw new APIError('User not found.', 404)
    res.status(200).json(new Response('OK', user))
}