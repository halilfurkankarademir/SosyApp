/**
 *  Takip Model tanımı
 */

import { DataTypes } from "@sequelize/core";
import sequelize from "../config/sequelize.js";
import User from "./userModel.js";

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
            references: {
                model: User,
                key: "uid",
            },
            onDelete: "CASCADE",
        },
        followingId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: "uid",
            },
            onDelete: "CASCADE",
        },
    },
    {
        tableName: "follows",
        timestamps: true,
    }
);

export default Follow;
