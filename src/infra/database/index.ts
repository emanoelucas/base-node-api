import { Sequelize } from 'sequelize'
import { connection } from './connection'

class Database {
  private database: Sequelize

  constructor () {
    this.database = connection
  }

  async connect () {
    return await this.database.authenticate()
  }

  async disconnect () {
    return await this.database.close()
  }
}

export default new Database()
