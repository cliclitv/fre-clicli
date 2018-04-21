const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 新建表模型
const UserSchema = new Schema({
  banner: {type: String, require: true}
})

module.exports = mongoose.model('Option', UserSchema)