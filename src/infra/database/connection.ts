import { Sequelize, Options, Dialect } from 'sequelize'
import { environment } from './environment'

const options: Options = {
  host: environment.HOSTNAME,
  dialect: environment.DIALECT as Dialect,
  port: environment.PORT as number,
  timezone: environment.TZ
}

const sslConfig = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}

if (process.env.SERVER_HOST === 'heroku')
  Object.assign(options, sslConfig)

export const connection = new Sequelize(
  environment.DATABASE,
  environment.USERNAME,
  environment.PASSWORD,
  options
)
