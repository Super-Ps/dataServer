const router = require('koa-router')()
const passWebApi = require('../routers/webApi')
// import { 
//     wrappingKoaRouter,
//     entityProperty,
//     ...
// } from "";
//const router =new Router()

module.exports = () => {
    passWebApi(router)
    return router
}



