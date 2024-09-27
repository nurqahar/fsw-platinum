import db from "../database/knex.mjs";

export default class UserProfile {
  //new user profile
  static async create(data) {
    const [{ id }] = await db("user_profiles").insert(data).returning("id");
    return { ...data, id };
  }

  static async update(id, data) {
    await db("user_profiles").where({ user_id: id }).update(data);
    return data;
  }

  static async delete(id) {
    await db("user_profiles").where({ id }).del();
  }

  static getByUserId(userId) {
    return db("user_profiles").where({ user_id: userId }).first();
  }
}
