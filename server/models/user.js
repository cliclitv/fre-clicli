const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 新建表模型
const UserSchema = new Schema({
  name: {type: String, require: true},
  pwd: {type: String, require: true},
  qq: {type: String, require: true},
  desc: {type: String, require: true},
  role:{type:String,require:true}
  // Articles : [{ type: Schema.Types.ObjectId, ref: 'Article' }]
})

module.exports=mongoose.model('User', UserSchema)