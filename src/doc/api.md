## 接口设计

#### 一、接口列表

| 接口名         | 请求方式 | 说明         |
| -------------- | -------- | ------------ |
| `/public/list` | get      | 文章列表接口 |


#### 二、接口详细说明


> 1. 文章列表接口
  
**请求URL：**

* `/public/list`

**请求方式：**

* GET

**参数：**

| 参数名  | 必选 | 类型   | 说明                      |
| ------- | ---- | ------ | ------------------------- |
| type    | 是   | string | 0-普通列表 1-置顶列表     |
| page    | 是   | string | 分页，从几页开始          |
| limit   | 否   | string | 每页的数量，默认是10      |
| catalog | 否   | string | 分类的名称， 默认是 index |
| sort    | 否   | string | 文章的排序                |
| status  | 否   | string | 文章的状态                |

**返回示例：**

```json
{
  "code"：200，
  "data":[
  {
  "tid":1,
  "title":"接口设计攻略",
  "catalog":"index",
  "fav":"20",
  "created":"2020-10-01 00:00:00",
  "isEnd":"0",
  "isTop":"0",
  "sort":"0",
  "answer":"0",
  "status":"0",
  "user":{
  "id":"用户id",
  "isVip":"0",
  "name":"用户昵称",
  "pic":"用户头像"
}
}
  ],
"msg":"服务端消息"
}
```

**返回参数说明**

| 参数名 | 类型   | 说明                           |
| ------ | ------ | ------------------------------ |
| code   | int    | 200-成功 500-服务端异常，取msg |
| data   | array  | 文章列表                       |
| msg    | string | 系统的消息数据                 |



data中array数据说明

| 参数名   | 类型   | 说明                                                     |
| -------- | ------ | -------------------------------------------------------- |
| uid      | int    | 这个是默认产生的Objectid，取得时候需要_id                |
| username | string | 用户名，邮箱账号                                         |
| name     | string | 昵称                                                     |
| password | string | 密码                                                     |
| created  | date   | 注册时间                                                 |
| updated  | date   | 更新时间                                                 |
| favs     | number | 用户积分                                                 |
| gender   | string | 用户性别                                                 |
| roles    | string | 角色，user-普通用户 admin-管理员 super-admin超级管理员   |
| pic      | string | 用户头像                                                 |
| mobile   | string | 手机号码                                                 |
| status   | string | 是否被禁用 0-正常 1-禁言 2-账号禁用                      |
| regmark  | string | 个性签名                                                 |
| location | string | 城市                                                     |
| isVip    | string | 是否是vip用户 0-普通用户 1-会员用户 2-7 定义成vip的level |



user对象说明：

| 参数名 | 类型   | 说明                                                     |
| ------ | ------ | -------------------------------------------------------- |
| id     | int    | 用户id                                                   |
| name   | string | 用户昵称                                                 |
| isVip  | string | 是否是vip用户 0-普通用户 1-会员用户 2-7 定义成vip的level |
| pic    | string | 用户头像                                                 |


