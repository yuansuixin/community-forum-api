#### 数据库设计

> mongodb 数据库

- user 用户表 储存用户信息

| 字段     | 类型   | 默认       | 必须 | 说明                                                          |
| -------- | ------ | ---------- | ---- | ------------------------------------------------------------- |
| uid      | int    |            | 否   | 这个是默认产生的 Objectid，取得时候需要\_id                   |
| username | string |            | 否   | 用户名，邮箱账号                                              |
| name     | string |            | 否   | 昵称                                                          |
| password | string |            | 否   | 密码                                                          |
| created  | date   | now()      | 否   | 注册时间                                                      |
| updated  | date   | now()      | 否   | 更新时间                                                      |
| favs     | number | 100        | 否   | 用户积分                                                      |
| gender   | string | 0-男，1-女 | 否   | 用户性别                                                      |
| roles    | Array  | user       | 否   | 角色，user-普通用户 admin-管理员 super-admin 超级管理员       |
| pic      | string |            | 否   | 用户头像                                                      |
| mobile   | string |            | 否   | 手机号码                                                      |
| status   | string | 0          | 否   | 是否被禁用 0-正常 1-禁言 2-账号禁用                           |
| regmark  | string |            | 否   | 个性签名                                                      |
| location | string |            | 否   | 城市                                                          |
| isVip    | string | 0          | 否   | 是否是 vip 用户 0-普通用户 1-会员用户 2-7 定义成 vip 的 level |
| count    | number | 0          | 否   | 签到次数                                                      |

- post 发帖信息纪录

| 字段    | 类型     | 默认  | 说明                                                                       |
| ------- | -------- | ----- | -------------------------------------------------------------------------- |
| tid     | Objectid |       | 这个是默认产生的 Objectid，取得时候需要\_id                                |
| uid     | string   |       | 用户 id                                                                    |
| created | date     | now() | 创建时间                                                                   |
| title   | string   |       | 文章标题                                                                   |
| content | string   |       | 文章内容                                                                   |
| catalog | string   |       | 帖子分类 index-全部 ask-提问 advice-建议 discuss-交流 share-分享 news-动态 |
| fav     | string   |       | 帖子积分                                                                   |
| isEnd   | string   | 0     | 0-未结束 1- 已结束                                                         |
| reads   | string   | 0     | 阅读计数                                                                   |
| answer  | string   | 0     | 回答计数                                                                   |
| status  | string   | 0     | 0-打开回复 1-关闭回复                                                      |
| isTop   | string   | 0     | 0-未置顶 1-已置顶                                                          |
| sort    | string   | 0     | 置顶排序                                                                   |
| tags    | array    |       | 文章的标签 精华 加精 etc                                                   |

- links 友情链接

| 字段    | 类型   | 默认    | 说明                     |
| ------- | ------ | ------- | ------------------------ |
| title   | string |         | 标题                     |
| link    | string |         | 链接                     |
| type    | string |         | links-链接 tips-温馨提醒 |
| created | date   | now（） | 创建时间                 |
| isTop   | string | 0       | 是否置顶                 |
| sort    | string | 0       | 排序编号                 |

- sign_record 签到记录

| 字段    | 类型   | 默认    | 说明     |
| ------- | ------ | ------- | -------- |
| uid     | string |         | 用户 id  |
| created | date   | now（） | 创建时间 |
| fav     | string |         | 积分数量 |

- comments 评论信息表

| 字段    | 类型     | 默认  | 说明               |
| ------- | -------- | ----- | ------------------ |
| cid     | ObjectID |       |                    |
| tid     | string   |       | 文章id             |
| cuid    | string   |       | 评论用户id         |
| content | string   |       | 回复内容           |
| created | date     | now() | 创建时间           |
| hands   | number   | 0     | 点赞数量           |
| status  | number   | 1     | 是或否显示0-否1-是 |
| isRead  | number   | 0     | 是否已读           |
| isBest  | number   | 0     | 是否采纳           |


- comments_hands 点赞记录
 
 | 字段    | 类型     | 默认  | 说明       |
 | ------- | -------- | ----- | ---------- |
 | hid     | ObjectID |       |            |
 | cid     | string   |       | 评论id     |
 | uid     | string   |       | 点赞用户id |
 | created | date     | now() | 创建时间   |


 - user_collect 用户收藏记录
 
 | 字段    | 类型   | 默认  | 说明     |
 | ------- | ------ | ----- | -------- |
 | tid     | string |       | 帖子id   |
 | title   | string |       | 帖子标题 |
 | uid     | string |       | 用户id   |
 | created | date   | now() | 创建时间 |
