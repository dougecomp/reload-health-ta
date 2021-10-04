import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('contributors', table => {
    table.increments('id').primary()
    table.string('firstName').notNullable()
    table.string('lastName').notNullable()
    table.string('title').notNullable()
    table.string('jobTitle').notNullable()
    table.integer('age').notNullable()
    table.integer('id_company').notNullable()
    table.foreign('id_company').references('id').inTable('companies').onDelete('CASCADE')
  })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropSchema('contributors')
}
