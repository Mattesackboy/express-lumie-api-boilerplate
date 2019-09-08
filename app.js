'use strict'

const config = require('./config/config')
const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}))
// secure express app
app.use(helmet({
    dnsPrefetchControl: false,
    frameguard: false,
    ieNoOpen: false,
}))

app.use('/api/v1', require('./api/v1.0'))

mongoose.connect(config.db.uri, { useNewUrlParser: true }).then(() => {
    app.listen(config.app.port, config.app.hostname, () => {
        console.info(`CURRENT NODE ENVIRONMENT: ${process.env.NODE_ENV}`)
        console.log(`Listening on port ${config.app.port}, current host ${config.app.hostname}`)
    })
}).catch(console.error)