import { getRedisConnection } from '@/infra/redis/redis-connection'
import { getDatabaseConnection } from '@/infra/repositories'
import { Controller, HttpResponse } from '../contracts'
import { ok, serverError } from '../helpers/http-helper'

export class LoadDesktopsByCompanyController implements Controller {
  async handle (request: any): Promise<HttpResponse> {
    try {
      const { companyId } = request

      const cachedDesktops = await getRedisConnection().get(`desktops-companyId-${companyId}`)
      if (cachedDesktops) return ok(JSON.parse(cachedDesktops))

      const desktops = await getDatabaseConnection()('desktops').where({ id_company: companyId })
      getRedisConnection().set(`desktops-companyId-${companyId}`, JSON.stringify(desktops))
      return ok(desktops)
    } catch (error) {
      return serverError(error)
    }
  }
}
