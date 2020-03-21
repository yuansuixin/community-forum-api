import {getValue} from '@/config/RedisConfig'

const checkCode = (key, value) => {
  const redisData = await getValue(key)
  if (redisData != null) {
    if (redisData.toLowerCase() === value.toLowerCase()) {
      return true
    }
  }
  return false
}

export {checkCode}