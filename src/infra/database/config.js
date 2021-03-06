const config = {
  host: process.env.DB_HOSTNAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
  timezone: process.env.TZ,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
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
  Object.assign(config, sslConfig)

module.exports = config