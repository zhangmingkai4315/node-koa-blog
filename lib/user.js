var User=require('../models').User;
exports.addUser=function (data) {
  return User.create(data);
};

exports.getUserById=function (id) {
  return User.findbyId(id).exec();
};

// 执行不包含回调的查询，所有的错误处理都交给上层处理？
exports.getUserByName=function (name) {
  return User.findOne({name:name}).exec();
};
