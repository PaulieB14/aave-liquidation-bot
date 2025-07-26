import { DataSource } from "typeorm";
import { Accounts } from "./entity/Accounts";
import { configuration as config } from "../config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.get("dbHost") as string,
  port: config.get("dbPort") as number,
  username: config.get("dbUser") as string,
  password: config.get("dbPassword") as string,
  database: config.get("dbName") as string,
  synchronize: config.get("nodeEnv") === "dev" ? true : false,
  logging: false,
  entities: [Accounts],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
});
