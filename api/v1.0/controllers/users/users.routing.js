'use strict'

const get = require('./get.action')
//const post = require('./post.action') //create
const put = require('./put.action') //update
const patch = require('./patch.action') //update, partially

const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next) //Use this when the endpoint is `async` [Lumie bug (throwing Errors in async functions)]

module.exports = {
    '/': {
        get: {
            action: get.getAll,
            level: 'public'
        }
    },
    '/:id': {
        get: {
            action: get.getOne,
            level: 'public'
        },
        patch: {
            action: patch.updateName,
            middlewares: patch.middlewares,
            level: 'member'
        },
        put: {
            action: put.update,
            middlewares: put.middlewares,
            level: 'member'
        }
    }
}

//MARK: Structure of Routing files
/*

    '/<name of your route>': {
        < get | post | put | patch | delete >: {
            action: < function(req, res) >,
            level: < parameters of you permission function >, // Optional
            middlewares: < Array(function(req, res, next)) >// Optional
        }
    }


*/