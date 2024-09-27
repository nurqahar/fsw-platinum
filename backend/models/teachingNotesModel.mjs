import db from "../database/knex.mjs";

export default class TeachingNotes {
  static async create(data) {
    const [{ id }] = await db("teaching_notes")
      .insert({ ...data })
      .returning("id");
    return { id, ...data };
  }

  static getAll() {
    return db("teaching_notes").select("*");
  }

  static getById(id) {
    return db("teaching_notes").where({ id }).first();
  }

  static getBySearch(date, class_id, subject_id, teacher_id) {
    return db("teaching_notes")
      .where({ date })
      .andWhere({ class_id })
      .andWhere({ subject_id })
      .andWhere({ teacher_id });
  }

  static async update(id, data) {
    return db("teaching_notes").where({ id }).update(data);
  }

  static async delete(id) {
    await db("teaching_notes").where({ id }).del();
  }
}
