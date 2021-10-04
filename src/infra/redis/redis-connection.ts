import { createClient } from 'redis'
import { RedisClientType } from 'redis/dist/lib/client'

export type RedisConfig = {
  url: string
}

let redisClient: RedisClientType

export function setRedisConnection (config: RedisConfig) {
  redisClient = createClient({
    url: config.url
  })
}

export function getRedisConnection () {
  if (!redisClient) {
    throw new Error('Redis client is not set')
  }

  return redisClient
}
