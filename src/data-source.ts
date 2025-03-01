import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import path from "path";
import { Order } from "./entity/order";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: process.env.DB_SYNCHRONIZE === "false",
  logging: process.env.DB_LOGGING === "true",
  ssl: {
    rejectUnauthorized: false, 
  },
  extra: {
    ssl: true,
  },
  entities: [Order],
  migrations: [path.join(__dirname, "migration/**/*.js")],
  subscribers: [path.join(__dirname, "subscriber/**/*.js")],
});
