const { verifyToken } = require("../utils/jwtUtils");

module.exports = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ error: "Token required" });
    }
    try {
        req.user = verifyToken(token);
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
};
