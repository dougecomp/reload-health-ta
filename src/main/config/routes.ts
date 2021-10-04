import { Next, Request, Response, Server } from 'restify'

import { adaptRestifyRoute } from '@/main/adapters/restify-route-adapter'
import { LoadCompaniesController } from '@/presentation/controllers/load-companies-controller'

function dummyResponse (req: Request, res: Response, next: Next) {
  res.send('hello')
  next()
}

export function makeRoutes (server: Server) {
  server.get('/companies', adaptRestifyRoute(new LoadCompaniesController()))
  server.post('/companies/search', dummyResponse)
  server.get('/companies/desktops', dummyResponse)
  server.get('/companies/:id/desktops', dummyResponse)
  server.get('/companies/:id/contributors', dummyResponse)
}
