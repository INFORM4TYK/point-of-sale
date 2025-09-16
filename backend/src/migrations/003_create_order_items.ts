import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTableIfNotExists('order_items', (table) => {
    table.increments('id').primary();
    table.integer('order_id').notNullable()
      .references('id').inTable('orders').onDelete('CASCADE');
    table.integer('product_id').notNullable();
    table.integer('quantity').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('order_items');
}