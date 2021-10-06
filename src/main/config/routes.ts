import { Server } from 'restify'

import { adaptRestifyRoute } from '@/main/adapters'
import { LoadCompaniesController, LoadContributorsByCompanyController, LoadDesktopsByCompanyController, LoadDesktopsController, SearchCompaniesController } from '@/presentation/controllers'

export function makeRoutes (server: Server) {
  server.get('/companies', adaptRestifyRoute(new LoadCompaniesController()))
  server.post('/companies/search', adaptRestifyRoute(new SearchCompaniesController()))
  server.get('/companies/desktops', adaptRestifyRoute(new LoadDesktopsController()))
  server.get('/companies/:companyId/desktops', adaptRestifyRoute(new LoadDesktopsByCompanyController()))
  server.get('/companies/:companyId/contributors', adaptRestifyRoute(new LoadContributorsByCompanyController()))
}
