var validator = require('validator');
var crypto = require('crypto');

module.exports={
  "(GET|POST) /signup":{
    "request":{
      "session":checkNotLogin
    }
  },
  "(POST) /signup":{
    "request":{
      "body":checkSignupBody
    }
  }
};
function md5 (str) {
  // body...
  return crypto.createHash('md5').update(str).digest('hex');
}

function checkNotLogin() {
  // body...
  if(this.session&&this.session.user){
    this.flash={error:'已登录'};
    this.redirect('back');
    return false;
  }
  return true;
}
function checkSignupBody() {
  // body...
  var body=this.request.body;
  var flash;
  if(!body||!body.name){
    flash={error:'Username is empty'};
  }else if(!body.email||!validator.isEmail(body.email)){
    flash={error:'Email is empty or not valida'};
  }else if(!body.password){
    flash={error:'password is empty'};
  }else if(body.password!==body.re_password){
    flash={error:'Diff password and re_password is not same'};
  }else if(!body.gender||!~['男','女'].indexOf(body.gender)){
    flash={error:'gender error'};
  }else if(body.signature&&body.signature.length>50){
    flash={error:"signature is error"};
  }

  if(flash){
    console.log(flash);
    this.flash=flash;
    this.redirect('back');
    return false;
  }
  body.name=validator.trim(body.name);
  body.email=validator.trim(body.email);

  body.password=md5(validator.trim(body.password));
  return true;
}
function checkLogin(){
  if(!this.session||!this.session.user){
    this.flash={error:'未登录'};
    this.redirect('/signup');
    return false;
  }
  return true;
}
