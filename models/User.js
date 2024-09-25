const knexConfig = require("../knexfile");
const environment = process.env.NODE_ENV || "development";
const knex = require("knex")(knexConfig[environment]);

class User {
  static async create(data) {
    return knex("users").insert(data).returning("*");
  }

  static async findByEmail(email) {
    return knex("users").where({ email }).first();
  }

  static async findById(id) {
    return knex("users").where({ id }).first();
  }

  static async update(id, data) {
    return knex("users").where({ id }).update(data).returning("*");
  }
}

module.exports = User;
