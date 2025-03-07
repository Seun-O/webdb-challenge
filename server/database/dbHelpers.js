const knex = require("knex");

const config = {
  client: "sqlite3",
  connection: {
    filename: "./database/dev.sqlite3"
  },
  useNullAsDefault: true
};

const db = knex(config);

/*
    getProject takes optional parameter ID which would return a project based on that ID.
    !ID get project returns all projects in the database
    SQL SELECT * FROM projects || SELECT * FROM projects WHERE projects.id = ID
*/

const getProject = async id => {
  if (id) {
    const projects = await db("projects")
      .first()
      .where({ id });
    const actions = await db("projects as p")
      .join("actions as a", "p.id", "a.project")
      .where({ "a.project": id });

    const project = { ...projects, actions: actions };
    return project;
  }
  return db("projects");
};

/*
    getAction takes optional parameter ID which would return the action related to the ID.
    !ID getAction returns all actions in the database
    SQL SELECT * FROM actions || SELECT * FROM actions WHERE actions.id = ID

*/
const getAction = id => {
  if (id) {
    return db("actions")
      .first()
      .where({ id });
  }
  return db("actions");
};

/*
    addAction inserts a new action into the database.
    required fields: name, description, completed, project
    optional fields: notes
    SQL INSERT INTO actions (name, description, notes, completed, project)
    VALUES ("name", "description", "notes", "true/false", "project id")
*/
const addAction = action => {
  return db("actions").insert(action);
};

const updateAction = (id, change) => {
  return db("actions")
    .where({ id })
    .update(change);
};

const delAction = id => {
  return db("actions")
    .where({ id })
    .del();
};

/*
    addProject inserts a new project into the database.
    required fields: name, description, completed
    SQL INSERT INTO projects (name, description, completed)
    VALUES ("name", "description", "true/false",)
*/
const addProject = project => {
  return db("projects").insert(project);
};

const delProject = id => {
  return db("projects")
    .where({ id })
    .del();
};

const updateProject = (id, change) => {
  return db("projects")
    .where({ id })
    .update(change);
};

// Function to test db helper methods without endpoints
async function execute() {
  try {
    const data = await getProject(2);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

execute();

module.exports = {
  getProject,
  getAction,
  addAction,
  addProject,
  delProject,
  delAction,
  updateProject,
  updateAction
};
