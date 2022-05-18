import { Express } from "express"
import helmet from 'helmet';
import bodyParser from 'body-parser'

import cors from "./cors"
import jsonParser from "./json-parser"
import customMiddleware from "./custom-middleware";

export const setupMiddlewares = (app: Express) => {
	app.use(cors)
	app.use(jsonParser)
	app.use(helmet())
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(customMiddleware)
}


