'use strict'

const isAuth = require('./middlewares/is-auth')
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next) //Fix a Lumie bug (throwing Errors in async functions)

const levelFcts = {
    public: (req, res, next) => next(),
    member: asyncHandler(isAuth)
}

module.exports = level => (req, res, next) => levelFcts[level](req, res, next)