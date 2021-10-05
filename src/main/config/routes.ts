import { Next, Request, Response, Server } from 'restify'

import { adaptRestifyRoute } from '@/main/adapters'
import { LoadCompaniesController, LoadContributorsByCompanyController, LoadDesktopsByCompanyController, LoadDesktopsController } from '@/presentation/controllers'

function dummyResponse (req: Request, res: Response, next: Next) {
  res.send('hello')
  next()
}

export function makeRoutes (server: Server) {
  server.get('/companies', adaptRestifyRoute(new LoadCompaniesController()))
  server.post('/companies/search', dummyResponse)
  server.get('/companies/desktops', adaptRestifyRoute(new LoadDesktopsController()))
  server.get('/companies/:companyId/desktops', adaptRestifyRoute(new LoadDesktopsByCompanyController()))
  server.get('/companies/:companyId/contributors', adaptRestifyRoute(new LoadContributorsByCompanyController()))
}
