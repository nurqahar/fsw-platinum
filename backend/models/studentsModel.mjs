import db from "../database/knex.mjs";

export default class Student {
  static async create(data) {
    const [{ id }] = await db("students")
      .insert({ ...data })
      .returning("id");
    return { id, ...data };
  }

  static getAll() {
    return db("students").select("*");
  }

  static getById(id) {
    return db("students").where({ id }).first();
  }

  static getByClassId(class_id) {
    return db("students").select("*").where({ class_id });
  }

  static async update(id, data) {
    return db("students").where({ id }).update(data);
  }

  static async delete(id) {
    await db("students").where({ id }).del();
  }
}
