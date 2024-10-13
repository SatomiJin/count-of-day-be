import express from "express";
import CountController from "../Controller/CountController";
let router = express.Router();

router.post("/create-count", CountController.createCount);
router.post("/plus-count", CountController.plusCount);
router.post("/get-day", CountController.getDay);
module.exports = router;
