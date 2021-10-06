import { env } from './config/env'
import { makeApp } from './app'
import { setDatabaseConnection } from '@/infra/repositories'
import { getRedisConnection, setRedisConnection } from '@/infra/redis/redis-connection'

(async () => {
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

  await getRedisConnection().connect()

  app.listen(env.port, function () {
    console.log(`Server listening at port ${env.port}`)
  })
})()
