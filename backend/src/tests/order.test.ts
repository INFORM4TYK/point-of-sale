import request from "supertest";
import app from "../index";
import pool from "../config/db";

describe("Order endpoints", () => {
  let orderId: number;
  const testUserId = 2;

  const testOrder = {
    userId: testUserId,
    items: [
      { productId: 1, quantity: 2 },
      { productId: 3, quantity: 1 },
    ],
    total: 59.98,
  };

  it("should create a new order", async () => {
    const res = await request(app).post("/api/orders").send(testOrder);
    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("id");
    orderId = res.body.data.id;
    console.log("Order ID created:", orderId);
  });

  it("should fetch the created order", async () => {
    const res = await request(app).get(`/api/orders/${orderId}`);
    expect(res.status).toBe(200);
    expect(res.body.data.items.length).toBe(testOrder.items.length);
    console.log("Order fetched:", res.body.data);
  });

  it("should fail to create an order with the same ID", async () => {
    const res = await pool
      .query(
        "INSERT INTO orders (id, user_id, total) VALUES ($1, $2, $3) RETURNING *",
        [orderId, testUserId, 59.98]
      )
      .catch((err) => err);

    expect(res).toHaveProperty("code");
    console.log("Expected error:", res.code || res.message);
  });

  afterAll(async () => {
    await pool.query("DELETE FROM order_items WHERE order_id = $1", [orderId]);
    await pool.query("DELETE FROM orders WHERE id = $1", [orderId]);
    pool.end();
  });
});
