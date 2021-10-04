import { BaseError } from './base-error'

export class ServerError extends BaseError {
  constructor (stack?: string) {
    super('A server error ocurred while processing the request. Try again later. If error persist, contact the site administrator.')
    this.name = 'ServerError'
    this.stack = stack
    this.type = '/errors/internal-server-error'
    this.title = 'Internal server error'
  }
}
