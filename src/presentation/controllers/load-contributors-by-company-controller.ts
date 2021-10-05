import { getDatabaseConnection } from '@/infra/repositories'
import { Controller, HttpResponse } from '../contracts'
import { ok, serverError } from '../helpers/http-helper'

export class LoadContributorsByCompanyController implements Controller {
  async handle (request: any): Promise<HttpResponse> {
    try {
      const { companyId } = request.companyId
      const contributors = await getDatabaseConnection()('contributors').where({ company_id: companyId })
      return ok(contributors)
    } catch (error) {
      return serverError(error)
    }
  }
}
