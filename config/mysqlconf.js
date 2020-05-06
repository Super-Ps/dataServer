const config = require("./basecof")
let Promise = require('bluebird');
let mysql = Promise.promisifyAll(require('mysql'));


module.exports = {
    Pool:Promise.promisifyAll(
    mysql.createPool({
        host: '120.25.31.149',              //config.mysql.host,
        port: '3306',                       //config.mysql.port,
        user: 'root',               //config.mysql.user,
        password: 'tEKIZtC0CXjg' ,   //config.mysql.password,
        database: 'passport3-core-test',
        connectionLimit: 5,
    })
  
  ),
}



// const connection =mysql.createConnection(
//     {
//         host:'120.25.31.149',
//         user:'root',
//         password:'tEKIZtC0CXjg',
//         database:'passport3-core-test'
//     }
// )


// connection.connect()



// async function querysqlList(querystring){
//     console.log('querysqlList-querystring',querystring)
//     const querysql = `select uid,email from users where email LIKE '${querystring+'%'}'  ORDER BY uid DESC LIMIT 1;`

    
//     connection.query(querysql,function(err,res){
//         if(err){
//             console.log('查询错误',err)
//             return err
//         }

//         console.log('res.length ',res.length )
//         if (res.length == 0){
           
//             return "xxxxx"
//         }
    
//         console.log('查询passprot-mysql-passport3-core-test返回结果',res)
//         const jsonRes=JSON.stringify(res)
//         console.log('查',jsonRes)
//         console.log('查2',JSON.parse(jsonRes)[0].email)

     
//         const emailNo =JSON.parse(jsonRes)[0].email.match(/\d+/)[0]
//         // console.log(  email.split("Email") )
//         console.log(emailNo )

//         return emailNo

//     })


    

// }


// module.exports={

//     querysqlList
// }





