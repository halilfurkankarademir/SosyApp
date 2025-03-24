const express = require("express");
const router = express.Router();
const { userController } = require("../controllers/userController");
const { API_ENDPOINTS } = require("../config/constants");

// rotalar bir rotadaki ilgili islemin hangi fonksiyonu calistiracagini belirtmek icin kullanilir

// Tum kullanıcıları getirme
router.get(API_ENDPOINTS.USERS, userController.getAllUsers);

// Kullanici olusturma
router.post(API_ENDPOINTS.USERS, userController.createUser);

module.exports = router;
