/**
 * Sequelize ORM yapılandırması ve veritabanı bağlantı nesnesi.
 */

import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import dotenv from "dotenv";

dotenv.config();

/**
 * PostgreSQL veritabanına bağlanmak için yapılandırılmış Sequelize instance'ı.
 */
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
