import { Request, Response } from 'restify'

import { Controller } from '@/presentation/contracts'

export function adaptRestifyRoute (controller: Controller) {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      ...(req.query || {})
    }
    const httpResponse = await controller.handle(request)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode)
      res.json(httpResponse.body)
    } else {
      const data = {
        type: httpResponse.body.type || '',
        title: httpResponse.body.title || '',
        status: httpResponse.statusCode,
        detail: httpResponse.body.message || '',
        stack: httpResponse.body.stack || ''
      }
      res.status(httpResponse.statusCode)
      res.json(data)
    }
  }
}
