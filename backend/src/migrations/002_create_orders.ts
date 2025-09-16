import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTableIfNotExists('orders', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('id').inTable('users');
    table.decimal('total', 10, 2).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('orders');
}