import { getDatabaseConnection } from '@/infra/repositories'
import { Controller, HttpResponse } from '../contracts'
import { ok, serverError } from '../helpers/http-helper'

export class LoadDesktopsByCompanyController implements Controller {
  async handle (request: any): Promise<HttpResponse> {
    try {
      const { companyId } = request.companyId
      const desktops = await getDatabaseConnection()('desktops').where({ company_id: companyId })
      return ok(desktops)
    } catch (error) {
      return serverError(error)
    }
  }
}
