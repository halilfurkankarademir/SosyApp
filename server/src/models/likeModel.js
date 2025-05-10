/**
 * Begeni Model tanımı
 */
import { DataTypes } from "@sequelize/core";
import sequelize from "../config/sequelize.js";

const Like = sequelize.define(
    "Like",
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
        tableName: "likes",
        timestamps: true,
    }
);

export default Like;
