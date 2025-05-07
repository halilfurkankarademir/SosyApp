import { Op } from "sequelize";
import sequelize from "../config/sequelize.js";
import User from "../models/userModel.js";

// Test kapanmadan once test kullanıcılarını siler
const removeTestUsers = async () => {
    User.destroy({
        where: {
            username: {
                [Op.iLike]: "%test%",
            },
        },
    });
};

export default async () => {
    try {
        console.log("Jest Global Teardown: Sonlandırma baslıyor...");
        await removeTestUsers();
        await sequelize.pool.destroyAllNow();
        console.log("Jest Global Teardown: Sonlandırma başarıyla tamamlandı.");
    } catch (error) {
        console.error("Jest Global Teardown: Sonlandırma başarısız.");
    }
};
