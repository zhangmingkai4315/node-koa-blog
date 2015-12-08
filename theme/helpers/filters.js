var gravatar=require('gravatar');
var moment=require('moment');
var md=require('markdown-it')();
var pkg=require('../package');
moment.locale(pkg.locals);

module.exports={
  get fromNow(){
    return function(date){
      return moment(date).fromNow();
    };
  },
  get gravatar(){
    return gravatar.url;
  },
  get markdown(){
    return function(content){
      return md.render(content);
    };
  }
};
