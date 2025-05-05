import app, { initializeServer } from "../app.js";
import request from "supertest";
import sequelize from "../config/sequelize.js";

let agent;
let authCookie;

const validUser = {
    email: "dert@gmail.com",
    password: "123456",
};

beforeAll(async () => {
    try {
        // Sunucuyu baslat
        await initializeServer();

        // Bir request agent'i olustur
        agent = request.agent(app);

        // Login istegi at
        const loginRes = await agent
            .post("/api/auth/login")
            .send(validUser)
            .expect(200);

        // Cerezler set ediliyor mu kontrol
        expect(loginRes.headers["set-cookie"]).toBeDefined();

        // Cerezleri degiskene at
        authCookie = loginRes.headers["set-cookie"][0];

        console.log(
            "Test kullanıcısı ile giriş yapıldı ve cookie agent tarafından saklandı."
        );
    } catch (error) {
        console.error("Test kurulum (login) hatası:", error);
        throw error;
    }
}, 30000);

describe("GET /api/users/me", () => {
    it("should return logged in user details when logged in (using agent's cookie)", async () => {
        const res = await agent
            .get("/api/users/me")
            .set("Cookie", authCookie)
            .expect("Content-Type", /json/)
            .expect(200);
        console.log(res);
    });

    it("should return 401 if not logged in (no valid cookie)", async () => {
        await request(app).get("/api/users").expect(401);
    });
});

afterAll(async () => {
    try {
        await sequelize.close();
        console.log("Testler bitti. Sequelize bağlantısı kapatıldı.");
    } catch (error) {
        console.log("Test sonlandırılıyor...");
    }
});
