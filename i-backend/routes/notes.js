const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { validationResult } = require("express-validator");

// Route:1 to fetch all notes for a user
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route:2 to add a new note (login required)
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a title").isLength({ min: 3 }),
    body("description", "Description must be minimum 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Route:3 to update an existing note
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const { id } = req.params;

    const updatedFields = {};
    if (title) updatedFields.title = title;
    if (description) updatedFields.description = description;
    if (tag) updatedFields.tag = tag;

    let note = await Notes.findById(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized to update this note" });
    }

    note = await Notes.findByIdAndUpdate(id, { $set: updatedFields }, { new: true });

    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ROUTE:4 to delete a note owned by the user
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    const { id } = req.params;

    let note = await Notes.findById(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized to delete this note" });
    }

    await Notes.findByIdAndDelete(id);

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// export the router. 
module.exports = router;








