import send from '../config/MailConfig'
import moment from 'dayjs'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import config from '../config'
import { checkCode } from '../common/Utils'
import User from '../model/User'
import SignRecord from '../model/SignRecord'

class LoginController {
  async forget(ctx) {
    const { body } = ctx.request
    console.log('fdsafdas')
    try {
      const result = await send({
        code: '1324',
        expire: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
        email: body.username,
        user: 'hahahah'
      })
      ctx.body = {
        code: 200,
        data: result,
        msg: '邮件发送成功'
      }
    } catch (e) {
      console.log('报错啦--', e)
    }
  }

  async login(ctx) {
    // 接收用户的数据
    // 返回token
    const { body } = ctx.request
    const sid = body.sid
    const code = body.code
    // 验证图片验证码的时效性、正确性
    const result = await checkCode(sid, code)
    if (result) {
      // 验证用户账号密码是否正确
      let checkUserPasswd = false
      const user = await User.findOne({ username: body.username })
      console.log('user---', user)
      if (await bcrypt.compare(body.password, user.password)) {
        checkUserPasswd = true
      }
      // mongoDB查库
      if (checkUserPasswd) {
        // 验证通过，返回Token数据
        console.log('Hello login')
        const userObj = user.toJSON()
        const arr = ['password', 'username', 'roles']
        arr.map((item) => {
          delete userObj[item]
        })
        console.log('userobj===', userObj)
        const token = jsonwebtoken.sign(
          { _id: userObj['_id'] },
          config.JWT_SECRET,
          {
            expiresIn: '1d'
          }
        )
        // 加入isSign属性
        console.log('id===', userObj._id)
        const signRecord = await SignRecord.findByUid(userObj._id)
        console.log('lalalal', signRecord)
        if (signRecord !== null) {
          if (
            moment(signRecord.created).format('YYYY-MM-DD') ===
            moment().format('YYYY-MM-DD')
          ) {
            userObj.isSign = true
          } else {
            userObj.isSign = false
          }
          userObj.lastSign = signRecord.created
        } else {
          // 用户无签到记录
          userObj.isSign = false
        }

        ctx.body = {
          code: 200,
          data: userObj,
          token: token
        }
      } else {
        // 用户名 密码验证失败，返回提示
        ctx.body = {
          code: 404,
          msg: '用户名或者密码错误'
        }
      }
    } else {
      // 图片验证码校验失败
      ctx.body = {
        code: 401,
        msg: '图片验证码不正确,请检查！'
      }
    }
  }

  async reg(ctx) {
    const { body } = ctx.request
    const sid = body.sid
    const code = body.code
    let check = true
    const msg = {}
    // 验证图片验证码的时效性、正确性
    const result = await checkCode(sid, code)
    if (result) {
      const user1 = await User.findOne({ username: body.username })
      if (user1 !== null && typeof user1.username !== 'undefined') {
        msg.username = ['此邮箱已经注册，可以通过邮箱找回密码']
        check = false
      }

      const user2 = await User.findOne({ name: body.name })
      if (user2 !== null && typeof user2.name !== 'undefined') {
        msg.name = ['此昵称已经注册']
        check = false
      }
      if (check) {
        body.password = await bcrypt.hash(body.password, 5)
        const user = new User({
          username: body.username,
          name: body.name,
          password: body.password,
          created: moment().format('YYYY-MM-DD HH:mm:ss')
        })
        const result = await user.save()
        console.log('reg -> result', result, user)
        ctx.body = {
          code: 200,
          data: result,
          msg: '注册成功'
        }
        return
      }
    } else {
      msg.code = ['验证码已经失效，请重新获取']
    }
    ctx.body = {
      code: 500,
      msg: msg
    }
  }
}

export default new LoginController()
