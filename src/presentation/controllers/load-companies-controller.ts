import { getDatabaseConnection } from '@/infra/repositories/database-connection'
import { Controller, HttpResponse } from '../contracts'
import { ok, serverError } from '../helpers/http-helper'

export class LoadCompaniesController implements Controller {
  async handle (): Promise<HttpResponse> {
    try {
      const connection = getDatabaseConnection()
      const companies = await connection('companies').select('*')
      return ok(companies)
    } catch (error) {
      return serverError(error)
    }
  }
}
