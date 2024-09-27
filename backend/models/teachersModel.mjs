import db from "../database/knex.mjs";

export default class Teacher {
  static async create(data) {
    const [{ id }] = await db("teachers")
      .insert({ ...data })
      .returning("id");
    return { id, ...data };
  }

  static getAll() {
    return db("teachers").select("*");
  }

  static getById(id) {
    return db("teachers").where({ id }).first();
  }

  static async update(id, data) {
    return db("teachers").where({ id }).update(data);
  }

  static async delete(id) {
    await db("teachers").where({ id }).del();
  }
}
