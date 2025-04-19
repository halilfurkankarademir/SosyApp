import { DataTypes } from "@sequelize/core";
import sequelize from "../config/sequelize.js";

// User Model tanımı
const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        uid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },
        role: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: "user",
        },
        // Hashlenmis şifre
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                len: [3, 20],
                isAlphanumeric: true,
            },
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        profilePicture: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue:
                "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
        },
        bio: {
            type: DataTypes.STRING(500),
            allowNull: true,
            defaultValue: "",
        },
        location: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: "",
        },
        verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        tableName: "users",
        timestamps: true,
    }
);

export default User;
