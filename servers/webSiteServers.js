const webSiteController = require ('../controllers/webSiteController')
const webSiteBgController = require ('../controllers/webStieBgContorller')
const apiSingle = require('../modules/makeXwebSite')
const docConfig  = require('../controllers/docconfig')
const {readJson,readProjectIdJson,writeProjectIdJson} = require('../until/readJson')


const { request, summary, body, description, tags ,query ,path } = require('koa-swagger-decorator');

class webSiteServers{

    @tags(['报名'])
    @request('GET', '/lineOne')
    @summary('报名-报名成功')
    // @body(docConfig.LineOne)
    @description('读创建者账号，读赛事id，选择id报名，循环不同组别报名直到战队数组为空，报名结束')
    async  webSiteLine(ctx) {
        console.log('开始执行')
        // await webSiteController.teamAddStudent(ctx)  // 创建信息写json
        // await webSiteController.checkUseridCard(ctx)  
        // const  projectId=  await webSiteBgController.newCreateAgmes(ctx) // 创建赛事主题写赛事id
        // const a =await writeProjectIdJson(projectId)
      
        const phoneNum = await  readJson() //  读报名者手机号
        console.log('第二次',phoneNum)
        const  stringCookie = await apiSingle.login(ctx,phoneNum) // 登录获取cookie
        // 根据赛事id 获取  game_project_id=244
        // console.log('第三次',stringCookie)
         const id  = await readProjectIdJson()
        console.log('第四次获取赛事id成功')
        const gameId = await apiSingle.gameProjectId(ctx,stringCookie,id)
        console.log('第五次 得到组别等信息',gameId)
        // //[{id=7922},{}]  战队id
        // const res2 = await apiSingle.availableTeam(ctx,stringCookie,gameId) 
        // //[{id=15444},{}]  成员id
        //  const MemberArry = await apiSingle.availableMember(ctx,stringCookie,575,7922)
        // 提交订单
        // const res3 = await apiSingle.orderReg(ctx,stringCookie,575,7922,MemberArry)
         const  res3 = await apiSingle.commitReg(ctx,stringCookie,gameId)
        console.log('commitReg',res3)

        
        ctx.body = res3
    } 
}



// let a  =new webSiteServers ()
// a.webSiteLine()

module.exports  = new webSiteServers ()