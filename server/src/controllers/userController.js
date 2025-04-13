import UserService from "../services/userService.js";

//Controllerlar ile backende gelen http isteklerini işleme alıyoruz
//Ornegin parametre olarak gelen body'deki bilgiler
//Sonra ilgili isleme gore service'e yönlendiriliyor

const userController = {
    // Tüm kullanıcıları getirme
    getAllUsers: async (req, res) => {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error("Error getting users:", error);
            res.status(500).json({ error: error.message });
        }
    },

    // ID'ye göre kullanıcı getirme
    getUserById: async (req, res) => {
        try {
            const user = await UserService.getUserById(req.params.userId);
            if (!user) {
                return res.status(404).json({ error: "Kullanıcı bulunamadı" });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error("Error getting user:", error);
            res.status(500).json({ error: error.message });
        }
    },

    // Kullanıcı oluşturma
    createUser: async (req, res) => {
        try {
            const newUser = await UserService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ error: error.message });
        }
    },

    // Kullanıcı silme
    deleteUser: async (req, res) => {
        try {
            await UserService.deleteUser(req.params.userId);
            res.status(200).json({ message: "Kullanıcı başarıyla silindi" });
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ error: error.message });
        }
    },
};

export { userController };
