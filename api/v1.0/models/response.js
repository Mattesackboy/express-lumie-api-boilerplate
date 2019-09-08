'use strict'

module.exports = class Response {

    /**
     * Create a Response Object
     * @param {Meta} meta Short metas are: `'OK'`, `'CREATED'`, `'UPDATED'`, `'DELETED'`. Otherwise: { code: `statusCode`, error_message: `code >= 400 (in case of error)` }
     * @param {Object} data 
     */
    constructor(meta, data = undefined) {
        const baseMetas = String(meta).toUpperCase()
        if (baseMetas === 'OK') meta = { code: 200, message: 'Success.' }
        else if (baseMetas === 'CREATED' || baseMetas === 'UPDATED') meta = { code: 201, message: baseMetas === 'CREATED' ? 'Resource created.' : 'Resource updated.' }
        else if (baseMetas === 'DELETED') meta = { code: 204, message: 'Resource deleted.' }
        
        if (!meta || isNaN(meta.code)) throw new Error('Response initialization Error, no meta.')
        if (meta.code >= 400 && !meta.message) throw new Error(`Response initialization Error, no message on statusCode ${meta.code}`)
        
        this.meta = meta
        this.data = data
    }
}

///Never used, created only for reference
class Meta {

    /**
     * Create a Meta Object
     * @param {Number} code The status code of the response
     * @param {String} message Success if all went as expected otherwise an Error message if something went wrong
     */
    constructor(code, message  = undefined) {
        this.code = code
        this.message = message
    }
}