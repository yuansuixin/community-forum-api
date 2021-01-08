import mongoose from '../config/DBHelper'
import moment from 'dayjs'

const Schema = mongoose.Schema

const SignRecordSchema = new Schema({
  // 设置关联对应
  uid: { type: String, ref: 'users' },
  created: { type: Date },
  favs: { type: Number }
})

SignRecordSchema.pre('save', function (next) {
  this.created = moment().format('YYYY-MM-DD HH:mm:ss')
  next()
})
// db.sign_record.insert({'uid':'5f227357d384b150103704fb',favs:2,'created':'2020-07-30T07:14:31.000Z'})
SignRecordSchema.statics = {
  findByUid(uid) {
    return this.findOne({ uid: uid }).sort({ created: -1 })
  }
}

const SignRecord = mongoose.model('sign_record', SignRecordSchema)

export default SignRecord
