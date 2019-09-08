'use strict'

const APIError = require('../models/APIError')

module.exports = async (req, res, next) => {
    const auth = (req.headers.authorization || '').split('Bearer ').pop()
    
    // Check token ... Get user from db ...
    if (auth !== 'very_useful_token') throw new APIError('AUTH') //Will be handled by the Global Error Middleware Handler
    // Pass user from db to req.user ...
    req.user = { _id: '1', name: 'Matteo', email: 'matteo@gmail.com' }
    next()
}
