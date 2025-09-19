import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("order_items", (table) => {
    table.increments("id").primary();
    table
      .integer("order_id")
      .unsigned()
      .references("id")
      .inTable("orders")
      .onDelete("CASCADE");
    table
      .integer("product_id")
      .unsigned()
      .references("id")
      .inTable("products")
      .onDelete("RESTRICT");
    table.integer("amount").notNullable();
    table.decimal("price", 10, 2).notNullable();
    table.string("category").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("order_items");
}
