import 'dotenv-safe/config'

export const env = {
  port: process.env.PORT || 3000,
  database: {
    client: process.env.DB_CLIENT || 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    migrations_dir: process.env.DB_MIGRATIONS_DIR || 'src/main/config/database/migrations',
    seeds_dir: process.env.DB_SEEDS_DIR || 'src/main/config/database/seeds'
  },
  redis: {
    host: process.env.REDIS_HOST
  }
}
