import { Sequelize, Options, Dialect } from 'sequelize'
import { environment } from './environment'

const options: Options = {
  host: environment.HOSTNAME,
  dialect: environment.DIALECT as Dialect,
  port: environment.PORT as number,
}

export const connection = new Sequelize(
  environment.DATABASE,
  environment.USERNAME,
  environment.PASSWORD,
  options
)
