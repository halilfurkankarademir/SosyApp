import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import dotenv from "dotenv";

dotenv.config({ debug: true });

// Sequelize gibi bir orm kullanıyoruz.
// Bu sayede sql injection gibi saldirilara bir onlem alinmis oluyor.
// Burada bir sequelize nesnesi olusturuyoruz ve postgre databasemise baglanmasi icin ayarliyoruz
const sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    ssl: false,
    define: {
        timestamps: true,
    },
});

export default sequelize;
