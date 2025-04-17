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
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "likes",
    }
);

export default Like;
