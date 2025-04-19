import { DataTypes } from "@sequelize/core"; // Veya "sequelize" (v6 için)
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
            // İlişkiler associations.js'de tanımlanacak
        },
        followingId: {
            type: DataTypes.UUID,
            allowNull: false,
            // İlişkiler associations.js'de tanımlanacak
        },
    },
    {
        // ---> İŞTE BURASI ÖNEMLİ <---
        tableName: "follows", // Tablo adı
        timestamps: true, // createdAt ve updatedAt olsun
        indexes: [
            {
                unique: true,
                fields: ["followerId", "followingId"],
            },
        ],
    }
);

export default Follow;
