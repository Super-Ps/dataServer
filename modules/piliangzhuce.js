let mysql =require("../config/mysqlconf")
let PoolTestCase =require('../config/mysqlconf').Pool


const rp = require('request-promise')


const Path = "http://passport-test.makeblock.com/"



async function querysqlList(querystring){
    const querysql = `select uid,email from users where email LIKE '${querystring+'%'}'  ORDER BY uid DESC LIMIT 1;`

    try{
        if (querystring.includes("@")){

            console.log('@@@',querystring.includes("@"))
             return  new  Error("值需要输入前缀@和后面部分不需要输入，默认格式:@qq.com")
        }


        let result = await PoolTestCase.queryAsync(querysql)
           
        if (result.length ===0){
            
            return result=0
        }else{
            console.log('查询passprot-mysql-passport3-core-test返回结果',result)
            const jsonRes=JSON.stringify(result)
            console.log('查',jsonRes)
            console.log('查2',JSON.parse(jsonRes)[0].email)
            const emailNo =JSON.parse(jsonRes)[0].email.match(/\d+/)[0]
            return emailNo
        }
     
        }catch(error){

            throw  error
        }

    }

    const sleep = function (ms){
        return new Promise(resolve => setTimeout(resolve(), ms))
      }

 async function passportRegister(ctx){
    console.log('passport-ctx',ctx.request.body.email)
    const querystring=ctx.request.body.email
    const count=ctx.request.body.count
    
    let emailNo= await querysqlList(querystring) // 查询出当前最大的序列号
    // console.log('emailNoRes',emailNo)

    let insetSql ="INSERT INTO users (userName,email,`password`) values(?,?,?)"
    const passwords = 'bfb97ec1a8796af2732c5784efec1ef8'
    let arryemail=[]
    let sqlres
    
    if(emailNo === 0){

        console.log('emailNo=0',emailNo,emailNo=== 0)
    
        for (let i=0; i<count; i++) {
               

            
            let userNames= `${querystring}${emailNo}`
            let emails =`${querystring}${emailNo}@qq.com`
            
            let args =[userNames,emails,passwords]
            sqlres = await PoolTestCase.queryAsync(insetSql,args)
            emailNo++
            // console.log('sqlres',sqlres,"emailNo++",emailNo)
            arryemail.push( sqlres.insertId)
           
           
        }
        return arryemail
    }

    if(emailNo > 0){
        console.log('emailNo>0++',emailNo,emailNo>0)
        
        for (let i=0; i<count; i++) {
            emailNo ++

            let userNames= `${querystring}${emailNo}`
            let emails =`${querystring}${emailNo}@qq.com`
          
            let args =[userNames,emails,passwords]
            sqlres = await PoolTestCase.queryAsync(insetSql,args)
            
            // console.log('sqlres',sqlres,"emailNo++",emailNo)
     
            arryemail.push( sqlres.insertId)
            
        }
        return arryemail
    }


    // } catch (error) {
    //    return  new Error("passport 注册接口请求错误",error)
    // }

   
 }


 async function  deleteUsers(ctx){
    const querystring=ctx.request.body.email
    let emailNo= await querysqlList(querystring) // 查询出当前最大的序列号
    console.log("emailNo-delect",emailNo,emailNo===0)
    if (emailNo === 0){
        const resobj={message:"没有符合条件的数据删除"}
        return  resobj
    }

    try {
        
        let delsql = `DELETE FROM users where email LIKE '${querystring+'%'}' `;
        sqlres = await PoolTestCase.queryAsync(delsql)
        // console.log("sqlres-------",sqlres)
        return sqlres.affectedRows
    } catch (error) {
        
        return error

    }
  
    
    
 }




 module.exports ={
    passportRegister,
    querysqlList,
    deleteUsers
}