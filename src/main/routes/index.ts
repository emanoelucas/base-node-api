import { Express, Request, Response } from 'express'

import userRoutes from '../../app/routers/users'

export const setupRoutes = (app: Express) => {
  app.use('/user', userRoutes)
  app.use('/check', (req: Request, res: Response) => {
    res.status(200).send({message: 'OK'})
  })
}
