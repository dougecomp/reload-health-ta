import { Next, Request, Response, Server } from 'restify'

function dummyResponse (req: Request, res: Response, next: Next) {
  res.send('hello')
  next()
}

export function makeRoutes (server: Server) {
  server.get('/companies', dummyResponse)
  server.post('/companies/search', dummyResponse)
  server.get('/companies/desktops', dummyResponse)
  server.get('/companies/:id/desktops', dummyResponse)
  server.get('/companies/:id/contributors', dummyResponse)
}
