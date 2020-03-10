const apiSingle = require('./makeXwebSite')

async function registerNum(ctx){
    return    new Promise((resolve,reject)=>{
        setTimeout(() => {
        //   console.log( 'resolve',apiSingle.register(ctx) )
         const a=  apiSingle.register(ctx)
            resolve (a)
            console.log('等待1S注册^^^^^^^^^^^^',resolve (a))
        }, 1000);
    })
} 

async function loginSetTimeout(ctx,registerPhoneNum){
    return    new Promise((resolve,reject)=>{
        setTimeout(() => {
        //   console.log( 'resolve',apiSingle.login(ctx,registerPhoneNum) )
         const a=  apiSingle.login(ctx,registerPhoneNum)
            resolve (a)
            console.log('等待1S登录^^^^^^^^^^^^',resolve (a))
        }, 1000);
    })
} 

async function putSetTimeout(ctx,stringCookie){
    return    new Promise((resolve,reject)=>{
        setTimeout(() => {
        //   console.log( 'resolve',apiSingle.putInfomation(ctx) )
         const a=  apiSingle.putInfomation(ctx,stringCookie)
            resolve (a)
            console.log('等待2s更新完毕^^^^^^^^^^^^',resolve (a))
        }, 2000);
    })
} 


// 创建多个学生
    async  function createStudentNo(ctx){
        // console.log('for',ctx.params)
         let {count} = ctx.request.body;
         console.log('多少个',count)
         console.log('ctx-###',ctx.request.body)
        // const no = ctx.params.no
        let addStudentNo = []
        for (let i = 1; i<= count; i++){
                // console.log('学生个数',i)
                const registerPhoneNum = await registerNum(ctx)
                 console.log('学生手机号',registerPhoneNum)
                
                const stringCookie = await loginSetTimeout(ctx,registerPhoneNum)
                const putInfomation = await putSetTimeout(ctx,stringCookie)
              //  const res = JSON.parse(putInfomation)
        
                addStudentNo.push(registerPhoneNum.phoneNum)
        } 
            // ctx.body = addStudentNo
        return addStudentNo

    }


 



module.exports ={
    createStudentNo

}

