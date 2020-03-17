const  EventEmitter  =  require('events')
const rp = require('request-promise')
const newPath = 'http://www.test.makex.cc/api/'

const myEmitter  =  new EventEmitter()
const fs = require("fs")

// http://www.test.makex.cc/api/admin/login


async function login(){
    const options = {
            method: 'POST',
            uri: `${newPath}admin/login`,
            form : {
                phone_zone :'+86',
                phone_num : '13631525634',
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
// aravel_session=shr9HwvIwK7cCzJwKgQKGk4Mu3YMLUlFnzjoBA5z; accessToken=0fd533b4-69b7-3fa8-8742-7a38fb6a12e1; login_lang=zh; lang=zh;
async function getTeacherId(stringCookie,phoneno) {
    
    const options = {
        method: 'GET',
        uri: `${newPath}admin/user?name=&phone=${phoneno}`,
        headers: { 
            Cookie: stringCookie,
            'Content-Type': 'application/x-www-form-urlencoded' 
            }

    };
    try{
  
        let res = await rp(options)
        // console.log('开始执行2')
        const stringRes =JSON.parse(res)
        // console.log('开始执行3',stringRes)
         console.log('拿到ID返回',stringRes.data[0].id)
        //  console.log('开始执行4')
        const id =  stringRes.data[0].id
        // console.log('开始执行5')
        return id 
        
    }catch(err){
        console.log(err)
       
    }

}


async function passShenhe(stringCookie,id) {
    
    const options = {
        method: 'POST',
        uri: `${newPath}admin/check_user_idCard`, // /api/admin/check_user_idCard 
        headers: { 
            Cookie: stringCookie,
            'Content-Type': 'application/x-www-form-urlencoded' 
            },
        form : {
            id :`${id}`,
            status :'done',
            role : 'teacher'
            },

    };
    try{
        let res = await rp(options)
        const stringRes =JSON.parse(res)
        //  console.log('审批',res,'审批2',stringRes)
        // const id =  stringRes.data[0].id
        return  res
        
    }catch(err){
        console.log(err)
       
    }

}


myEmitter.on('login',async (phoneno)=>{
    console.log('on-parm',phoneno)
    const cookie = await login(phoneno)
    const id  = await getTeacherId(cookie,phoneno)
    const ox = await passShenhe(cookie,id)

    // console.log('evet返回',id )
    // console.log('ox',ox)
    
    
})








module.exports ={
    myEmitter,
    login,
    getTeacherId,
    passShenhe

}