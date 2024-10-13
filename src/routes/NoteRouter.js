import express from "express";
import NoteController from "../Controller/NoteController";
let router = express.Router();

router.post("/create-note", NoteController.createNote);
router.get("/get-all-note", NoteController.getAllNote);

module.exports = router;
