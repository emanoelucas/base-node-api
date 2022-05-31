import { Sequelize, Options, Dialect } from 'sequelize'
import { environment } from './environment'

const options: Options = {
  host: environment.HOSTNAME,
  dialect: environment.DIALECT as Dialect,
  port: environment.PORT as number,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
 },
}

export const connection = new Sequelize(
  environment.DATABASE,
  environment.USERNAME,
  environment.PASSWORD,
  options
)
