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

const getProject = id => {
  if (id) {
    return db("projects as p")
      .join("actions as a", "p.id", "a.project")
      .where({ "a.project": id });
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

/*
    addProject inserts a new project into the database.
    required fields: name, description, completed
    SQL INSERT INTO projects (name, description, completed)
    VALUES ("name", "description", "true/false",)
*/
const addProject = project => {
  return db("projects").insert(project);
};

//Function to test db helper methods without endpoints
// async function execute() {
//   try {
//     const data = await getAction();
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// }

// execute();

module.exports = {
  getProject,
  getAction,
  addAction,
  addProject
};
