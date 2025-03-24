// kullanici islemleri icin controllerlar
// ornegin profil duzenle , post kaydet vb
const User = require("../models/userModel");
const { SUCCESS_MESSAGES } = require("../config/constants");

const userController = {
    // User model ile kullanıcı olusturma
    createUser: async (req, res) => {
        try {
            const user = new User(req.body);
            await user.save();
            const message = SUCCESS_MESSAGES.CREATED;
            res.status(201).json(message + " " + user.userId);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    // User model ile tum kullanıcılari getirme
    getAllUsers: async (req, res) => {
        try {
            const users = await User.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = { userController };
