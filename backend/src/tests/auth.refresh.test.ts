import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import { HttpError } from "../utils/httpError";
import { generateTokens, loginUser, refreshAccessToken } from "../services/authService";


const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "test_refresh_secret";

describe("Auth Service - full flow tests", () => {
  const mockUser = { id: 1, email: "test@test.com", password: "hashedpass" };

  describe("Token generation", () => {
    it("should generate unique tokens on consecutive calls", () => {
      const t1 = generateTokens(mockUser);
      const t2 = generateTokens(mockUser);

      expect(t1.accessToken).not.toBe(t2.accessToken);
      expect(t1.refreshToken).not.toBe(t2.refreshToken);
    });

    it("access token should contain only id and email", () => {
      const { accessToken } = generateTokens(mockUser);
      const decoded = jwt.decode(accessToken) as any;

      expect(decoded).toMatchObject({
        id: mockUser.id,
        email: mockUser.email,
      });
      expect(decoded.exp).toBeDefined();
      expect(decoded.iat).toBeDefined();
    });
  });

  describe("Login user", () => {
    it("should fail for empty email or password", async () => {
      await expect(loginUser("", "123")).rejects.toThrow(HttpError);
      await expect(loginUser("test@test.com", "")).rejects.toThrow(HttpError);
    });

    it("should verify password correctly", async () => {
      const hashedPassword = await bcrypt.hash("password123", 10);
      jest.spyOn(require("../models/userModel"), "getUserByEmailService")
        .mockResolvedValue({ ...mockUser, password: hashedPassword });

      const res = await loginUser("test@test.com", "password123");
      expect(res.user.email).toBe(mockUser.email);
      expect(res.accessToken).toBeDefined();
      expect(res.refreshToken).toBeDefined();
    });
  });

  describe("Refresh access token", () => {
    it("should create new access token for valid refresh token", () => {
      const { refreshToken } = generateTokens(mockUser);
      const newAccessToken = refreshAccessToken(refreshToken);

      expect(newAccessToken).toBeDefined();
      const decoded = jwt.decode(newAccessToken) as any;
      expect(decoded.id).toBe(mockUser.id);
    });

    it("should throw error for expired refresh token", () => {
      const expired = jwt.sign({ id: mockUser.id }, JWT_REFRESH_SECRET, { expiresIn: "-1s" });
      expect(() => refreshAccessToken(expired)).toThrow(HttpError);
    });

    it("should throw error for tampered refresh token", () => {
      const { refreshToken } = generateTokens(mockUser);
      const parts = refreshToken.split(".");
      const tampered = [parts[0], Buffer.from(JSON.stringify({ id: 999 })).toString("base64"), parts[2]].join(".");
      expect(() => refreshAccessToken(tampered)).toThrow(HttpError);
    });
  });

 

});