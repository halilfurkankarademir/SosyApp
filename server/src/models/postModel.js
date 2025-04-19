import { DataTypes } from "@sequelize/core"; // Veya "sequelize" (v6 için)
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
            type: DataTypes.UUID,
            allowNull: false,
            // İlişkiler associations.js'de tanımlanacak, burada referans belirtmiyoruz
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        media: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        timestamps: true,
        tableName: "posts", // Tablo adını açıkça belirt
    }
);

export default Post;
