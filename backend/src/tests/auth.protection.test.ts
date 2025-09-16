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

    await pool.query(`INSERT INTO users (email, password) VALUES ($1, $2)`, [
      testEmail,
      hashedPassword,
    ]);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: testEmail, password: testPassword });

    token = res.body.data.accessToken;
  });
  it("should deny access with wrong token", async () => {
    const fakeToken = "123123";
    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${fakeToken}`);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid token");
  });

  it("should deny access without token", async () => {
    const res = await request(app).get("/api/auth/me");
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Unauthorized");
  });

  it("should allow access with valid token", async () => {
    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "User fetched successfully");
  });

  afterAll(async () => {
    await pool.query("DELETE FROM users WHERE email = $1", [testEmail]);
  });
});
