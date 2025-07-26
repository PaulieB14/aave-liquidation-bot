import dotenv from "dotenv";
import "reflect-metadata";
import { configuration as config } from "./config";
dotenv.config({ path: ".env" });
const express = require("express");
const app = express();

const start = async () => {
  console.info("[EVENT] - Starting application...");
  await config.load();
  const { AppDataSource } = require("./db/dataSource");

  try {
    await AppDataSource.initialize();
    app.get("/health", (req: any, res: any) => {
      res.status(200).send("Backend is up and running!!");
    });
    const { getAccounts } = require("./controller/accountController");
    app.get("/account", getAccounts);

    await app.listen(3000);
    require("./eventListener/eventListeners");
    console.info("[EVENT] - Event listening started. 🚀");
  } catch (err: any) {
    console.log("failed to start server! An error happened: ", err.message);
    console.error("[EVENT] - Failed Event listening. Exiting... 👋");
    process.exit(1);
  }
};

start();
