const express = require("express");
const helmet = require("helmet");
const db = require("./database/dbHelpers");
const server = express();

server.use(helmet());
server.use(express.json());

server.get("api/projects", async (req, res) => {
  try {
    const data = await db.getProjects();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

module.exports = server;
