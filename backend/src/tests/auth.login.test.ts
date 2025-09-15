import request from "supertest";
import app from "../index";
import pool from "../config/db";
import bcrypt from "bcrypt";
describe("Auth Login API", () => {
  const testPassword = "123456";
  const testEmail = `login${Date.now()}@example.com`;

  beforeAll(async () => {
    const hashedPassword = await bcrypt.hash(testPassword, 10);
    await pool.query(`INSERT INTO users (email, password) VALUES ($1, $2)`, [
      testEmail,
      hashedPassword,
    ]);
  });

  it("should login user by email", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: testEmail, password: testPassword });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status", 200);
    expect(res.body).toHaveProperty("message", "Login successful");
    expect(res.body.data).toHaveProperty("user");
    expect(res.body.data).toHaveProperty("token");
    expect(res.body.data.user).toHaveProperty("email", testEmail);
  });

  afterAll(async () => {
    // Czyścimy testowego użytkownika
    await pool.query("DELETE FROM users WHERE email = $1", [testEmail]);
  });
});
