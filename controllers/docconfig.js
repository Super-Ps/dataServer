

const updateInfromation = {
  trole:{type: 'string', required: true, example: 't'},
  treferee:{type: 'string', required: true, example: 't/f'},
  srole:{type: 'string', required: true, example: 's'},
  sreferee:{type: 'string', required: true, example: 't/f'},
  nrole:{type: 'string', required: true, example: 'f'},
  nreferee:{type: 'string', required: true, example: 't/f'},
  age:{type: 'int', required: true, example: '10,13,16,18,创建不同年龄的成员时必传'},
}
const teamAddStudent = {
  trole:{type: 'string', required: true, example: 't'},
  treferee:{type: 'string', required: true, example: 't/f'},
  srole:{type: 'string', required: true, example: 's'},
  sreferee:{type: 'string', required: true, example: 't/f'},
  nrole:{type: 'string', required: true, example: 'f'},
  nreferee:{type: 'string', required: true, example: 't/f'},
  age:{type: 'int', required: true, example: '10,13,16,18,创建不同年龄的成员时必传'},
  count:{type: 'int', required: true, example: '3代表3个成员,创建成员时必传'},
  teamnumber:{type: 'int', required: true, example: '10代表10个战队'}
}

const createProject = {
  status:{type: 'string', required: true, example: 'ns[ns比赛中,sg报名中,gg比赛中,gr比赛结束]'},
  pname:{type:'strinf', required: true, example: '输入自定义的赛事名称'}
}
const newCreateAgmes = {
  status:{type: 'string', required: true, example: 'ns[ns比赛中,sg报名中,gg比赛中,gr比赛结束]'},
  pname:{type:'string', required: true, example: '输入自定义的赛事名称'},
  typeId:{type:'array', required: true, example: '[10,9,8], [10=智慧交通  9=智造大师  8=雷霆营救]'}, 
  scheduleType:{type:'array', required: true, example: '[43,"random","headTail"], [10=智慧交通  9=智造大师  8=雷霆营救]'}, 
  // Aname:{type:'string', required: true, example: 'z'}
}


const LineOne = {
  // trole:{type: 'string', required: true, example: 't'},
  // treferee:{type: 'string', required: true, example: 't/f'},
  // srole:{type: 'string', required: true, example: 's'},
  // sreferee:{type: 'string', required: true, example: 't/f'},
  // nrole:{type: 'string', required: true, example: 'f'},
  // nreferee:{type: 'string', required: true, example: 't/f'},
  // age:{type: 'int', required: true, example: '10,13,16,18,创建不同年龄的成员时必传'},
  // count:{type: 'int', required: true, example: '3代表3个成员,创建成员时必传'},
  // teamnumber:{type: 'int', required: true, example: '10代表10个战队'},

  status:{type: 'string', required: true, example: 'ns[ns比赛中,sg报名中,gg比赛中,gr比赛结束]'},
  pname:{type:'string', required: true, example: '输入自定义的赛事名称'},
  typeId:{type:'array', required: true, example: '[10,9,8], [10=智慧交通  9=智造大师  8=雷霆营救]'}, 
  scheduleType:{type:'array', required: true, example: '[43,"random","headTail"], [10=智慧交通  9=智造大师  8=雷霆营救]'}, 
  // Aname:{type:'string', required: true, example: 'z'}
  
}

const payment = {
  gameProjectId:{type:'string', required: true, example: '111'},
  // status:{type: 'string', required: true, example: 'pending [ pending=等待支付 fail= 报名失败  canceled=已取消]'},
}


const passportRegister ={
  email:{type:'string', required: true, example: '格式：xuweiEmailTest，[姓名+Emai+Test ，不用写后缀@qq.com,默认qq.com]'},
  count:{type:'int', required: true, example: '100  [整型]'}
}

const deletePassportUsers ={
  email:{type:'string', required: true, example: '格式：xuweiEmailTest，[姓名+Emai+Test ，值需要写前缀查询条件]'},
 
}


module.exports= { 
  updateInfromation,
  teamAddStudent,
  createProject,
  newCreateAgmes,
  payment,
  LineOne,
  passportRegister,
  deletePassportUsers
}

