'use strict'

require('dotenv').config()

const env = process.env.NODE_ENV // 'development' or 'production'

const development = {
    app: {
        hostname: process.env.DEV_HOSTNAME || '0.0.0.0',
        port: parseInt(process.env.DEV_APP_PORT) || 3001
    },
    lumie: {
        verbose: process.env.DEV_LUMIE_VERBOSE === 'true'
    },
    db: {
        uri: process.env.DEV_MONGODB_URI
    }
}
const production = {
    app: {
        hostname: process.env.PROD_HOSTNAME || '0.0.0.0',
        port: parseInt(process.env.PROD_APP_PORT) || 3001
    },
    lumie: {
        verbose: process.env.PROD_LUMIE_VERBOSE === 'true'
    },
    db: {
        uri: process.env.PROD_MONGODB_URI
    }
}

const config = {
    development,
    production
}

module.exports = config[env] || development