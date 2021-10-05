import { getRedisConnection } from '@/infra/redis/redis-connection'
import { getDatabaseConnection } from '@/infra/repositories'
import { Controller, HttpResponse } from '../contracts'
import { ok, serverError } from '../helpers/http-helper'

export class LoadDesktopsController implements Controller {
  async handle (): Promise<HttpResponse> {
    try {
      const cachedDesktops = await getRedisConnection().get('all-desktops')
      if (cachedDesktops) return ok(JSON.parse(cachedDesktops))

      const desktops = await getDatabaseConnection()('desktops').select('*')
      getRedisConnection().set('all-desktops', JSON.stringify(desktops))
      return ok(desktops)
    } catch (error) {
      return serverError(error)
    }
  }
}
