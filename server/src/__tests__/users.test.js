import request from "supertest";
import testDatas from "./testUtils.js";

let agent;
let app;

const adminTestCookie = testDatas.adminTestCookie;
const userIdToGetDetails = testDatas.userIdToGetDetails;
const username = "dertlibiri";
const email = "dert@gmail.com";
let testUserToken;

// Sunucuyu baslat ve gonderiye ait tum likelari sil
beforeAll(async () => {
    app = global.__SERVER_APP__;
});

// Oturum açmış aktif kullanıcıyı getirir.
describe("Get /api/users/me", () => {
    it("should return 200 ok and user details...", async () => {
        agent = request.agent(app);
        await agent
            .get("/api/users/me")
            .set("Cookie", adminTestCookie)
            .expect(200);
    });
});

// Belirli bir kullanıcıyı ID ile getirir.
describe("Get /api/users/id/:userId", () => {
    it("should return 200 ok and user details...", async () => {
        agent = request.agent(app);
        await agent
            .get(`/api/users/id/${userIdToGetDetails}`)
            .set("Cookie", adminTestCookie)
            .expect(200);
    });
});

// Username ile kullanıcıyı getirir.
describe("Get /api/users/username/:username", () => {
    it("should return 200 ok and user details...", async () => {
        agent = request.agent(app);
        await agent
            .get(`/api/users/username/${username}`)
            .set("Cookie", adminTestCookie)
            .expect(200);
    });
});

// Email ile kullaniciyi getirir.
describe("Get /api/users/email/:email", () => {
    it("should return 200 ok and user details...", async () => {
        agent = request.agent(app);
        await agent
            .get(`/api/users/email/${email}`)
            .set("Cookie", adminTestCookie)
            .expect(200);
    });
});

// Tüm kullanıcıları listeler
describe("Get /api/users", () => {
    it("should return 200 ok and users list...", async () => {
        agent = request.agent(app);
        await agent
            .get("/api/users")
            .set("Cookie", adminTestCookie)
            .expect(200);
    });
});

// Rastgele kullanıcıları getirir (Öneri vb. için).
describe("Get /api/users/random", () => {
    it("should return 200 ok and users list...", async () => {
        agent = request.agent(app);
        await agent
            .get("/api/users/random")
            .set("Cookie", adminTestCookie)
            .expect(200);
    });
});

// Aktif kullanıcının bilgilerini günceller.
describe("Put /api/users/me", () => {
    it("should return 200 ok and updated user details...", async () => {
        agent = request.agent(app);
        await agent
            .put("/api/users/me")
            .send(testDatas.updatedUserDetails)
            .set("Cookie", adminTestCookie)
            .expect(200);
    });
});

// Aktif bir kullanicinin hesabini siler.
describe("Delete /api/users/me", () => {
    // Ilk olarak bir test kullanicisi olusturulur
    it("should return 201 created...", async () => {
        agent = request.agent(app);
        const registerRes = await agent
            .post("/api/auth/register")
            .send(testDatas.registerDetails)
            .expect(201);
        expect(registerRes.headers["set-cookie"]).toBeDefined();
        testUserToken = registerRes.headers["set-cookie"][0];
    });

    // Olusturulan test kullanicisi silinir
    it("should return 200 ok if successfully deleted...", async () => {
        agent = request.agent(app);
        await agent
            .delete("/api/users/me")
            .set("Cookie", testUserToken)
            .expect(200);
    });
});
