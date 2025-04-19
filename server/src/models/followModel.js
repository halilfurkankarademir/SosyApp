import { DataTypes } from "@sequelize/core";
import sequelize from "../config/sequelize.js";

const Follow = sequelize.define(
    "Follow",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        followerId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        followingId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        tableName: "follows",
        timestamps: true,
    }
);

export default Follow;
