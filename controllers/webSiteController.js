const apiSingle = require('../modules/makeXwebSite')
const createS = require('../modules/CreateStudent')
const docConfig  = require('./docconfig')
const fs = require("fs")
const {myEmitter,login,getTeacherId,passShenhe} = require('../evet/eimt')
// console.log('putInfomationdoc',docconfig.updateInfromation,docconfig.putInfomationdocB)

const { request, summary, body, description, tags ,query ,path } = require('koa-swagger-decorator');

class Controller{
    // constructor(){
        
    //     this.createTeamNo = this.createTeamNo.bind(this)
    // }
    @tags(['注册'])
    @request('GET', '/register')
    @summary('注册')
    @description('注册国内新用户')
    async register(ctx){
        const registerPhoneNum = await apiSingle.register(ctx)
        ctx.body = registerPhoneNum
        
    }
    @tags(['登录'])
    @request('GET', '/login')
    @summary('注册新数据成功后再登录成功')
    @description('注册国内新用户')
    async login(ctx){
        const registerPhoneNum = await apiSingle.register(ctx)
        const stringCookie = await apiSingle.login(ctx,registerPhoneNum)
        ctx.body = stringCookie
    }


    @tags(['更新用户信息'])
    @request('POST', '/putInfomation')
    @summary('注册-登录成功-更新用户信')
    // @query({
    //     role: { type: 'string', required: true, default: 't',  },
    //     referee: { type: 'string', required: true, default: 't',  },
    //   })
    @body(docConfig.updateInfromation)
    @description('一键更新用户信息,可产生不同年龄段的角色，但指导导师不能小于18岁')
    async updateInfromation(ctx){

        const registerPhoneNum = await apiSingle.register(ctx)
        // console.log('######',registerPhoneNum)
        const stringCookie = await apiSingle.login(ctx,registerPhoneNum)
        try{
        const putInfomation = await apiSingle.putInfomation(ctx,stringCookie)
            let {phone_num,id_num,name,team_role,apply_referee_role
            } = JSON.parse(putInfomation)
            console.log('!',phone_num,'@',id_num,name,team_role,apply_referee_role
            )
   
         ctx.body = JSON.parse(putInfomation)
        }catch(e){
            console.log('捕获异常',e.message)
            ctx.body =e.message
        }
      //  const createTeam = await apiSingle.createTeam(ctx,stringCookie)
      //  const addStudent = await apiSingle.addStudent(ctx,stringCookie,createTeam.id)
        
    
    }


    @tags(['添加学生到战队'])
    @request('POST', '/teamAddStudent')
    @summary('注册-登录成功-创建老师-创建战队-批量产生规则学生-添加战队,创建老师填写t开头，学生S开头，无身份n开头，学生需要必传age、count')
    @body(docConfig.teamAddStudent)
    @description('添加学生到战队')    
    async teamAddStudent(ctx){
        //创建老师
        let {trole, treferee, srole, sreferee,nrole,nreferee,count,age,teamnumber} = ctx.request.body;

        // console.log('addStudent-ctx',ctx.request.body,trole,treferee)
        ctx.request.body = { trole: `${trole}`, treferee: `${treferee}`}
        // console.log('ctx@@',ctx.request.body )
        const registerPhoneNum = await apiSingle.register(ctx)
     //   console.log('######',registerPhoneNum)
        const stringCookie = await apiSingle.login(ctx,registerPhoneNum)
        const putInfomation = await apiSingle.putInfomation(ctx,stringCookie)
      
        //创建学生
       let  obj= srole?{srole: `${srole}`, sreferee: `${sreferee}`,age:`${age}`,count:count} :{nrole: nrole, nreferee: nreferee,age:age,count:count}
        ctx.request.body = obj 

        // const numberCount = 2
        let  sum = 0
        let createTeam
        let createTeamTeam_no= []
        for (let i=0; i<teamnumber;i++){
            let  sum = 0
            //创建战队
             createTeam = await apiSingle.createTeam(ctx,stringCookie)
            // console.log('创建战队完毕',createTeam.team_no)
            createTeamTeam_no.push(createTeam.team_no)
            const teamNo =await createS.createStudentNo(ctx) // 创建多少个用户并完善信息，返回手机号
            // console.log('teamNo',teamNo,'第N次创建战队 和学生',i)

            // let  addStudent
            teamNo.forEach( async element => {
                
                //  console.log('sun+' ,sum++)
                // \console.log('学生元素-element',element)
              const  a = await apiSingle.addStudent(ctx,stringCookie,createTeam.id,element)
               if(a ==true){
                    sum++
               }
            });
        }
         let objson={'战队创建者':registerPhoneNum,'战队号':createTeamTeam_no ,'被添加的成员数':sum,'成员年龄':age}
        //  ctx.body = {'战队创建者':registerPhoneNum,'战队号':createTeamTeam_no ,'被添加的成员数':sum,'成员年龄':age}
         console.log('开始写文件')
         fs.writeFile('res.json', JSON.stringify(objson),(err)=>{
            if (err) throw err;
            console.log('写创建战队添加学生数据完毕');
         })
    }

    @tags(['指导老师审批'])
    @request('GET', '/checkUseridCard')
    @summary('审批通过')
    @description('审批通过')
    async checkUseridCard (ctx){
        
        // let  jsonFilePhoneNum
        fs.readFile('res.json',function(err,data){
            
            if(err){
                return console.log('eeee',err)
            }
            if(!data){
                return console.log('文件内容为空先创建')
            }
            console.log('异步读取文件内容',JSON.parse(data)['战队创建者'].phoneNum)
            const jsonFilePhoneNum = JSON.parse(data)['战队创建者'].phoneNum

            const  b =    myEmitter.emit('login',jsonFilePhoneNum)
            console.log('暂时拿不到监听事件的返回值b')
           
        })
    }



        
//     @tags(['测试Post'])
//     @request('POST', '/putInfomationA')
//     @summary('测试')
//     @body({role:{type: 'string', required: true, example: '老师'},
//     referee:{type: 'string', required: true, example: '裁判'},
//    })
//     @description('测试')
//     async putInfomationA (ctx){
//         const a = await apiSingle.putInfomationA(ctx)
//         console.log('a',a)
//         ctx.body = a
//     }


}


module.exports = new Controller ()
