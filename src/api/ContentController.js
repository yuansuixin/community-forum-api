import Post from '../model/Post'
import Links from '../model/Links'
// import fs, { read } from 'fs'
import fs from 'fs'
import uuid from 'uuid/v4'
import moment from 'dayjs'
import config from '../config'
// import userCollect from '../model/UserCollect'

// 方法一
// import {dirExists} from '@/common/Utils'
import mkdir from 'make-dir'
import { checkCode, getJWTPayload, rename } from '../common/Utils'
import User from '../model/User'

class ContentController {
  async getPostList(ctx) {
    const body = ctx.query
    console.log('list data:', body)

    // 测试数据
    // const post = new Post({
    //   title: 'test title',
    //   content: 'test content',
    //   catalog: 'ask',
    //   fav: 20,
    //   isEnd: '0',
    //   reads: '0',
    //   answer: '0',
    //   status: '0',
    //   isTop: '0',
    //   sort: '0',
    //   tags: [
    //     {
    //       name: '精华',
    //       class: ''
    //     }
    //   ]
    // })
    // const tmp = await post.save()
    // console.log('ContentController -> getPostList -> tmp', tmp)

    const sort = body.sort ? body.sort : 'created'
    const page = body.page ? parseInt(body.page) : 0
    const limit = body.limit ? parseInt(body.limit) : 20
    const options = {}
    if (typeof body.catalog !== 'undefined' && body.catalog !== '') {
      options.catalog = body.catalog
    }
    if (typeof body.isTop !== 'undefined') {
      options.isTop = body.isTop
    }
    if (typeof body.status !== 'undefined' && body.status !== '') {
      options.isEnd = body.status
    }
    if (typeof body.tag !== 'undefined' && body.tag !== '') {
      options.tags = { $elemMatch: { name: body.tag } }
    }
    const result = await Post.getList(options, sort, page, limit)
    ctx.body = {
      code: 200,
      data: result,
      msg: '获取文章列表成功'
    }
  }

  async getLinks(ctx) {
    const result = await Links.find({ type: 'links' })
    ctx.body = {
      code: 200,
      data: result
    }
  }

  async getTips(ctx) {
    const result = await Links.find({ type: 'tips' })
    ctx.body = {
      code: 200,
      data: result
    }
  }

  async getTopWeek(ctx) {
    const result = await Post.getTopWeek()
    ctx.body = {
      code: 200,
      data: result
    }
  }

  // 上传图片接口
  async uploadImg(ctx) {
    const file = ctx.request.files.file
    // 图片名称、图片格式、存储的位置，返回前台一个可以读取的路径
    const ext = file.name.split('.').pop()
    const dir = `${config.uploadPath}/${moment().format('YYYYMMDD')}`

    // 判断路径是否存在，不存在则创建
    await mkdir(dir)
    // 存储文件到指定的路径，给文件一个唯一的名称
    const picname = uuid()
    const destPath = `${dir}/${picname}.${ext}`
    const reader = fs.createReadStream(file.path)
    const upStream = fs.createWriteStream(destPath)
    const filePath = `/${moment().format('YYYYMMDD')}/${picname}.${ext}`

    // 方法一
    // read.pipe(upStream)

    //     const stat = fs.statSync(file.path)
    //     console.log('文件的长度==',stat.size)
    // //方法二，大一些的文件可以使用,并且可以获取到上传的进度
    //     let totalLength = 0
    //     reader.on('data', chunk => {
    //       if (upStream.write(chunk) === false) {
    //         reader.pause()
    //       }
    //     })

    //     reader.on('diain', () => {
    //       reader.resume()
    //     })

    //     reader.on('end', () => {
    //       upStream.end()
    //     })

    ctx.body = {
      code: 200,
      msg: '图片上传成功',
      data: filePath
    }
  }

  // 添加新帖
  async addPost(ctx) {
    const { body } = ctx.request
    const sid = body.sid
    const code = body.code
    // 验证图片验证码的时效性、正确性
    const result = await checkCode(sid, code)
    if (result) {
      const obj = await getJWTPayload(ctx.header.authorization)
      // 判断用户的积分分数是否大于fav，否则，提示用户积分不足发帖
      // 用户积分足够
      console.log('obj数据====', obj, obj._id)
      const user = await User.findByID({ _id: obj._id })
      if (user.favs < body.fav) {
        ctx.body = {
          code: 501,
          msg: '积分不足'
        }
        return
      } else {
        await User.updateOne({ _id: obj._id }, { $inc: { favs: -body.fav } })
      }
      const newPost = new Post(body)
      newPost.uid = obj._id
      const result = await newPost.save()
      ctx.body = {
        code: 200,
        msg: '成功保存文章',
        data: result
      }
    } else {
      // 图片验证码失败
      ctx.body = {
        code: 500,
        msg: '图片验证码验证失败'
      }
    }
  }

  // 更新帖子
  async updatePost(ctx) {
    const { body } = ctx.request
    const sid = body.sid
    const code = body.code
    // 验证图片验证码的时效性、正确性
    const result = await checkCode(sid, code)
    if (result) {
      const obj = await getJWTPayload(ctx.header.authorization)
      // 判断帖子作者是否为本人
      const post = await Post.findOne({ _id: body.tid })
      // 判断帖子是否结贴
      if (post.uid === obj._id && post.isEnd === '0') {
        const result = await Post.updateOne({ _id: body.tid }, body)
        if (result.ok === 1) {
          ctx.body = {
            code: 200,
            data: result,
            msg: '更新帖子成功'
          }
        } else {
          ctx.body = {
            code: 500,
            data: result,
            msg: '编辑帖子，更新失败'
          }
        }
      } else {
        ctx.body = {
          code: 401,
          msg: '没有操作的权限'
        }
      }
    } else {
      // 图片验证码验证失败
      ctx.body = {
        code: 500,
        msg: '图片验证码验证失败'
      }
    }
  }

  // 获取文章详情
  async getPostDetail(ctx) {
    const params = ctx.query
    if (!params.tid) {
      ctx.body = {
        code: 500,
        msg: '文章标题为空'
      }
      return
    }
    const post = await Post.findByTid(params.tid)
    let isFav = 0
    if (
      typeof ctx.header.authorization !== 'undefined' &&
      ctx.header.authorization !== ''
    ) {
      const obj = await getJWTPayload(ctx.header.authorization)
      const userCollect = await userCollect.findOne({
        uid: obj._id,
        tid: params.tid
      })
      if (userCollect && userCollect.tid) {
        isFav = 1
      }
    }
    const newPost = post.toJSON()
    newPost.isFav = isFav
    const result = await Post.updateOne(
      { _id: params.tid },
      { $inc: { reads: 1 } }
    )
    if (post._id && result.ok === 1) {
      ctx.body = {
        code: 200,
        data: newPost,
        msg: '查询文章详情成功'
      }
    } else {
      ctx.body = {
        code: 500,
        data: post,
        msg: '获取文章详情失败'
      }
    }
  }

  async getPostByUid(ctx) {
    const params = ctx.query
    const obj = await getJWTPayload(ctx.header.authorization)
    const result = await Post.getListByUid(
      obj._id,
      params.page,
      params.limit ? parseInt(params.limit) : 10
    )
    const total = await Post.countByUid(obj._id)
    if (result.length > 0) {
      ctx.body = {
        code: 200,
        data: result,
        total,
        msg: '查询列表成功'
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '查询列表失败'
      }
    }
  }

  async getPostPublic(ctx) {
    const params = ctx.query
    const result = await Post.getListByUid(
      params.uid,
      params.page,
      params.limit ? parseInt(params.limit) : 10
    )
    const total = await Post.countByUid(params.uid)
    if (result.length > 0) {
      ctx.body = {
        code: 200,
        data: result,
        total,
        msg: '查询列表成功'
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '查询列表失败'
      }
    }
  }

  async deletePostByUid(ctx) {
    const params = ctx.query
    const obj = await getJWTPayload(ctx.header.authorization)
    const post = await Post.findOne({ uid: obj._id, _id: params.tid })
    if (post.id === params.tid && post.isEnd == '0') {
      const result = await Post.deleteOne({ _id: params.tid })
      if (result.ok === 1) {
        ctx.body = {
          code: 200,
          msg: '删除成功'
        }
      } else {
        ctx.body = {
          code: 500,
          msg: '执行删除失败'
        }
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '删除失败，无权限'
      }
    }
  }
}

export default new ContentController()
