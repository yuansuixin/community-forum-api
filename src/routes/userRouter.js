import Router from 'koa-router'
import UserController from '../api/UserController'
import ContentController from '@/api/ContentController'

const router = new Router()

router.prefix('/user')

router.get('/fav', UserController.userSign)

//更新用户的基本信息
router.get('/basic', UserController.updateUserInfo)

//修改密码
router.post('/change-password', UserController.changePasswd)

router.get('/set-collect', UserController.setCollect)

//获取用户发帖记录
router.get('/post', ContentController.getPostByUid)

router.get('/delete-post', ContentController.deletePostByUid)

export default router
