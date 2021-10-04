import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('contributor', table => {
    table.increments('id').primary()
    table.string('firstName').notNullable()
    table.string('lastName').notNullable()
    table.string('title').notNullable()
    table.string('jobTitle').notNullable()
    table.integer('age').notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropSchema('contributor')
}
