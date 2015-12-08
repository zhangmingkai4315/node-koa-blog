var Models=require('../lib/core');
var $User=Models.$User;

exports.get=function*() {
  yield this.render('signup');
};
exports.post=function*(){
  console.log(data);
  var data=this.request.body;
  var userExist=yield $User.getUserByName(data.name);
  if(userExist){
    this.flash({error:'exist user'});
    this.redirect('/');
  }
  yield $User.addUser(data);
  this.session.user={
    name:data.name,
    email:data.email
  };
  this.flash={success:'success'};
  this.redirect('/');
};
