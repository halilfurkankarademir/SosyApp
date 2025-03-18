// index.js
const express = require("express");
const app = express();
const port = 3000;

// Middleware: JSON verilerini işlemek için
app.use(express.json());

// Basit bir GET endpoint'i
app.get("/", (req, res) => {
    res.json({ message: "Merhaba, bu bir deneme API'sidir!" });
});

// Kullanıcıları listeleyen GET endpoint'i
app.get("/users", (req, res) => {
    const users = [
        { id: 1, name: "Ahmet" },
        { id: 2, name: "Mehmet" },
        { id: 3, name: "Ayşe" },
    ];
    res.json(users);
});

// Yeni kullanıcı ekleyen POST endpoint'i
app.post("/users", (req, res) => {
    const newUser = req.body;
    newUser.id = Date.now(); // Basit bir ID ataması
    res.status(201).json(newUser);
});

// Sunucuyu başlatma
app.listen(port, () => {
    console.log(`API http://localhost:${port} adresinde çalışıyor...`);
});
