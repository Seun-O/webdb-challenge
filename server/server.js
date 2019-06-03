const express = require("express");
const helmet = require("helmet");
const db = require("./database/dbHelpers");
const server = express();

server.use(helmet());
server.use(express.json());

/*
    Route: /api/projects
    Method: Get
    Returns: all projects in the database
*/

server.get("/api/projects", async (req, res) => {
  try {
    const data = await db.getProject();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

/*
    Route: /api/projects/id
    Method: GET
    Returns: project based on ID
*/
server.get("/api/projects/:id", async (req, res) => {
  try {
    const data = await db.getProject(req.params.id);
    if (data.length === 0) {
      res.status(404).json({ message: "ID not found!" });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

/*
    Route: /api/actions
    Method: Get
    Returns: all actions in the database
*/

server.get("/api/actions", async (req, res) => {
  try {
    const data = await db.getAction();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

/*
    Route: /api/actions/id
    Method: GET
    Returns: project based on ID
*/
server.get("/api/actions/:id", async (req, res) => {
  try {
    const data = await db.getAction(req.params.id);
    if (data.length === 0) {
      res.status(404).json({ message: "ID not found!" });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

/*
    Route: /api/projects
    Method: Post
    Returns: Number of records inserted. Inserts a project into the database
    Parameters:  *name: string, *description: string, *completed: boolean
    * required field
*/

server.post("/api/projects", async (req, res) => {
  try {
    const data = await db.addProject(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

/*
    Route: /api/actions
    Method: Post
    Returns: Number of records inserted. Inserts an action into the database
    Parameters:  *name: string, *description: string, *completed: boolean, *project: int, notes: string
    * required field
*/

server.post("/api/actions", async (req, res) => {
  try {
    const data = await db.addAction(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

module.exports = server;
