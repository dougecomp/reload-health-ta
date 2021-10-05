import { getRedisConnection } from '@/infra/redis/redis-connection'
import { getDatabaseConnection } from '@/infra/repositories/database-connection'
import { Controller, HttpResponse } from '../contracts'
import { ok, serverError } from '../helpers/http-helper'

export class LoadCompaniesController implements Controller {
  async handle (): Promise<HttpResponse> {
    try {
      const cachedCompanies = await getRedisConnection().get('all-companies')
      if (cachedCompanies) return ok(JSON.parse(cachedCompanies))

      const companies = await getDatabaseConnection()('companies').select('*')
      getRedisConnection().set('all-companies', JSON.stringify(companies))
      return ok(companies)
    } catch (error) {
      return serverError(error)
    }
  }
}
