import { Express } from "express"

import cors from "./cors"
import jsonParser from "./json-parser"
import helmet from "./helmet"
import bodyParser from "./body-parser"

export const setupMiddlewares = (app: Express) => {
	app.use(cors)
	app.use(jsonParser)
	app.use(helmet)
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }))
}


