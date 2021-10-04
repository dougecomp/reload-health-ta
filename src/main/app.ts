import { createServer } from 'restify'
import { makeRoutes } from './config/routes'

export function makeApp () {
  const app = createServer()

  makeRoutes(app)

  return app
}
