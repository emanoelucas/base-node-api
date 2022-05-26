import { Express } from 'express'


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
}
