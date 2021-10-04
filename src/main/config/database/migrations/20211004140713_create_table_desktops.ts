import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('desktops', table => {
    table.increments('id').primary()
    table.string('platform').notNullable()
    table.string('type').notNullable()
    table.string('os').notNullable()
    table.string('ip').notNullable()
    table.integer('id_company', 10).notNullable().unsigned()
    table.foreign('id_company').references('id').inTable('companies').onDelete('CASCADE').onUpdate('CASCADE')
  })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTable('desktops')
}
