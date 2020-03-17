const router = require('koa-router')()
const passWebApi = require('../routers/webApi')

module.exports = () => {
    passWebApi(router)
    return router
}



