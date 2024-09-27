import bcrypt from "bcryptjs";
import db from "../database/knex.mjs";

const saltRounds = 10;
export default class User {
  // make new user
  static async create({ password, ...data }) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const [{ id }] = await db("users")
      .insert({
        password: hashedPassword,
        ...data,
      })
      .returning("id");
    return { ...data, id };
  }

  static getAll() {
    return db("users").select("*");
  }

  static getById(id) {
    return db("users").where({ id }).first();
  }

  static async update(id, data) {
    const { password, ...otherData } = data;
    const updateData = { ...otherData };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      updateData.password = hashedPassword;
    }
    await db("users").where({ id }).update(data);
    return { ...updateData, id };
  }

  static async delete(id) {
    await db("users").where({ id }).del();
  }

  static async getByEmailPassword({ email, password }) {
    const user = await db("users").where({ email }).first();

    if (!user) {
      throw new Error("User email not found");
    }

    if (password) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        throw new Error("Incorrect password");
      }
    }
    return user;
  }
}
