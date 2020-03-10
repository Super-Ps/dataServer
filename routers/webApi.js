// const router = require('koa-router')()
const phoneNum =require('../until/phoneNum')
const rp = require('request-promise')
const axios = require('axios').default
const fs = require("fs")
//const request =require('../modules/module')
const apiSingle = require('../modules/makeXwebSite')
const webSiteController = require('../controllers/webSiteController')
const webSiteBgController = require ('../controllers/webStieBgContorller')
const webSiteServers = require('../servers/webSiteServers')
const json = require('../res.json')
const pathName = 'https://test-usercenter.makex.cc/api/'



module.exports = router => {
    router.get('/cjson',resJson )
    router.get('/idJson',idJson )
    router.get('/register', webSiteController.register)
    router.get('/login', webSiteController.login)
    // router.get('/createTeamNo/:role/:referee/:no',controller.createTeamNo)
    router.post('/putInfomation',webSiteController.updateInfromation)
    router.post('/teamAddStudent',webSiteController.teamAddStudent)
    router.get('/checkUseridCard',webSiteController.checkUseridCard)  // 指导老师审批

    router.post('/createProject',webSiteBgController.createProject)
    router.post('/createAgmes',webSiteBgController.createAgmes)
    router.post('/newCreateAgmes',webSiteBgController.newCreateAgmes)
 
    router.post('/payment',webSiteBgController.payMent)

    router.get('/lineOne',webSiteServers.webSiteLine)


     function resJson(ctx){
            // console.log('11111')
          // console.log(fs.readFileSync('res.json') )
          ctx.body =fs.readFileSync('res.json','utf8')
      
    }

    function idJson(ctx){
    //   console.log('写id完毕')
    // console.log(fs.readFileSync('write.json') )
    ctx.body =fs.readFileSync('write.json','utf8')

}


    // router.get('/pn', (ctx,next)=>{

    //     axios.post('https://test-usercenter.makex.cc/api/authentication', {
    //         phone_zone :'+86',
    //         phone_num : '13116579540',
    //         password : '123456'
    //       })
    //       .then(function (response) {
    //         console.log(response);
    //         ctx.body= response
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    // })


    // router.post('/putInfomationA', webSiteController.putInfomationA
    //   )
    
}