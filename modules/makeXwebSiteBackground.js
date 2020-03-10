const rp = require('request-promise')
const getdenfindDate = require('../until/newDate')
const {writeProjectIdJson} = require('../until/readJson')
// console.log('####',getdenfindDate)
const Path = 'http://www.test.makex.cc/'




    async function webSiteBgLogin() {

        const options = {
            method: 'POST',
            uri: `${Path}api/admin/login`,
            form: {
                phone_zone: '+86',
                phone_num: '13631525634',//`${registerPhoneNum}`,
                password: '123456'
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            resolveWithFullResponse: true

        }
        try {
            let res = await rp(options)
            // console.log('obj',(res.headers['set-cookie']))
            let local_accessToken = res.headers['set-cookie'][0]
            let laravel_session = res.headers['set-cookie'][2]
            let stringCookie = `${local_accessToken};${laravel_session}`
            // ctx.body = stringCookie
            console.log('官网后台登录成功', stringCookie)

            return stringCookie
        } catch (error) {
            console.log('官网后台登录error', error)
            return error
        }
    }


    async function createProject(ctx){
        let {status,pname } = ctx.request.body;
        console.log('入参数',status )
        const timeArry = await getdenfindDate.getdenfindDate(status)
        console.log('timeArry',timeArry,timeArry[0],timeArry[1],timeArry[2],timeArry[3])
        const resCookie  = await webSiteBgLogin()
        console.log ('loginres',resCookie,'type',typeof(resCookie))
        
        const options = {
            method :'POST',
            uri:`${Path}api/admin/game_project`,
            headers: { 

                'Cookie': resCookie,
               'Content-Type': 'application/x-www-form-urlencoded' 
           },
            form: {
                game_project_type: '1',
                game_zh: '1',  //语言类型
                name_zh: `${pname}`, //赛事名称
                location_zh: '深圳', //比赛地
                reg_start_at: timeArry[0],//报名开始时间
                reg_end_at: timeArry[1], //报名结束时间 'Fri Jan 10 2020 00:00:00 GMT+0800'
                pay_time_start:  timeArry[4],//'Thu Jan 09 2020 00:00:00 GMT+0800', //缴费开始时间
                pay_time_end: timeArry[5], //缴费结束时间
                check_in_start: timeArry[4],//'Thu Jan 09 2020 00:00:00 GMT+0800', //报到开始时间
                check_in_end:   timeArry[5],//'Sat Feb 22 2020 00:00:00 GMT+0800', //报到结束时间
                game_start_at: timeArry[2],//比赛开始时间  'Mon Jan 13 2020 00:00:00 GMT+0800'
                game_end_at: timeArry[3], //比赛结束时间   'Tue Jan 14 2020 00:00:00 GMT+0800'
                provide_invoice: "no" //发票
            },
            // resolveWithFullResponse: true

        }

        try {
            let res = await rp(options)
            const resObj =JSON.parse( res )
            console.log('创建赛事成功',resObj.id,resObj.game_status)
            writeProjectIdJson(JSON.stringify( resObj))
            return {cookie:resCookie, id:resObj.id, game_status:resObj.game_status}
        } catch (error) {
            console.log('比赛error', error)
            return error
        }
        
    }


    async function createAgmes(ctx){
        let {count} = ctx.request.body;
        if(count < 1 ||count >3){

            return  '参数不正确，输入1-3区间的值'
        }
        // const resCookie  = await webSiteBgLogin()
       const  res = await createProject(ctx)
       console.log('ctx.request.body,',ctx.request.body)
       console.log('ctx.request.body2',res)
        
       const options = {
        method :'POST',
        uri:`${Path}api/admin/game`,
        headers: { 

            'Cookie': res.cookie,
           'Content-Type': 'application/x-www-form-urlencoded' 
       },
        form: 
            {
                "game_zh": 1, 
                "game_project_id": res.id,     // 赛事id
                "name_zh": "eiusmod esse nisi est", 
                "type_id": 0,  // 主题类型 5急速，6用着，7守护  2020// 10智慧交通  
                "engineer_note": "yes", 
                "groups": [
                    {
                        "id": 5, 
                        "group_name_zh": "初阶组", 
                        "group_name_en": "Elementary Group", 
                        "age_end_at": "2005-01-02 00:00:00", 
                        "age_start_at": "2013-12-31 23:59:59", 
                        "age_intro_zh": "6-13岁", 
                        "age_intro_en": "6-13 years old"
                    },
                    {
                        "id": 6, 
                        "group_name_zh": "中阶组", 
                        "group_name_en": "Intermediate Group", 
                        "age_end_at": "2002-01-02 00:00:00", 
                        "age_start_at": "2007-12-31 23:59:59", 
                        "age_intro_zh": "12-16岁", 
                        "age_intro_en": "12-16 years old"
                    },
                    {
                        "id": 7, 
                        "group_name_zh": "高阶组", 
                        "group_name_en": "Advanced Group", 
                        "age_end_at": "2000-01-02 00:00:00", 
                        "age_start_at": "2005-12-31 23:59:59", 
                        "age_intro_zh": "14-18岁", 
                        "age_intro_en": "14-18 years old"
                    },
                    {
                        "id": 8, 
                        "group_name_zh": "中级组", 
                        "group_name_en": "Middle Group", 
                        "age_end_at": "2000-01-02 00:00:00", 
                        "age_start_at": "2008-12-31 23:59:59", 
                        "age_intro_zh": "11-18岁", 
                        "age_intro_en": "11-18 years old"
                    }
                   
                ], 
                "price": 0.1, 
                "fee_intro_zh": `${count}主题`, 
                "teacher_min": 1, 
                "teacher_max": 2, 
                "student_min": 2, 
                "student_max": 6, 
                "invitation_code": "no"            
        },
    }
        try {

            if(count === 1){
                // type = 5
                options.form.type_id =5
                let res = await rp(options)
                // console.log('第一次111',res,'@@@',options.form.type_id)
                // console.log('第一次111type',type)
                return res
            }
            if(count === 2){
                // type = 5

                options.form.type_id = 5
                let res1 = await rp(options)
                // console.log('第一次2222--11',res1,'@@@@22',options.form.type_id)
                // console.log('第一次2222type',type)
                options.form.type_id = 6

                let res2 = await rp(options)
                // console.log('第二次2222--22',res2,'@@@@33',options.form.type_id)
                // console.log('第一次2222type',type)
                return [ res1,res2]
            }
            if(count === 3){
                options.form.type_id = 5

                let res1 = await rp(options)
                // console.log('第一次3333-11',res1)
                options.form.type_id = 6

                let res2 = await rp(options)
                // console.log('第二次3333-22',res2)
                options.form.type_id = 7

                let res3 = await rp(options)
                // console.log('第三次3333-33',res3)
                
                 return [ res1,res2, res3]
                //  return res
            }
  
        } catch (error) {
            console.log('比赛error', error)
            return error
        }

    }

 

    async function newCreateAgmes(ctx){
        let {typeId,scheduleType} = ctx.request.body;
        console.log('typeId,scheduleType}',typeId,scheduleType)
        // if(count < 1 ||count >3){

        //     return  '参数不正确，输入1-3区间的值'
        // }
        // const resCookie  = await webSiteBgLogin()
       const  projectResponse = await createProject(ctx)
       console.log('ctx.request.body,',ctx.request.body)
       console.log('createProject',projectResponse)
        
       const options = {
        method :'POST',
        uri:`${Path}api/admin/game`,
        headers: { 

            'Cookie': projectResponse.cookie,
            'Content-Type': 'application/x-www-form-urlencoded' 
            },
            form: 
            {
                "game_zh": 1, 
                "game_project_id": projectResponse.id,     // 赛事id
                "type_id": 0,  // 主题类型 5急速，6用着，7守护  2020// 10智慧交通  9智造大师  8雷霆营救
                "groups": [
                    
                   
                ], 
                "engineer_note":"no",
                "invitation_code": "no",
                "price": 0.1, 
                // "fee_intro_zh": `${count}主题`, 
                "teacher_min": 1, 
                "teacher_max": 2, 
                "student_min": 2, 
                "student_max": 8, 
               
                "schedule_type":`${scheduleType}`          
            },
        }

        async function firstOne(){
           
            options.form.type_id = typeId[0]
            options.form.schedule_type =scheduleType[0]  
            console.log('scheduletype',scheduleType)
            const groupArry =[{
                "id": 9, 
                "group_name_zh": "小学组", 
                "group_name_en": "Elementary Group", 
                "age_end_at": "2006-01-02 00:00:00", 
                "age_start_at": "2014-12-31 23:59:59", 
                "age_intro_zh": "6-13岁", 
                "age_intro_en": "6-13 years old"
            },
            {
                "id": 10, 
                "group_name_zh": "中阶组", 
                "group_name_en": "Intermediate Group", 
                "age_end_at": "2003-01-02 00:00:00", 
                "age_start_at": "2008-12-31 23:59:59", 
                "age_intro_zh": "12-16岁", 
                "age_intro_en": "12-16 years old"
            }]
            options.form.groups.push(...groupArry)
            // console.log('groupArry',options.form.groups)
            const res = await rp(options)
            options.form.groups.length = 0
            return res
        }

        async function second(){

            options.form.type_id = typeId[1]
            options.form.schedule_type =scheduleType[1] 
            const groupArry =[ {
                "id": 11, 
                "group_name_zh": "中学组", 
                "group_name_en": "Middle Group", 
                "age_end_at": "2001-01-02 00:00:00", 
                "age_start_at": "2009-12-31 23:59:59", 
                "age_intro_zh": "11-18岁", 
                "age_intro_en": "11-18 years old"
            }]
            options.form.groups.push(...groupArry)

           const res  = await rp(options)
           options.form.groups.length = 0
           return res
        }

        async function third(){
            options.form.type_id = typeId[2]
            options.form.schedule_type =scheduleType[2] 
            const groupArry =[ {
                    "id": 12, 
                    "group_name_zh": "高中组", 
                    "group_name_en": "High School Group", 
                    "age_end_at": "2001-01-02 00:00:00", 
                    "age_start_at": "2006-12-31 23:59:59", 
                    "age_intro_zh": "14-18岁", 
                    "age_intro_en": "14-18 years old"
                },
                {
                    "id": 13, 
                    "group_name_zh": "高校组", 
                    "group_name_en": "Post-Secondary Group", 
                    "age_end_at": "1900-01-02 00:00:00", 
                    "age_start_at": "2004-12-31 23:59:59", 
                    "age_intro_zh": "16岁以上", 
                    "age_intro_en": "Over 16 years old"
                }]
            options.form.groups.push(...groupArry)

           const res  = await rp(options)
           options.form.groups.length = 0
           console.log('third',res)
           return res
        }
        if(typeId.length ==1 && scheduleType.length ==1){
          const f =  await firstOne()

           return  [ {f: f},projectResponse]
               

        }else if(typeId.length ==2 && scheduleType.length ==2){

           const f = await firstOne()
           const  s  = await second()
           return [ {f: f} ,{s:s} ,projectResponse]

        }else if(typeId.length ==3 && scheduleType.length ==3){

            const f =  await firstOne()
            const s =  await second()
            const t = await third()
           return [ {f: f} ,{s:s} ,{t:t} ,projectResponse]
        }else{
            return {messge:'参数个数组或者对应关系错误'}
        }

    }

    async function getGameProjectId (ctx,stringCookie){

        let {gameProjectId} = ctx.request.body;
        // const stringCookie  = await webSiteBgLogin()
            // http://www.test.makex.cc/api/admin/reg_list?game_project_id=380&status=pending
        const options = {
            method: 'GET',
            uri: `${Path}api/admin/reg_list?game_project_id=${gameProjectId}&status=pending`,
            headers: { 
                Cookie: stringCookie,
                'Content-Type': 'application/x-www-form-urlencoded' 
                }
    
        };
        const res  = await rp(options)
        const jsonRes = JSON.parse(res)
        const dataArry = jsonRes.data
        return  jsonRes

    }


    async function  passPayment(stringCookie,id){

        // http://www.test.makex.cc/api/admin/reg/payment

       
        const options = { 
            method: 'PUT',
            url: `${Path}api/admin/reg/payment`,
            headers: { 

            Cookie: stringCookie,
            'Content-Type': 'application/x-www-form-urlencoded' ,
    
            },
            form: 
            {
                id: `${id}`,
                payment_status: 'done',//`${registerPhoneNum}`,
               
            }


    };
    const res  = await rp(options)
       
    }

    
    module.exports ={
        webSiteBgLogin,
        createProject,
        createAgmes,
        newCreateAgmes,
        getGameProjectId,
        passPayment
    }
