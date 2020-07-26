import Router from 'koa-router'
import UserController from '@/api/UserController'

const router = new Router()

router.prefix('/user')

router.get('/fav', UserController.userSign)

//更新用户的基本信息
router.get('/basic', UserController.updateUserInfo)

//修改密码
router.post('/change-password',UserController.changePasswd)

export default router
