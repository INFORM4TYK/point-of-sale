import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("customers", (table) => {
    table.increments("id").primary();
    table.string("name", 100).notNullable();
    table.string("phone", 20).unique();
    table.string("email", 100).unique();
    table.timestamps(true, true);

    table.index("name", "idx_customers_name");
    table.index("email", "idx_customers_email");
    table.index("phone", "idx_customers_phone");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("customers");
}