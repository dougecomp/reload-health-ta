import { BaseError } from './base-error'

export class MissingParamError extends BaseError {
  constructor (param: string) {
    super(`Required param ${param} not provided`)
    this.name = 'MissingParamError'
    this.type = '/errors/missing-param'
    this.title = 'Required param not provided'
  }
}
