import mongoose from '../config/DBHelpler'
import moment from 'dayjs'
import CommentsHands from './CommentsHands'

const Schema = mongoose.Schema

const CommentsSchema = new Schema(
  {
    tid: { type: String, ref: 'post' },
    uid: { type: String, ref: 'users' }, // 文章作者ID
    cuid: { type: String, ref: 'users' }, // 评论用户的ID
    content: { type: String },
    hands: { type: Number, default: 0 },
    status: { type: String, default: '1' },
    isRead: { type: String, default: '0' },
    isBest: { type: String, default: '0' }
  },
  {
    toJSON: { virtuals: true },
    timestamps: { createdAt: 'created', updatedAt: 'updated' }
  }
)

CommentsSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'))
  } else {
    next(error)
  }
})

CommentsSchema.statics = {
  findByTid: (id) => {
    return this.find({ tid: id })
  },
  findBycid: (id) => {
    return this.find({ cid: id })
  },
  getCommentsList(id, page, limit) {
    return this.find({ tid: id })
      .populate({
        path: 'cuid',
        select: '_id name pic isVip',
        match: { status: { $eq: '0' } }
      })
      .populate({
        path: 'tid',
        select: '_id title status'
      })
      .skip(page * limit)
      .limit(limit)
  },
  queryCount(id) {
    return this.find({ tid: id }).countDocuments()
  }
}

const Comments = mongoose.model('comments', CommentsSchema)

export default Comments
