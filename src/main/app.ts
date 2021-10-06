import { createServer } from 'restify'
import { makeMiddlewares } from './config/middlewares'
import { makeRoutes } from './config/routes'

export function makeApp () {
  const app = createServer()

  makeRoutes(app)

  makeMiddlewares(app)

  return app
}
