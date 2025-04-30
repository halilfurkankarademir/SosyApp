/**
 * @fileoverview Kullanıcı işlemleriyle ilgili HTTP isteklerini yöneten controller.
 * @module controllers/userController
 */

import userDTO from "../dtos/userDTO.js";
import userService from "../services/userService.js";

/**
 * @description Kullanıcı işlemleri için controller fonksiyonlarını içerir.
 * Gelen istekleri alır, ilgili servis fonksiyonunu çağırır ve yanıtı DTO ile formatlayarak döner.
 */
const userController = {
    /**
     * @description Tüm kullanıcıları listeler.
     * @route GET /users/
     */
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.getAllUsers();
            // DTO ile hassas verileri filtrele
            const usersDTOInstance = users.map((user) => new userDTO(user));
            res.status(200).json(usersDTOInstance);
        } catch (error) {
            console.error("Error getting users:", error);
            res.status(500).json({ error: error.message }); // Hata yönetimi middleware'ine devretmek daha iyi olabilir
        }
    },

    /**
     * @description Belirli bir kullanıcıyı ID ile getirir.
     * @route GET /users/id/:userId
     */
    getUserById: async (req, res) => {
        try {
            const userId = req.params.userId;
            const user = await userService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ error: "Kullanıcı bulunamadı" });
            }
            // DTO ile formatla
            const userDTOInstance = new userDTO(user);
            res.status(200).json(userDTOInstance);
        } catch (error) {
            console.error("Error getting user:", error);
            res.status(500).json({ error: error.message });
        }
    },

    /**
     * @description Oturum açmış (mevcut) kullanıcıyı getirir.
     * @route GET /users/me
     */
    getCurrentUser: async (req, res) => {
        try {
            const userId = req.user.uid; // Kimlik doğrulama middleware'inden gelir
            const user = await userService.getUserById(userId);
            if (!user) {
                // Bu durum genellikle token geçerli ama kullanıcı DB'de yoksa olur
                return res.status(404).json({ error: "Kullanıcı bulunamadı" });
            }
            const userDTOInstance = new userDTO(user);
            res.status(200).json(userDTOInstance);
        } catch (error) {
            console.error("Error getting current user:", error); // Hata mesajı düzeltildi
            res.status(500).json({ error: error.message });
        }
    },

    /**
     * @description Belirli bir kullanıcıyı e-posta adresi ile getirir.
     * @route GET /users/email/:email
     */
    getUserByEmail: async (req, res) => {
        try {
            const email = req.params.email;
            const user = await userService.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ error: "Kullanıcı bulunamadı" });
            }
            const userDTOInstance = new userDTO(user);
            res.status(200).json(userDTOInstance);
        } catch (error) {
            console.error("Error getting user by email:", error); // Hata mesajı düzeltildi
            res.status(500).json({ error: error.message });
        }
    },

    /**
     * @description Bir kullanıcının profil detaylarını kullanıcı adına göre getirir.
     * İstek yapan kullanıcının takip durumunu da içerebilir.
     * @route GET /users/username/:username
     */
    getUserProfileDetails: async (req, res) => {
        try {
            const username = req.params.username;
            const requestedUserId = req.user.uid; // İstek yapan kullanıcı
            const userProfile = await userService.getUserProfileDetails(
                username,
                requestedUserId
            );
            if (!userProfile) {
                return res.status(404).json({ error: "Kullanıcı bulunamadı" });
            }
            // Servis zaten DTO benzeri bir yapı döndürebilir veya burada DTO'ya çevrilebilir.
            // userDTO'nun profil detaylarına uygun olup olmadığını kontrol et.
            // Belki farklı bir ProfileDTO gerekebilir.
            const userDTOInstance = new userDTO(userProfile); // userDTO bu yapıya uygun mu?
            res.status(200).json(userDTOInstance);
        } catch (error) {
            console.error("Error getting user profile:", error); // Hata mesajı düzeltildi
            res.status(500).json({ error: error.message });
        }
    },

    /**
     * @description Yeni bir kullanıcı oluşturur (Genellikle register endpoint'i ile ilişkilidir).
     * @route POST /users/ (veya /auth/register)
     */
    createUser: async (req, res) => {
        try {
            const userData = req.body;
            // Not: Bu fonksiyon authController.register içinde çağrılıyor olabilir.
            // Eğer doğrudan /users'a POST yapılıyorsa admin yetkisi kontrolü gerekebilir.
            const newUser = await userService.createUser(userData);
            // `createUser` başarısız olursa hata fırlatmalı, null dönmemeli.
            // if (!newUser) {
            //     return res
            //         .status(400)
            //         .json({ error: "User cannot be created" });
            // }
            const userDTOInstance = new userDTO(newUser);
            res.status(201).json(userDTOInstance);
        } catch (error) {
            console.error("Error creating user:", error);
            // Servisten gelen hataya göre uygun status kod (örn: 409 Conflict) dönülebilir.
            res.status(error.status || 500).json({ error: error.message });
        }
    },

    /**
     * @description Oturum açmış kullanıcının bilgilerini günceller.
     * @route PUT /users/me
     */
    updateUserById: async (req, res) => {
        try {
            const userId = req.user.uid;
            const updates = req.body;
            const updatedUser = await userService.updateUserById(
                userId,
                updates
            );
            // Başarılı güncelleme sonrası güncellenmiş kullanıcıyı DTO ile dön
            const userDTOInstance = new userDTO(updatedUser);
            res.status(200).json(userDTOInstance);
        } catch (error) {
            console.error("Error updating user:", error);
            // Validasyon veya veritabanı hatalarına göre uygun status kod dönülebilir.
            res.status(error.status || 500).json({ error: error.message });
        }
    },

    /**
     * @description Oturum açmış kullanıcının hesabını siler.
     * @route DELETE /users/me
     */
    deleteUser: async (req, res) => {
        try {
            const userId = req.user.uid;
            await userService.deleteUser(userId);
            // Başarılı silme sonrası cookie'leri temizle ve onay mesajı dön
            res.clearCookie("access_token");
            res.clearCookie("refresh_token");
            res.status(200).json({ message: "Kullanıcı başarıyla silindi" }); // 204 No Content de olabilir
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ error: error.message });
        }
    },

    /**
     * @description Rastgele kullanıcıları getirir (Öneri vb. için). Aktif kullanıcı hariç tutulur.
     * @route GET /users/random
     */
    getRandomUsers: async (req, res) => {
        try {
            const requestedUserId = req.user.uid; // Aktif kullanıcıyı hariç tutmak için
            const users = await userService.getRandomUsers(requestedUserId);
            const usersDTOInstance = users.map((user) => new userDTO(user));
            res.status(200).json(usersDTOInstance);
        } catch (error) {
            console.error("Error getting random users:", error); // Hata mesajı düzeltildi
            res.status(500).json({ error: error.message });
        }
    },
};

export default userController;
