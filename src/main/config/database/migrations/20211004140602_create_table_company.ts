import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('company', table => {
    table.increments('id').primary()
    table.string('business_name').notNullable()
    table.string('suffix').notNullable()
    table.string('industry').notNullable()
    table.string('catch_phrase').notNullable()
    table.string('bs_company_statement').notNullable()
    table.string('logo').notNullable()
    table.string('type').notNullable()
    table.string('phone_number').notNullable()
    table.string('latitude').notNullable()
    table.string('longitude').notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTable('company')
}
