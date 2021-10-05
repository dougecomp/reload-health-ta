import { getDatabaseConnection } from '@/infra/repositories'
import { Controller, HttpResponse } from '../contracts'
import { ok, serverError } from '../helpers/http-helper'

export class LoadDesktopsController implements Controller {
  async handle (): Promise<HttpResponse> {
    try {
      const desktops = await getDatabaseConnection()('desktops').select('*')
      ok(desktops)
    } catch (error) {
      return serverError(error)
    }
  }
}
