export class BaseError extends Error {
  type: string = ''
  title: string = ''

  constructor (message: string) {
    super(message)
  }
}
