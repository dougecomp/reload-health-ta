import { env } from './config/config'
import { makeApp } from './app'
import { setDatabaseConnection } from '@/infra/repositories'
import { setRedisConnection } from '@/infra/redis/redis-connection'

const app = makeApp()

setDatabaseConnection({
  client: env.database.client,
  host: env.database.host,
  port: env.database.port,
  user: env.database.user,
  password: env.database.password,
  database: env.database.name
})

setRedisConnection({
  url: env.redis.host
})

app.listen(env.port, function () {
  console.log(`Server listening at port ${env.port}`)
})
