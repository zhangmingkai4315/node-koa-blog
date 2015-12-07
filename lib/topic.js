var Topic=require('./models').Topic;
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
