import sequelize from "../config/sequelize.js";
import { DataTypes } from "@sequelize/core";

const AppSettings = sequelize.define(
    "AppSettings",
    {
        enableEmailVerification: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        allowUserRegistration: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        postApprovalRequired: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        commentApprovalRequired: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isMaintenanceMode: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        newPostNotificationEmail: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        newCommentNotificationEmail: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        newFollowNotificationEmail: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        tableName: "app_settings",
    }
);

export default AppSettings;
