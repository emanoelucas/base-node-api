import { Express } from 'express'

import userRoutes from './../../app/routes/users'

export const setupRoutes = (app: Express) => {
  
  app.use('/', (req, res, next) => {
      res.send(
        {
          status: 200,
          message: "OK"
        }
      )
    }
  )

  app.use('/user', userRoutes)
}
