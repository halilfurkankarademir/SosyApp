/**
 * @fileoverview Yorum Model tanımı
 * @module models/commentModel
 */

import sequelize from "../config/sequelize.js";
import { DataTypes } from "@sequelize/core";

const Comment = sequelize.define(
    "Comment",
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
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: "comments",
        timestamps: true,
    }
);

export default Comment;
