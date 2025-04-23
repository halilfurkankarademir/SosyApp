// Socket IO baglantisi olustur
import { io } from "socket.io-client";

const URL = "http://89.213.56.21:3000";

const socket = io(URL, {
    withCredentials: true,
});

// Bağlantı hatalarını yakalamak için global bir dinleyici
socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err.message, err.data);
});

export default socket;
