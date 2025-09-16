import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTableIfNotExists('users', (table) => {
    table.increments('id').primary();
    table.string('email', 100).unique().notNullable();
    table.string('password', 100).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users');
}