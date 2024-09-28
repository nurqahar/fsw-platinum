import dotenv from "dotenv";
import knex from "knex";
import request from "supertest";
import knexfile from "../../knexfile.js";

import app from "../../app.mjs";

dotenv.config();

knexfile.connection.connectionString = process.env.TEST_DATABASE_URL;
const database = knex(knexfile);

describe("users API", () => {
  beforeEach(async () => {
    await database.raw("TRUNCATE TABLE users CASCADE");
  });
  afterEach(() => {
    database.raw("TRUNCATE TABLE users CASCADE");
  });

  describe("POST /users/", () => {
    it("should pass with valid form", async () => {
      const payload = {
        firstName: "adha",
        lastName: "qahar",
        phoneNumber: "0812345678",
        email: "test@mail.com",
        password: "Password1@",
      };
      const { body: data, status } = await request(app)
        .post("/api/users/")
        .send(payload);

      expect(status).toBe(201);
      expect(data).toHaveProperty("id");
    });
  });
});
