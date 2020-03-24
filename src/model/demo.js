import User from './test'

const user = {
  name: 'brian',
  age: 30,
  email: 'briam@imooc.com'
}

// 增
const addMethods = async () => {
  const data = new User(user)
  const result = await data.save()
  console.log(result)
}
addMethods()

// 执行命令  npx babel-node src/model/demo.js

// 查
const findMethods = async () => {
  const result = await User.find()
  console.log(result)
}
findMethods()

// 改
const updateMethods = async () => {
  const result = await User.updateOne({ name: 'brian' }, { age: 23 })
  console.log(result)
}
updateMethods()

// 删
const delMethods = async () => {
  const result = await User.deleteOne({ name: 'brian' })
  console.log(result)
}
delMethods()
