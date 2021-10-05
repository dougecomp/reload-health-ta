import { getRedisConnection } from '@/infra/redis/redis-connection'
import { getDatabaseConnection } from '@/infra/repositories'
import { Controller, HttpResponse } from '../contracts'
import { ok, serverError } from '../helpers/http-helper'

export class LoadContributorsByCompanyController implements Controller {
  async handle (request: any): Promise<HttpResponse> {
    try {
      const { companyId } = request

      const cachedContributorsByCompany = await getRedisConnection().get(`contributors-companyId-${companyId}`)
      if (cachedContributorsByCompany) return ok(JSON.parse(cachedContributorsByCompany))

      const contributors = (await getDatabaseConnection()('contributors').where({ id_company: companyId })).map(contributor => {
        return {
          id: contributor.id,
          firstName: contributor.firstName,
          lastName: contributor.lastName,
          title: contributor.title,
          jobTitle: contributor.jobTitle,
          age: contributor.age
        }
      })
      getRedisConnection().set(`contributors-companyId-${companyId}`, JSON.stringify(contributors))
      return ok(contributors)
    } catch (error) {
      return serverError(error)
    }
  }
}
