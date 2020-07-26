import path from 'path'

const DB_URL = 'mongodb://test:123456@127.0.0.1:27017/testdb'
const REDIS = {
  host: '127.0.0.1',
  port: 6379
  // password: "123456"
}
const JWT_SECRET = 'fdsabgdfsgfsb^887r3dsfnsgkdnjkfhdkjafhdjksanfejghq'
const baseUrl = process.env.NODE_ENV === 'production' ? 'http://www.tomic.com' : 'http://localhost:3000'

const uploadPath = process.env.NODE_ENV === 'production' ? '/app/public'
  : path.join(path.resolve(__dirname),'../../public')
export default { DB_URL, REDIS, JWT_SECRET,baseUrl,uploadPath }
