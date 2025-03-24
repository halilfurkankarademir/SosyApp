//json web token ureten kutuphanenin ice aktarimi
const jwt = require("jsonwebtoken");
const { TOKEN_EXPIRES } = require("../config/constants");

// secret keye erismek icin yaptigimiz dotenv kurulumu
require("dotenv").config();

//burada ilgili kullanicinin id numarasini alip ona ozel bir token olusturuyoruz
//tokenin gecerlilik suresi 1 saat olacak sekilde ayarlaniyor
//1 saat sonra token kendini yok ediyor
const generateToken = (userId) =>
    jwt.sign({ id: userId }, process.env.JWT_SECRET_25, {
        expiresIn: TOKEN_EXPIRES.ONE_HOUR,
    });

//burada tokeni parametre olarak alarak gecerli mi diye kontrol ediyoruz
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_25);
    } catch (err) {
        return null;
    }
};
//fonksiyonlara erisebilmek icin disa aktarma islemi
module.exports = { generateToken, verifyToken };
