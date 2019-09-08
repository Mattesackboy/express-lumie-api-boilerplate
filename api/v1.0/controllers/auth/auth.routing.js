'use strict'

const post = require('./post.action')
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next) //Use this when the endpoint is `async` [Lumie bug (throwing Errors in async functions)]

module.exports = {
    '/signup': {
        post: {
            action: post.signup,
            middlewares: post.signupMiddlewares, //check user input
            level: 'public'
        }
    },
    '/signin': {
        post: {
            action: post.login,
            middlewares: post.loginMiddlewares, //check user input
            level: 'public'
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