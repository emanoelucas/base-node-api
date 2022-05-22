import { Express } from "express"
import helmet from 'helmet';
import bodyParser from 'body-parser'

import cors from "./cors-middleware"
import jsonParser from "./json-parser-middleware"
import customMiddlewate from "./custom-middleware"
import startTimeMiddleware from "./start-time-middleware"

export const setupMiddlewares = (app: Express) => {
	app.use(startTimeMiddleware)
	app.use(cors)
	app.use(jsonParser)
	app.use(helmet())
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(customMiddlewate)
}


