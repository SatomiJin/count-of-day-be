import express from "express";
import UserRouter from "./UserRouter";
import NoteRouter from "./NoteRouter";
import CountRouter from "./CountRouter";
let initWebRoute = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/note", NoteRouter);
  app.use("/api/count", CountRouter);
};

module.exports = initWebRoute;
