import Post from '../model/Post'
import Links from '@/model/Links'
import fs, { read } from 'fs'
import uuid from 'uuid/v4'
import moment from 'dayjs'
import config from '@/config'

//方法一
// import {dirExists} from '@/common/Utils'
import mkdir from 'make-dir'

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

//上传图片接口
  async uploadImg(ctx) {
    const file = ctx.request.files.file
    // 图片名称、图片格式、存储的位置，返回前台一个可以读取的路径
    const ext = file.name.split('.').pop()
    const dir = `${config.uploadPath}/${moment().format('YYYYMMDD')}`


    //判断路径是否存在，不存在则创建
    await mkdir(dir)
    //存储文件到指定的路径，给文件一个唯一的名称
    const picname = uuid()
    const destPath = `${dir}/${picname}.${ext}`
    const reader = fs.createReadStream(file.path)
    const upStream = fs.createWriteStream(destPath)
    const filePath = `/${moment().format('YYYYMMDD')}/${picname}.${ext}`

    //方法一
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
      data:filePath
    }
  }

}

export default new ContentController()
