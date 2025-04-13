import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import dotenv from "dotenv";

dotenv.config({ debug: true });

const sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: "postgres",
    user: "postgres",
    password: process.env.DB_PASSWORD,
    host: "localhost",
    port: 5432,
    ssl: false,
});

export default sequelize;
