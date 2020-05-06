const passportAPi = require("../modules/piliangzhuce")
const docConfig  = require('./docconfig')
const { request, summary, body, description, tags ,query ,path } = require('koa-swagger-decorator');


class Controller {



    @tags(['PassPort2批量注册用户数据'])
    @request('POST', '/passportRegister')
    @summary('Passport2提供会给其他依赖用户数据的api')
    @body(docConfig.passportRegister)
    @description('passport2 批量注册')

    async register(ctx){
        const list = await passportAPi.passportRegister(ctx)
        console.log('passport-ctx',ctx.request.body,"list",list)

        ctx.body =  list
        
    }


    @tags(['PassPort删除测试数据'])
    @request('POST', '/passportdeleteUsers')
    @summary('Passport删除账号')
    @body(docConfig.deletePassportUsers)
    @description('passport 删除用户')

    async deletePassportUser(ctx){
        const res = await passportAPi.deleteUsers(ctx)
        console.log("res---delect,",res)
        ctx.body = res


}


}



module.exports = new Controller ()