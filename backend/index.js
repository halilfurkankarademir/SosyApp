const express = require("express");
const app = express();
const port = 3000;

// Trust the first proxy (e.g., if you're behind Nginx, Apache, etc.)
app.set("trust proxy", true);

app.get("/", (req, res) => {
    // req.ip will now return the client's IP address, even if behind a proxy
    const clientIp = req.ip;
    console.log(`Client IP: ${clientIp}`);
    res.send(clientIp);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
