import mongoose from '../config/DBHepler'
import moment from 'dayjs'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String, index: { unique: true }, sparse: true },
  name: { type: String },
  password: { type: String },
  created: { type: Date },
  updated: { type: Date },
  favs: { type: Number, default: 100 },
  gender: { type: String, default: '' },
  roles: { type: Array, default: ['user'] },
  pic: { type: String, default: '/img/avatar.jpeg' },
  mobile: { type: String, match: /^1[3-9](\d{9})/ },
  status: { type: String, default: 0 },
  regmark: { type: String, default: '' },
  location: { type: String, default: '' },
  isVip: { type: String, default: '0' },
  count: { type: Number, default: 0 }
})

UserSchema.pre('save', function(next) {
  this.created = moment().format('YYYY-MM-DD HH:mm:ss')
  next()
})

UserSchema.pre('update', function(next) {
  this.updated = moment().format('YYYY-MM-DD HH:mm:ss')
  next()
})

UserSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Error:Mongoose has a duplicate key.'))
  } else {
    next(error)
  }
})

UserSchema.static = {
  findByID: function(id) {
    return this.findOne(
      { _id: id },
      {
        password: 0,
        username: 0,
        mobile: 0
      }
    )
  }
}

const UserModel = mongoose.model('users', UserSchema)

export default UserModel
