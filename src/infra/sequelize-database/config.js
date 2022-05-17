import { environment } from './environment'

module.exports = {
  host: environment.HOSTNAME,
  username: environment.USERNAME,
  password: environment.PASSWORD,
  database: environment.DATABASE,
  dialect: environment.DIALECT,
  port: environment.PORT,
  operatorsAliases: false,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};