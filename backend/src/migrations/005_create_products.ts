import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTableIfNotExists('products', (table) => {
    table.increments('id').primary();
    table.string('title', 255).notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.text('description').nullable();
    table.string('category', 255).nullable();
    table.text('image').nullable();
    table.decimal('rating_rate', 4, 2).nullable();
    table.integer('rating_count').nullable();
    table.integer('stock').defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('products');
}