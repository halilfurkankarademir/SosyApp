import { DataTypes } from "@sequelize/core";
import sequelize from "../config/sequelize.js";

const Post = sequelize.define(
    "Post",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        media: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        likes: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            defaultValue: [],
        },
        comments: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            defaultValue: [],
        },
    },
    {
        timestamps: true,
    }
);

export default Post;
