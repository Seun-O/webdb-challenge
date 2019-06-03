const knex = require("knex");

const config = {
  client: "sqlite3",
  connection: {
    filename: "./database/dev.sqlite3"
  },
  useNullAsDefault: true
};

const db = knex(config);

const getProject = id => {
  if (id) {
    return db("projects as p")
      .join("actions as a", "p.id", "a.project")
      .where({ "a.project": id });
  }
  return db("projects");
};

const getAction = id => {
  if (id) {
    return db("actions")
      .first()
      .where({ id });
  }
  return db("actions");
};

const addAction = action => {
  return db("actions").insert(action);
};
const addProject = project => {
  return db("projects").insert(project);
};

async function execute() {
  try {
    // const data = await addAction({
    //   name: "Test action 5",
    //   description: "Test Action",
    //   notes: "Test Notes",
    //   completed: false,
    //   project: 3
    // });
    const data = await getAction();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

execute();

module.exports = db;
