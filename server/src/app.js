const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const userRoutes = require("./routes/userRoutes");
//env degiskenleri icin dotenv cfg
require("dotenv").config();

// JSON verilerini işlemek için
app.use(express.json());

// Rota tanimlamalari
// Kullanıcı route'larını /api altında bağla
app.use("/api", userRoutes);

// Sunucuyu baslat ve port numarasını yaz
app.listen(port, () => {
    console.log(`Sunucu localhost:${port} portunda baslatildi`);
});
