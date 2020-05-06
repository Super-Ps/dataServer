const passportRegister =require('../modules/piliangzhuce')


function getId_no(age){
    // console.log('age',age)
    let birthday=''
    let currAge=''
    let myDate = new Date()
    myDate.setMonth(myDate.getMonth()-1);
    const perMon = myDate.getMonth()+1 
    const perMonth =perMon < 10 ? '0'+perMon : perMon
    // console.log('perMonth',perMonth)
    if(age === 0){
         currAge = '1988'
         birthday =`${currAge}${perMonth}01` // 生日
    }
    if(age >=1 && age <= 13){
         currAge =myDate.getFullYear()-age
        // console.log('currAge13',currAge,)
        // console.log('上个月份',perMonth)
        birthday =`${currAge}${perMonth}13`
    }
    if(age >=14 && age <=18){
        currAge =myDate.getFullYear()-age
        // console.log('currAge14',currAge)
        birthday =`${currAge}${perMonth}14`

    }
    if(age >18){
        currAge =myDate.getFullYear()-age
        // console.log('currAge18',currAge)
        birthday =`${currAge}${perMonth}18`

    }

    // console.log('birthday',birthday)
    const coefficientArray = [ "7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2"];// 加权因子
    const lastNumberArray = [ "1","0","X","9","8","7","6","5","4","3","2"];// 校验码
    const address = "420101"; // 住址
    let newBirthday = birthday.slice(0,4)+'-'+birthday.slice(4,6)+'-'+birthday.slice(6)
    let s = Math.floor(Math.random()*10).toString() + Math.floor(Math.random()*10).toString() + Math.floor(Math.random()*10).toString();
    let array = (address + birthday + s).split(""); 
    // console.log ('array',array)
    let total = 0;
    for(i in array){
    total = total + parseInt(array[i])*parseInt(coefficientArray[i]);
    // console.log('i',i)
    // console.log('total',total)
    } 
    var lastNumber = lastNumberArray[parseInt(total%11)];
    var id_no_String= address + birthday + s + lastNumber;
    // var x = document.getElementsByName("id_no");
    // for (var i = 0; i < x.length; i++) {
    // var o = x[i];
    // o.value = id_no_String;
    // }
    
    // console.log( 'over',id_no_String,newBirthday,address,lastNumber,total)
    // return {id_no_String,newBirthday}
     return {id_no_String,newBirthday}
}

//  getId_no(13)
//  passportRegister.querysqlList("boomertest")
exports.idCard = getId_no

// console.log('2' ,getId_no(13))