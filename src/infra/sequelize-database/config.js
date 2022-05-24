module.exports = {
  host: process.env.DB_HOSTNAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};