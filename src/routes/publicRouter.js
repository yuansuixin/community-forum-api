import Router from 'koa-router'
import publicController from '../api/PublicController'
import contentController from '../api/ContentController'
import userController from '../api/UserController'
import commentsController from '../api/CommentsController'

const router = new Router()

router.prefix('/public')
router.get('/getCaptcha', publicController.getCaptcha)
router.get('/list', contentController.getPostList)
// 温馨提醒
router.get('/tips', contentController.getTips)
// 友情链接
router.get('/links', contentController.getLinks)
// 本周热议
router.get('/topWeek', contentController.getTopWeek)

//确认修改邮件
router.get('/reset-email', userController.updateUsername)

// 文章详情页
router.get('/content/detail', contentController.getPostDetail)

router.get('/comments', commentsController.getComments)
//获取用户的基本信息
router.get('/info', userController.getBasicInfo)
export default router
