exports.up = async knex => {
  await knex.schema.createTable("projects", tbl => {
    tbl.increments("id");
    tbl
      .string("name")
      .unique()
      .notNullable();
    tbl.string("description").notNullable();
    tbl.boolean("completed").notNullable();
  });

  await knex.schema.createTable("actions", tbl => {
    tbl.increments("id");
    tbl
      .string("name")
      .unique()
      .notNullable();
    tbl.string("description").notNullable();
    tbl.string("notes");
    tbl.boolean("completed").notNullable();
    tbl
      .integer("project")
      .references("id")
      .inTable("projects");
  });
};

exports.down = async knex => {
  await knex.schema.dropTableIfExists("actions");
  await knex.schema.dropTableIfExists("projects");
};
