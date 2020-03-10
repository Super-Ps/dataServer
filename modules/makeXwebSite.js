const phoneNum = require('../until/phoneNum')
const idCard = require('../until/shenfenz')
const rp = require('request-promise')
const randomName = require('chinese-random-name');
// const pathName = 'https://test-usercenter.makex.cc/api/'
const userRegister = 'http://user.test.makex.cc/api/'
const newPath = 'http://www.test.makex.cc/api/'



const errMessage = {
    messge:{
    A:'指导老师:/t/f',
    B:'指导老师+裁判:t/t',
    C:'队员:/s/f',
    D:'队员+裁判:/s/t',
    E:'Interface parameters have changed'
}}

    async function register(ctx) {
        let newRp
        const options = {
            method: 'POST',
            uri: `${userRegister}user/register`,
            body: {
                phoneZone: '+86',
                phoneNum: phoneNum.phoneNum(),
                password: 123456
            },
            json : true

        };
        try{
            let res = await rp(options)
            
                newRp = {
                msg: res.msg,
                id: res.data.id,
                phoneZone: res.data.phoneZone,
                phoneNum: res.data.phoneNum
            }
            // console.log('注册返回',newRp)
            return newRp
            
        }catch(err){
            console.log(err)
           
        }
        
         
        // ctx.body = newRp
        console.log('注册成功',newRp,'---',newRp.phoneNum)
    }


    async function login(ctx,registerPhoneNum){
            const options = {
                    method: 'POST',
                    uri: `${newPath}authentication`,
                    form : {
                        phone_zone :'+86',
                        phone_num :typeof(registerPhoneNum )=== "object" ?registerPhoneNum.phoneNum : registerPhoneNum,//`${registerPhoneNum}`,
                        password : '123456'
                            },
                    headers: {
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    },
                    resolveWithFullResponse: true
                
            }
   
           try{ let res = await rp(options)
           // console.log('obj',(res.headers['set-cookie']))
            let local_accessToken = res.headers['set-cookie'][0]
            let laravel_session = res.headers['set-cookie'][2]
            let stringCookie = `${local_accessToken};${laravel_session}`
           // ctx.body = stringCookie
            console.log('登录成功',stringCookie)

            return stringCookie
           }catch(error){
            console.log('登录error',error)
            return error
           }

    }

    async function putInfomation(ctx,stringCookie){
       
        console.log('p-ctx-body',ctx.request.body)
        let {trole, treferee, srole, sreferee,nrole,nreferee,age} = ctx.request.body;
        //   console.log('参数a',trole, treferee, srole, sreferee,nrole,nreferee,age)
        // const role = ctx.params.role
        // const caipan =ctx.params.referee
        // console.log('更新用户信息接收的参数',role,caipan,ctx.params)
        const options = { 
                method: 'PUT',
                url: `${newPath}users`,
                headers: { 

                Cookie: stringCookie,
                'Content-Type': 'application/x-www-form-urlencoded' 
                }
        };
         

        // if(!trole || !treferee || !srole || !sreferee || !nrole || !nreferee){

        //         throw new Error('参数不能为空')
        // }
        try{
        if(trole === 't' && treferee === 'f' ){
            let {id_no_String,newBirthday} =  idCard.idCard(0)
                    const newFrom = {
                        form: {     
                            name: randomName.generate(),
                            avatar: 'WMrAxPxEiH.jpeg?x-oss-process=image/resize,p_65/auto-orient,1/crop,x_74,y_2,w_161,h_161',
                            id_num: id_no_String,
                            birthday: newBirthday,
                            id_type: 'idCard',                       
                            team_role: 'teacher',
                            gender: 'male' ,
                            apply_referee_role:	'false',
                            id_card_pic1: 'E3kJmTbwPr.jpeg?x-oss-process=image/resize,p_65/auto-orient,1',
                            id_card_pic2: 'n7rHWAxPY5.jpeg?x-oss-process=image/resize,p_65/auto-orient,1'
                        } 
                }
                const newOption = Object.assign({},options,newFrom)
                    // console.log('3-3',newOption)
                    try{
                        const res = await rp(newOption)
                            //ctx.body=res
                        return  res
                    }
                    catch(err){
                        return  err
                    }
                    
                    
        }else if(trole === 't' && treferee === 't'){
                   // let a =[state_id]
                  let {id_no_String,newBirthday } =  idCard.idCard(0)
                //   console.log('age@@@',age)
                  console.log('id_no_String',id_no_String,'newBirthday',newBirthday)
                    const newFrom = {
                        form: {     
                            name: randomName.generate(),
                            avatar: 'WMrAxPxEiH.jpeg?x-oss-process=image/resize,p_65/auto-orient,1/crop,x_74,y_2,w_161,h_161',
                            id_num: id_no_String,
                            birthday: newBirthday,
                            id_type: 'idCard',                       
                            team_role: 'teacher',
                            gender: 'male' ,
                            apply_referee_role:	'true',
                            id_card_pic1: 'E3kJmTbwPr.jpeg?x-oss-process=image/resize,p_65/auto-orient,1',
                            id_card_pic2: 'n7rHWAxPY5.jpeg?x-oss-process=image/resize,p_65/auto-orient,1',
                            referee_extra:{
                                "state_id": 1,
                                "province_id": 440000,
                                "city_id": 440300,
                                "career": "TestEngineer",
                                "email": "3433201@qq.com",
                                "company": "Makeblock测试组",
                                "makex_referee_count": 4,
                                "other": "老师-裁判身份"
                            }
                        } 
                    }
                    const newOption = Object.assign({},options,newFrom)
                    // console.log('3-4',idCard.idCard(),newOption)
                    try{
                        const res = await rp(newOption)
                        // console.log('老师-裁判、t/t',res)
                        return  res
                    }catch(err){
                        return err
                    }
                   
                    
        }else if(srole === 's' && sreferee === 'f'){
            let {id_no_String,newBirthday } =  idCard.idCard(age)
                    const newFrom = {
                        form: {     
                            name: randomName.generate(),
                            avatar: 'WMrAxPxEiH.jpeg?x-oss-process=image/resize,p_65/auto-orient,1/crop,x_74,y_2,w_161,h_161',
                            id_num: id_no_String,
                            birthday: newBirthday,
                            id_type: 'idCard',                       
                            team_role: 'student',
                            gender: 'male' ,
                            apply_referee_role:	'false',
                            id_card_pic1: 'E3kJmTbwPr.jpeg?x-oss-process=image/resize,p_65/auto-orient,1',
                            id_card_pic2: 'n7rHWAxPY5.jpeg?x-oss-process=image/resize,p_65/auto-orient,1',
                        } 
                    }
                const newOption = Object.assign({},options,newFrom)
                //    console.log('3-3-1',newOption)
                   const res = await rp(newOption)
                   return  res


        }else if(srole === 's' && sreferee === 't'){
            let {id_no_String,newBirthday } =  idCard.idCard(age)
                    const newFrom = {
                        form: {     
                            name: randomName.generate(),
                            avatar: 'WMrAxPxEiH.jpeg?x-oss-process=image/resize,p_65/auto-orient,1/crop,x_74,y_2,w_161,h_161',
                            id_num: id_no_String,
                            birthday: newBirthday,
                            id_type: 'idCard',                       
                            team_role: 'student',
                            gender: 'male' ,
                            apply_referee_role:	'true',
                            id_card_pic1: 'E3kJmTbwPr.jpeg?x-oss-process=image/resize,p_65/auto-orient,1',
                            id_card_pic2: 'n7rHWAxPY5.jpeg?x-oss-process=image/resize,p_65/auto-orient,1',
                            referee_extra:{
                                "state_id": 1,
                                "province_id": 440000,
                                "city_id": 440300,
                                "career": "TestEngineerZH",
                                "email": "3433201@qq.com",
                                "company": "Makeblock测试组队员",
                                "makex_referee_count": 3,
                                "other": "学生-裁判身份"
                            }
                        } 
                    }
                    const newOption = Object.assign({},options,newFrom)
                    // console.log('3-3-2',newOption)
                    const res = await rp(newOption)
                    return  res


        }else if(nrole === 'f' && nreferee === 't'){
            let {id_no_String,newBirthday } =  idCard.idCard(age=0)
                const newFrom = {
                    form: {     
                        name: randomName.generate(),
                        avatar: 'WMrAxPxEiH.jpeg?x-oss-process=image/resize,p_65/auto-orient,1/crop,x_74,y_2,w_161,h_161',
                        id_num: id_no_String,
                        birthday: newBirthday,
                        id_type: 'idCard',                       
                        team_role: '',
                        gender: 'male' ,
                        apply_referee_role:	'true',
                        id_card_pic1: 'E3kJmTbwPr.jpeg?x-oss-process=image/resize,p_65/auto-orient,1',
                        id_card_pic2: 'n7rHWAxPY5.jpeg?x-oss-process=image/resize,p_65/auto-orient,1',
                        referee_extra:{
                            "state_id": 1,
                            "province_id": 440000,
                            "city_id": 440300,
                            "career": "暂无身份",
                            "email": "3433201@qq.com",
                            "company": "Makeblock测试组队员",
                            "makex_referee_count": 0,
                            "other": "无身份裁判"
                        }
                    } 
                }
                const newOption = Object.assign({},options,newFrom)
                // console.log('3-3-2',newOption)
                const res = await rp(newOption)
                return  res
        }else{

            return ctx.body = '更新失败，请填写正确的值:例如:t/t,/t/f,/s/t,/s/f'
        }
    }catch(err){
        console.log('putInfomationError',err)
    }
}


async function createTeam(ctx,stringCookie){
    const No = Math.floor(Math.random()*999999)
    const options = {
        method: 'POST',
        url: `${newPath}team`,
        headers: { 

        Cookie: stringCookie,
        'Content-Type': 'application/x-www-form-urlencoded' 
        },
        form: {
            name: `TestTeamNO${No}`,
            logo: 'fh4MJcFD5A.jpeg?x-oss-process=image/resize,p_65/auto-orient,1/crop,x_78,y_11,w_171,h_171',
            slogan: '生死看谈，不服来干',
            intro: `韩国电信${No}队，简称SKT${No}或SKT${No}，是韩国资深电子体育俱乐部，前身是拳击手于2002年成立的猎户座队。它于2003年12月改名为联合，最终由韩国最大的通讯社韩国电信赞助，并于2004年改名为韩国电信T1。除了星际争霸项目团队外，SKT${No}在2011年9月22日还成立了2支球队`,
            club: 'PUBG',
            state_id: '1',
            province_id: 440000,
            city_id: 440100
        }
    }
        const re = await rp(options)
        const res = JSON.parse(re)
        console.log('创建战队',res.id,res.name, typeof(res))
        // ctx.body = res 
        return res     
}

    async function addStudent(ctx,stringCookie,id,phone_numArry){

        console.log(`id==${id} 4-4`)
        const options = {
            method: 'POST',
            url: `${newPath}simple_invite?team_id=${id}`,
            headers: { 
            Cookie: stringCookie,
            'Content-Type': 'application/x-www-form-urlencoded' 
            },
            form: {
                phone_zone:	'+86',
                phone_num:`${phone_numArry}`
            }
        }
        try{
                        
            const res = await rp(options)
            console.log('创建批量学生',res)
            // ctx.body = res 
            return res    
        }
        catch(err){
            console.log('err',err)
        }
    }



    async function gameProjectId(ctx,stringCookie,id) {
        // http://www.test.makex.cc/api/game_project?game_project_id=238&_=1583315944343
        const options = {
            method: 'GET',
            uri: `${newPath}game_project?game_project_id=${id}`,
            headers: { 
                Cookie: stringCookie,
                'Content-Type': 'application/x-www-form-urlencoded' 
                }
    
        };
        try{
            console.log('开始执行1',stringCookie,id)
            const res = await rp(options)
            console.log('开始执行2')
            // const stringRes =JSON.parse(res)
            // console.log('开始执行3',stringRes.game_types)
            // console.log('开始执行3',res)
            const resParse = JSON.parse( res )
              const  arryobejct = resParse.game_types
              let geamsArry = []
              arryobejct.forEach(function(types,typesindex){
                // console.log('types',types.games); 
                let arryGroup = []
                types.games.forEach(function(games,gamesindex){
                    arryGroup.push(games.id)
                    // console.log('arryGroup',arryGroup)
                })   
                geamsArry.push(arryGroup)
              }) 
              return geamsArry
        }catch(err){
            console.log(err)
           
        }
    }

    async function availableTeam(ctx,stringCookie,gameId){
        console.log('gameId',gameId)

        const options = {
            method: 'GET',
            uri: `${newPath}reg/available_team?game_id=${gameId}`,
            headers: { 
                Cookie: stringCookie,
                'Content-Type': 'application/x-www-form-urlencoded' 
                }
        }
        try{
            let res = await rp(options)

            //  const teamId = JSON.parse(res)[0].id
            //  console.log('得到可用的战队id 取第一个',teamId)
            const team = JSON.parse(res)
            //  console.log('得到可用的战队id 取第一个',team)
            return team
        }catch(err){
            // console.log(err)
        }
    }

    ///reg/available_member?game_id=572&team_id=7922

    async function availableMember(ctx,stringCookie,gameId,teamId){
        console.log('get-teamId',teamId)
        const options = {
            method: 'GET',
            uri: `${newPath}reg/available_member?game_id=${gameId}&team_id=${teamId}`,
            headers: { 
                Cookie: stringCookie,
                'Content-Type': 'application/x-www-form-urlencoded' 
                }
        }
        try{
            const res = await rp(options)
            const Member =JSON.parse( res )
            const MemberArry = []
            Member.forEach(Member =>{
                MemberArry.push(Member.id)
            })
            console.log('得到战队成员id',MemberArry)
            return MemberArry
        }catch(err){
            // console.log(err)
        }
    }

    async function orderReg (ctx,stringCookie,gameId,teamId,MemberArry) {
        const options = {
            method: 'POST',
            url: `${newPath}reg`,
            headers: { 
            Cookie: stringCookie,
            'Content-Type': 'application/x-www-form-urlencoded' 
            },
            form: {
                game_id:`${gameId}`,
                team_id:`${teamId}`,
                user_ids:MemberArry,
                name:'彭达克',
                phone_zone:'86',
                phone_num:'13528427307',
                address:'南山智园C3 4F',
                province_id:'440000',
                city_id:'440300',
                area_id:'440305'
            }
        }
        try{
            const res = await rp(options)
            // const regid =JSON.parse( res )

            return res
        }catch(err){
            //  console.log(err)
        }
    }
 
    async function commitReg(ctx,stringCookie,gameId){
        const gameIdLength = gameId.length
        
        
        const arrId = gameId.reduce(function (a, b) { return a.concat(b)} )

        console.log('one,two,three',arrId)
        let teamId =[]
        let MemberArry =[]
        let resid=[]
        
        
        const tId = await availableTeam(ctx,stringCookie,arrId[0]) // 得到战队id'
        console.log('tId',tId)
        const  teamLenth= tId.length  // 获取战队列表长度
        console.log('列表长度',teamLenth)
        try{
            for(let a =0; a<teamLenth;a++){
                console.log(`第${a}次循环`)
                for(let i =0; i<arrId.length;i++){

                
                    const  gid = arrId[i]
                    console.log('gid',gid)

                    const tId = await availableTeam(ctx,stringCookie,gid) // 得到战队id'
                    if(tId[0].id === undefined){

                        break; 
                    }else{

                    
                    const fristId = tId[0].id
                    
                    teamId.push(fristId)
                    console.log('fristId',fristId,)
                    console.log('teamId',teamId,)

                    let itme = await availableMember(ctx,stringCookie,gid,fristId)
                    MemberArry.push(itme)
                    console.log('itme',itme,)
                    console.log('MemberArry',MemberArry,)

                    let id = await orderReg(ctx,stringCookie,gid,fristId,itme) 
                    resid.push(id)
                    console.log('id',id,) 
                    console.log('resid',resid,) 
                    }
                }
                console.log(`循环1次结束`)
            }
        }catch(err){
            console.log(err.message);
        }
        

    
        // let teamId =[]
        // let MemberArry =[]
        // let resid=[]
        // gameId.forEach(async vuale =>{
        //     console.log('vuale',vuale)
        //     await vuale.forEach(async gid => {
        //         // element
        //         console.log('gid',gid)
        //         let tId = await availableTeam(ctx,stringCookie,gid) // 得到战队id
        //         teamId.push(tId)
                
        //         console.log('teamIdinner',teamId)
        //         let itme = await availableMember(ctx,stringCookie,gid,tId)
        //         console.log('itme',itme)
        //         MemberArry.push(itme)
        //         let id = await orderReg(ctx,stringCookie,gid,tId,itme) 
        //         console.log('id',id) 
        //         resid.push(id)
                
        //           // 战队成员数组
        //         // console.log('resid',id)

        //     });
        // })


         return [teamId,MemberArry,resid,teamLenth]

    
    }


 




    async function putInfomationA (ctx){
        let {role, referee} = ctx.request.body;
        console.log('role',role,'referee',referee)
        console.log('mode-body',ctx.request.body)
        
        return  {role, referee}
   
    }





module.exports ={
    register,
    login,
    putInfomation,
    createTeam,
    addStudent,
    gameProjectId,
    availableTeam,
    availableMember,
    orderReg,
    commitReg,
    
    putInfomationA
    

}