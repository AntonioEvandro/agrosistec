import express from "express";
import { App } from "./app";
import cors from "cors";
// require("dotenv").config({ path: "./.env" });
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const mongoose = require("mongoose");

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected to Database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
}

connectToDatabase();

const server = express();
server.use(cors());
server.use(express.json());
const PORT = process.env.PORT || 5001;

new App().server.listen(PORT, () => {
  console.log(`Server is running at the URL http://localhost:${PORT}/api-docs`);
});

export { server };


