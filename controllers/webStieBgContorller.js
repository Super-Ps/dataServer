const docConfig  = require('./docconfig')
const apiSingle  = require('../modules/makeXwebSiteBackground')

const { request, summary, body, description, tags ,query ,path } = require('koa-swagger-decorator');
const  EventEmitter  =  require('events')
const myEmitter  =  new EventEmitter()
class ControllerBg{

    @tags(['创建赛事'])
    @request('POST', '/createProject')
    @summary('后台登录后创建不同状态的赛事')
    @body(docConfig.createProject)
    @description('未开始，报名中，比赛中，比赛结束')
    async createProject(ctx){
        const res = await apiSingle.createProject(ctx)
       
        ctx.body = res
    }


    @tags(['添加主题'])
    @request('POST', '/createAgmes')
    @summary('默认全选分组，可以自定义不同的主题类型')
    @body(docConfig.createAgmes)
    @description('5,6,7 对应 守护，勇者，极速')
    async createAgmes(ctx){
        const res = await apiSingle.createAgmes(ctx)
       
        ctx.body = res
    }

    @tags(['添加2020主题'])
    @request('POST', '/newCreateAgmes')
    @summary('默认全选分组，可以自定义不同的主题类型')
    @body(docConfig.newCreateAgmes)
    @description('10=智慧交通  9=智造大师  8=雷霆营救')
    async newCreateAgmes(ctx){
        const res = await apiSingle.newCreateAgmes(ctx)
       
        ctx.body = res
    }
    

    @tags(['指定赛事Id全部支付成功'])
    @request('POST', '/payment')
    @summary('传递赛事id')
    @body(docConfig.payment)
    @description('读赛事ID，或者手动传')
    async payMent(ctx){
        const newId = []
        const newIdArry = []
        const stringCookie = await apiSingle.webSiteBgLogin()
        const jsonRes = await apiSingle.getGameProjectId(ctx,stringCookie)

        const jsonReslenth =jsonRes.count

        jsonRes.data.forEach(element => {
            newId.push(element.id)
        });
        
        for(let i=0;i<jsonReslenth;i++){
            newId[i]
            console.log('newId[i]',newId[i])
            const res = await apiSingle.passPayment(stringCookie,newId[i])
            newIdArry.push(res)
        }
        
       
        ctx.body = newId  
    }
    
}


module.exports = new ControllerBg ()


