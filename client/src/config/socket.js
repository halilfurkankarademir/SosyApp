// Socket IO baglantisi olustur
import { io } from "socket.io-client";

const URL = "https://api.auroratones.online";

const socket = io(URL, {
    withCredentials: true,
});

// Bağlantı hatalarını yakalamak için global bir dinleyici
socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err.message, err.data);
});

export default socket;
