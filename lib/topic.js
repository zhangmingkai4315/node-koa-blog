var Topic=require('../models').Topic;
var cache = require('co-cache')();
exports.addTopic=function (data) {
  return Topic.create(data);
};

exports.getTopicById=function (id) {
    return Topic.findByIdAndUpdate(id,{$inc:{pv:1}}).exec();
};

exports.getTopicByTab=cache(function *getTopicByTab(tab,p) {
  var query={};
  if(tab){
    query.tab=tab;
  }
return yield Topic.find(query).skip((p-1)*10).sort('-updated_at').limit(10).select('-content').exec();
},10000);


exports.getTopicsByName=function (name) {
  return Topic.find({'user.name':name}).sort('-updated_at').exec();
};

exports.incCommentById=function (id) {
  return Topic.findByIdAndUpdate(id,{$inc:{comment:1}});
};


exports.getNoReplyTopic=cache(function *getNoReplyTopic() {
  return yield Topic.find({comment:0}).sort('-updated_at').limit(10).select('title').exec();
},10000);

exports.getTopicsCount=function*(tab){
  var query={};
  if(tab){
    query.tab=tab;
  }
  return yield Topic.count(query).exec();
};
