import express from "express";
import bodyParser from "body-parser";
import * as connectDB from "./config/connectDB";
import Cors from "cors";
import initWebRoute from "./routes/index";
require("dotenv").config();

let app = express();

app.use(Cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

initWebRoute(app);
connectDB.connectDB();

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Backend NodeJS is running on the port: ${port}`);
});
