const express = require("express");
const db = require("../database/dbHelpers");
const router = express.Router();

/*
    Route: /api/actions
    Method: Get
    Returns: all actions in the database
*/

router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
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
    Route: /api/actions
    Method: Post
    Returns: Number of records inserted. Inserts an action into the database
    Parameters:  *name: string, *description: string, *completed: boolean, *project: int, notes: string
    * required field
*/

router.post("/", async (req, res) => {
  try {
    const data = await db.addAction(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await db.delAction(req.params.id);
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
    const data = await db.updateAction(req.params.id, req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

module.exports = router;
