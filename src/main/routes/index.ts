import { Express } from 'express'

import userRoutes from './../../app/routes/users'

export const setupRoutes = (app: Express) => {
  app.use('/user', userRoutes)
}
