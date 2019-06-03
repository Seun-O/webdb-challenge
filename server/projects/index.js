const express = require("express");
const db = require("../database/dbHelpers");
const router = express.Router();

/*
    Route: /api/projects
    Method: Get
    Returns: all projects in the database
*/

router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
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
      Route: /api/projects
      Method: Post
      Returns: Number of records inserted. Inserts a project into the database
      Parameters:  *name: string, *description: string, *completed: boolean
      * required field
  */

router.post("/", async (req, res) => {
  try {
    const data = await db.addProject(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await db.delProject(req.params.id);
    if (!data) {
      res.status(404).json({ message: "ID not found!" });
    }
    res.status(204).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = await db.updateProject(req.params.id, req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

module.exports = router;
