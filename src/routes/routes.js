import combineRoutes from 'koa-combine-routers'


//加载目录中的router中间件
const moduleFiles = require.context('./modules',true,/\.js$/)

// reduce方法拼接koa-combine-router所需要的的数据结构
const modules = moduleFiles.keys().reduce((items, path) => {
  const value = moduleFiles(path)
  items.push(value.default)
  return items
},[])

export default combineRoutes(modules)
