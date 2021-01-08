import mongoose from '../config/DBHelper'

const Schema = mongoose.Schema

const CommentsSchema = new Schema(
  {
    cid: { type: String, ref: 'comments' },
    commentAuth: { type: String, ref: 'users' }, // 被点赞用户的id
    uid: { type: String, ref: 'users' }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

CommentsSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'))
  } else {
    next(error)
  }
})

CommentsSchema.statics = {
  findByCid(id) {
    return this.findByCid({ cid: id })
  }
}

const CommentsHands = mongoose.model('comments_hands', CommentsSchema)

export default CommentsHands
