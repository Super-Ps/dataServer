const fs = require('fs')

 const readJson  = function (){
   
    return new Promise(function (resolve, reject){

        fs.readFile('res.json',function(err,data){
            
            if(err) return  reject(err) 
            // console.log('异步读取文件内容',JSON.parse(data)['战队创建者'].phoneNum)
            const jsonFilePhoneNum = JSON.parse(data)['战队创建者'].phoneNum
            console.log('异步读取文件内容',JSON.parse(data)['战队创建者'].phoneNum)
            return resolve(jsonFilePhoneNum)
        })
    })
 
    
    
 }

// const readJson = function(){
//     const data = fs.readFileSync('res.json')
//     const jsonFilePhoneNum = JSON.parse(data)['战队创建者'].phoneNum
//      return  jsonFilePhoneNum
// }



 const  writeProjectIdJson = function (data) {

    fs.writeFile('write.json', data,  function(err) {

        if (err) throw err;
        console.log("数据写入成功！");

     });
 }
 const  readProjectIdJson = function () {

    return new Promise(function (resolve ,reject){

        fs.readFile('write.json', function(err,data) {

            if(err) return  reject(err) 
            console.log('读write.json取成功',JSON.parse(data).id)
            
            const  id =JSON.parse(data).id

            return resolve(id)
            
         });
    })
 
 }

readJson()
// writeJson()
// readProjectIdJson()
 module.exports ={
    readJson,
    writeProjectIdJson,
    readProjectIdJson
 }