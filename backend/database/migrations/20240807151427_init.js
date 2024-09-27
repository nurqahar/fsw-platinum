/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function up(knex) {
  //   1. mata pelajaran
  await knex.schema.createTable("subjects", (table) => {
    table.increments("id");
    table.string("subject", "328").notNullable();
  });

  //   2. guru
  await knex.schema.createTable("teachers", (table) => {
    table.increments("id");
    table.string("teacher", "255").notNullable();
    table.string("sex", "100").notNullable();
  });

  // 4.  kelas
  await knex.schema.createTable("classes", (table) => {
    table.increments("id");
    table.string("class", "255").notNullable();
  });

  //   4. siswa
  await knex.schema.createTable("students", (table) => {
    table.increments("id");
    table.string("student", "328").notNullable();
    table.string("sex", "100").notNullable();
    table
      .integer("class_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("classes")
      .onDelete("CASCADE");
  });

  //   5. catatan mengajar
  await knex.schema.createTable("teaching_notes", (table) => {
    table.increments("id");
    table.string("presence", "100").notNullable();
    table.string("content", "328").notNullable();
    table.string("notes", "328").nullable();
    table.string("time", "100").notNullable();
    table.string("total_content_time", "100").notNullable();
    table.date("date").notNullable();
    table.string("school_year", "100").notNullable();
    table.string("semester", "100").notNullable();
    table.string("grade", "100").nullable();
    table
      .integer("subject_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("subjects")
      .onDelete("CASCADE");
    table
      .integer("teacher_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("teachers")
      .onDelete("CASCADE");
    table
      .integer("class_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("classes")
      .onDelete("CASCADE");
    table
      .integer("student_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("students")
      .onDelete("CASCADE");
  });

  //   6. user
  await knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("email", "328").notNullable().unique();
    table.string("firstName", "255").notNullable();
    table.string("lastName", "255").notNullable();
    table.string("phoneNumber", "12").notNullable();
    table.string("password").notNullable();
    table.timestamp("createdAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("updateAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });

  await knex.schema.createTable("user_profiles", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("bio", "255").notNullable();
    table.string("image", "255").nullable();
    table.timestamp("createdAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("updateAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable("teaching_notes");
  await knex.schema.dropTable("user_profiles");
  await knex.schema.dropTable("students");
  await knex.schema.dropTable("classes");
  await knex.schema.dropTable("teachers");
  await knex.schema.dropTable("subjects");
  await knex.schema.dropTable("users");
};
