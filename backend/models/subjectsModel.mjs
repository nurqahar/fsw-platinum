import db from "../database/knex.mjs";

export default class Course {
  static async create(data) {
    const [{ id }] = await db("subjects")
      .insert({ ...data })
      .returning("id");
    return { ...data, id };
  }

  static getAll() {
    return db("subjects").select("*");
  }

  static getById(id) {
    return db("subjects").where({ id }).first();
  }

  static async update(id, data) {
    return db("subjects").where({ id }).update(data);
  }

  static async delete(id) {
    await db("subjects").where({ id }).del();
  }
}
