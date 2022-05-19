import express, { Express } from 'express'

import database from './../../infra/sequelize-database'
import { setupMiddlewares } from './../middlewares'
import { setupRoutes } from './../routes'
import generalErrorHandler from './erros/general-error-handler'
import notFoundErrorHandler from './erros/not-found-error-handler'
import defaultLogger from '../../utils/logger/default-logger'

class App {

	private app: Express
	constructor () {
		this.app = express()
	}

	public bootstrap = async () => {
		try {
			
			await this.initDatabase()

			this.initMiddlewares()
			this.logger()
			this.initRoutes()
			this.errorHandler()

			return this.app.listen(process.env.PORT)    

		} catch (error) {
			throw error
		}
	}

	public initMiddlewares = () => {
		setupMiddlewares(this.app)
	}

	public initRoutes = () => {
	  setupRoutes(this.app)
	}

	public errorHandler = () => {
		this.app.use(notFoundErrorHandler)
		this.app.use(generalErrorHandler)
	}

	public logger = () => {
		this.app.use(defaultLogger)
	}

	public initDatabase = async () => {
		return await database.connect()
	}

}

export default new App()
