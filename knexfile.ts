import 'dotenv-safe/config'
import { Knex } from 'knex'

module.exports = {

  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || 'cdu'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: process.env.DB_MIGRATIONS_DIR || 'src/main/database/migrations'
  },
  seeds: {
    directory: process.env.DB_SEEDS_DIR || 'src/main/database/seeds'
  }

} as Knex.Config
