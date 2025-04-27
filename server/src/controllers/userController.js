import userDTO from "../dtos/userDTO.js";
import UserService from "../services/userService.js";

//Controllerlar ile backende gelen http isteklerini işleme alıyoruz
//Ornegin parametre olarak gelen body'deki bilgiler
//Sonra ilgili isleme gore service'e yönlendiriliyor

const userController = {
    // Tüm kullanıcıları getirme
    getAllUsers: async (req, res) => {
        try {
            const ip = req.ip;
            const users = await UserService.getAllUsers(ip);
            const usersDTOInstance = users.map((user) => new userDTO(user));
            res.status(200).json(usersDTOInstance);
        } catch (error) {
            console.error("Error getting users:", error);
            res.status(500).json({ error: error.message });
        }
    },

    // ID'ye göre kullanıcı getirme
    getUserById: async (req, res) => {
        try {
            const user = await UserService.getUserById(req.params.userId);
            const userDTOInstance = new userDTO(user);
            if (!user) {
                return res.status(404).json({ error: "Kullanıcı bulunamadı" });
            }
            res.status(200).json(userDTOInstance);
        } catch (error) {
            console.error("Error getting user:", error);
            res.status(500).json({ error: error.message });
        }
    },

    getCurrent: async (req, res) => {
        try {
            const ip = req.ip;
            const user = await UserService.getUserById(req.user.uid, ip);
            const userDTOInstance = new userDTO(user);
            if (!user) {
                return res.status(404).json({ error: "Kullanıcı bulunamadı" });
            }
            res.status(200).json(userDTOInstance);
        } catch (error) {
            console.error("Error getting user:", error);
            res.status(500).json({ error: error.message });
        }
    },

    getUserByEmail: async (req, res) => {
        try {
            const ip = req.ip;
            const user = await UserService.getUserByEmail(req.params.email, ip);
            const userDTOInstance = new userDTO(user);
            if (!user) {
                return res.status(404).json({ error: "Kullanıcı bulunamadı" });
            }
            res.status(200).json(userDTOInstance);
        } catch (error) {
            console.error("Error getting user:", error);
            res.status(500).json({ error: error.message });
        }
    },

    getUserByUsername: async (req, res) => {
        try {
            const username = req.params.username;
            const requestedUserId = req.user.uid;
            const user = await UserService.getUserByUsername(
                username,
                requestedUserId
            );
            if (!user) {
                return res.status(404).json({ error: "Kullanıcı bulunamadı" });
            }

            const userDTOInstance = new userDTO(user);

            res.status(200).json(userDTOInstance);
        } catch (error) {
            console.error("Error getting user:", error);
            res.status(500).json({ error: error.message });
        }
    },

    // Kullanıcı oluşturma
    createUser: async (req, res) => {
        try {
            const ip = req.ip;
            const newUser = await UserService.createUser(req.body, ip);
            const userDTOInstance = new userDTO(newUser);
            if (!newUser) {
                return res
                    .status(400)
                    .json({ error: "User cannot be created" });
            }
            res.status(201).json(userDTOInstance);
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ error: error.message });
        }
    },

    updateUser: async (req, res) => {
        try {
            const ip = req.ip;
            const updatedUser = await UserService.updateUser(
                req.user.uid,
                req.body,
                ip
            );
            res.status(200).json(updatedUser);
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({ error: error.message });
        }
    },

    // Kullanıcı silme
    deleteUser: async (req, res) => {
        try {
            console.log("User deleting" + req.user.uid);
            const ip = req.ip;
            const userId = req.user.uid;
            await UserService.deleteUser(userId, ip);
            // Cookileri temizleme
            res.clearCookie("access_token");
            res.clearCookie("refresh_token");
            res.status(200).json({ message: "Kullanıcı başarıyla silindi" });
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ error: error.message });
        }
    },
};

export { userController };
