'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const Lumie = require('lumie')
const config = require('../../config/config')
const Response = require('./models/response')
const APIError = require('./models/APIError')
const permissions = require('./permissions')

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

Lumie.load(router, {
    verbose: config.lumie.verbose,
    ignore: ['*.spec', '*.action'],
    permissions,
    controllers_path: path.join(__dirname, 'controllers')
})

///MARK: - Global Error Middleware Handler
router.use((err, req, res, next) => {
    const meta = {
        code: 500,
        message: 'Something went wrong. Internal Server Error'
    }
    if (err instanceof APIError) {
        meta.code = err.statusCode
        meta.message = err.message
    } else if (err instanceof Error) {
        meta.message = err.message
        console.error(err.stack)
    }

    res.status(meta.code).json(new Response(meta, err.data))
})

module.exports = router