const  randomName = require("chinese-random-name");

const prelist = ["130", "131", "132", "133", "134", "135", "136", "137", "138", "139", "147", "150", "151", "152", "153", "155", "156", "157", "158", "159", "186", "187", "188"]
const number = "0123456789"

function phoneNum() {

    let joinArry = ''
    let a = prelist[Math.floor(Math.random() * prelist.length )]
    for (let i = 0; i < number.length; i++) {
        joinArry += Math.floor(Math.random() * number.length)
    }
    return (a + joinArry).slice(0,11)
}

 console.log(phoneNum())


 console.log(randomName.generate());

 phoneNum()

exports.phoneNum = phoneNum