const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 新建评论数据表模型
const CommentSchema = new Schema({
  title: {type: String, require: true},
  content: {type: String, require: true},
  time: {type: Date, default: Date.now},
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  pid: {type: Schema.Types.ObjectId, require: true}
})

module.exports = mongoose.model('Comment', CommentSchema)