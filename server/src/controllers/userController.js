import userDTO from "../dtos/userDTO.js";
import userService from "../services/userService.js";

//Controllerlar ile backende gelen http isteklerini işleme alıyoruz
//Ornegin parametre olarak gelen body'deki bilgiler
//Sonra ilgili isleme gore service'e yönlendiriliyor

const userController = {
    // Tüm kullanıcıları getirme
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.getAllUsers();
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
            const userId = req.params.userId;
            const user = await userService.getUserById(userId);
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

    getCurrentUser: async (req, res) => {
        try {
            const userId = req.user.uid;
            const user = await userService.getUserById(userId);
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
            const email = req.params.email;
            const user = await userService.getUserByEmail(email);
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

    getUserProfileDetails: async (req, res) => {
        try {
            const username = req.params.username;
            const requestedUserId = req.user.uid;
            const user = await userService.getUserProfileDetails(
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
            const userData = req.body;
            const newUser = await userService.createUser(userData);
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

    updateUserById: async (req, res) => {
        try {
            const userId = req.user.uid;
            const updates = req.body;
            const updatedUser = await userService.updateUserById(
                userId,
                updates
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
            const userId = req.user.uid;
            await userService.deleteUser(userId);
            // Cookileri temizleme
            res.clearCookie("access_token");
            res.clearCookie("refresh_token");
            res.status(200).json({ message: "Kullanıcı başarıyla silindi" });
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ error: error.message });
        }
    },

    getRandomUsers: async (req, res) => {
        try {
            const requestedUserId = req.user.uid;
            const users = await userService.getRandomUsers(requestedUserId);
            const usersDTOInstance = users.map((user) => new userDTO(user));
            res.status(200).json(usersDTOInstance);
        } catch (error) {
            console.error("Error getting users:", error);
            res.status(500).json({ error: error.message });
        }
    },
};

export { userController };
