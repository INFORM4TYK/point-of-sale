import request from "supertest";
import app from "../index";
import pool from "../config/db";
import bcrypt from "bcrypt";

describe("Protected endpoint", () => {
  const testPassword = "123456";
  const testEmail = `protected${Date.now()}@example.com`;
  let token: string;

  beforeAll(async () => {
    const hashedPassword = await bcrypt.hash(testPassword, 10);

    await pool.query(
      `INSERT INTO users (email, password) VALUES ($1, $2)`,
      [testEmail, hashedPassword]
    );

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: testEmail, password: testPassword });

    token = res.body.data.token;
  });

  it("should deny access without token", async () => {
    const res = await request(app).get("/api/protected");
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Unauthorized");
  });

  it("should allow access with valid token", async () => {
    const res = await request(app)
      .get("/api/protected")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Protected data accessed");
  });

  afterAll(async () => {
    await pool.query("DELETE FROM users WHERE email = $1", [testEmail]);
  });
});
