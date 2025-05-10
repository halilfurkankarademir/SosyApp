/**
 *  Kaydedilen Gönderiler Model tanımı
 */
import { DataTypes } from "@sequelize/core";
import sequelize from "../config/sequelize.js";

// Saved Model tanımı
const Saved = sequelize.define(
    "Saved",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "saved",
        timestamps: true,
    }
);

export default Saved;
