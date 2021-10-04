import knex, { Knex } from 'knex'

export type DatabaseConnectionParams = {
  client: string
  host: string
  port: number
  user: string
  password: string
  database: string
}

let databaseConnection: Knex<any, unknown[]> = null

export function setDatabaseConnection (config: DatabaseConnectionParams) {
  databaseConnection = knex({
    client: 'mysql',
    connection: config
  })
}

export function getDatabaseConnection (): Knex<any, unknown[]> {
  if (!databaseConnection) {
    throw new Error('Database connection has not been set')
  }

  return databaseConnection
}
