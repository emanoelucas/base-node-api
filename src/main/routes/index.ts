import { Router, Express } from 'express'
const routes = Router()

export const setupRoutes = (app: Express) => {
  
  app.use('/api', [
      routes.get('/', (req, res, next) => {
        res.send(
          {
            status: 200,
            message: "OK"
          }
        )
      })
    ]
  )
}
