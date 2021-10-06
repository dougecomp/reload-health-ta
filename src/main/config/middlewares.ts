import { Server, plugins } from 'restify'
import corsMiddlware from 'restify-cors-middleware'

export function makeMiddlewares (app: Server) {
  const cors = corsMiddlware({
    origins: ['*'],
    allowHeaders: ['*'],
    exposeHeaders: ['*']
  })
  app.pre(cors.preflight)
  app.use(plugins.bodyParser())
  app.use(cors.actual)
}
