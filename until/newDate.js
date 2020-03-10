async function getdenfindDate (staus) {
    const TimeSigningUp =  new Array()
    const gameTime =  new Array()
    const curDatec = new Date();


     function getdate(date){
        // var date = new Date();
        const year = date.getFullYear();

        const month = (date.getMonth()+1)<10?'0'+(date.getMonth()+1):date.getMonth()+1;   // <10?'0@'+date.getMonth()+1:date.getMonth()+1
        const day = date.getDate()<10 ?'0'+date.getDate() :date.getDate();
        const hour = '00';//date.getHours()<10 ?'0'+date.getHours() :date.getHours();
        const minute = '00';//date.getMinutes()<10 ?'0'+date.getMinutes() :date.getMinutes();
        const second = '00';//date.getSeconds()<10 ?'0'+date.getSeconds() :date.getSeconds();

        // let GMT = year+'-'+month+'-'+day+hour+':'+minute+':'+second
        // console.log(year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second)
        // console.log('gmt',new Date('2020-01-12 00:00:00'))
        return year+'-'+month+'-'+day+hour+':'+minute+':'+second
    }
        // 报名开始 缴费开始 为当天
      const bmjfStart = getdate( new Date(curDatec.getTime() +0*(24*60*60*1000)) )
    // 结束为大1天
     const bmjfEnd = getdate( new Date(curDatec.getTime() +1*(24*60*60*1000)) )
    // let TimeSigningUpStart,
    // tStart,TimeSigningUpEnd,tend,gameTimeStart,gstart,gameTimeEnd,gend
    switch (staus){
        case 'ns':  // 未开始
            const TimeSigningUpStartns = new Date(curDatec.getTime() +1*(24*60*60*1000))
            const tStartns = getdate(TimeSigningUpStartns) 
            const TimeSigningUpEndns = new Date(curDatec.getTime() +2*(24*60*60*1000))
            const tendns = getdate(TimeSigningUpEndns)
            TimeSigningUp[0]=tStartns
            TimeSigningUp[1]=tendns

            const gameTimeStartns = new Date(curDatec.getTime() +4*(24*60*60*1000))
            const  gstartns=  getdate(gameTimeStartns)
            const gameTimeEndns = new Date(curDatec.getTime() +6*(24*60*60*1000))
            const  gendns=  getdate(gameTimeEndns)
            gameTime[0]=gstartns
            gameTime[1]=gendns
    //game time
            break;
        case 'sg': // 报名中
            const TimeSigningUpStartsg = new Date(curDatec.getTime() -1*(24*60*60*1000))
            const tStartsg = getdate(TimeSigningUpStartsg) 
            const TimeSigningUpEndsg = new Date(curDatec.getTime() +3*(24*60*60*1000))
            const tendsg = getdate(TimeSigningUpEndsg)
            TimeSigningUp[0]=tStartsg
            TimeSigningUp[1]=tendsg

            const gameTimeStartsg = new Date(curDatec.getTime() +4*(24*60*60*1000))
            const  gstartsg=  getdate(gameTimeStartsg)
            const gameTimeEndsg = new Date(curDatec.getTime() +6*(24*60*60*1000))
            const  gendsg=  getdate(gameTimeEndsg)
            gameTime[0]=gstartsg
            gameTime[1]=gendsg
            break;
        case 'gg': // 比赛中
            const TimeSigningUpStartgg = new Date(curDatec.getTime() -5*(24*60*60*1000))
            const tStartgg = getdate(TimeSigningUpStartgg) 
            const TimeSigningUpEndgg = new Date(curDatec.getTime() -4*(24*60*60*1000))
            const tendgg = getdate(TimeSigningUpEndgg)
            TimeSigningUp[0]=tStartgg
            TimeSigningUp[1]=tendgg

            const gameTimeStartgg = new Date(curDatec.getTime() -3*(24*60*60*1000))
            const  gstartgg=  getdate(gameTimeStartgg)
            const gameTimeEndgg = new Date(curDatec.getTime() +4*(24*60*60*1000))
            const  gendgg=  getdate(gameTimeEndgg)
            gameTime[0]=gstartgg
            gameTime[1]=gendgg
            break;
        case 'gr':  // 比赛结束
            const TimeSigningUpStartgr = new Date(curDatec.getTime() -4*(24*60*60*1000)) //4
            const tStartgr = getdate(TimeSigningUpStartgr) 
            const TimeSigningUpEndgr = new Date(curDatec.getTime() -3*(24*60*60*1000))   //3
            const tendgr = getdate(TimeSigningUpEndgr)
            TimeSigningUp[0]=tStartgr
            TimeSigningUp[1]=tendgr

            const gameTimeStartgr = new Date(curDatec.getTime() -2*(24*60*60*1000))
            const  gstartgr=  getdate(gameTimeStartgr)
            const gameTimeEndgr = new Date(curDatec.getTime() -1*(24*60*60*1000))
            const  gendgr=  getdate(gameTimeEndgr)
            gameTime[0]=gstartgr
            gameTime[1]=gendgr
            break;
        default :

            console.log('参数错误')
            throw new Error('参数错误')
    }  
    // console.log('@@@@',[...TimeSigningUp,...gameTime,bmjfStart,bmjfEnd])
    
    return [...TimeSigningUp,...gameTime,bmjfStart,bmjfEnd]
}

/* 1.9日
报名时间：1.10-1.12
比赛时间：1.13-1.15 ----未开始

报名时间：1.8-1.12
比赛时间：1.13-1.15 ----报名中

报名时间：1.4-1.5
比赛时间：1.6-1.15 ----比赛中 差不多以此类推


*/

getdenfindDate('gg')
exports.getdenfindDate = getdenfindDate