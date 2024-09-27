import db from "../database/knex.mjs";

export default class Class {
  static async create(data) {
    const [{ id }] = await db("classes")
      .insert({ ...data })
      .returning("id");
    return { id, ...data };
  }

  static getAll() {
    return db("classes").select("*");
  }

  static getById(id) {
    return db("classes").where({ id }).first();
  }

  static async update(id, data) {
    return db("classes").where({ id }).update(data);
  }

  static async delete(id) {
    await db("classes").where({ id }).del();
  }
}
