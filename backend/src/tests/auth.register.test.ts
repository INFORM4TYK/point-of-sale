import request from "supertest";
import app from "../index";

describe("Auth REGISTER API", () => {
  it("should register a new user", async () => {
    const email = `test${Date.now()}@example.com`;
    const res = await request(app).post("/api/auth/register").send({
      email,
      password: "123456",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("status", 201);
    expect(res.body).toHaveProperty("message", "User created successfuly");
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data).toHaveProperty("email", email);
    expect(res.body.data).not.toHaveProperty("password", "123456");
  });
});
