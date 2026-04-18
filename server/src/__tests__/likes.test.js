import request from "supertest";
import testDatas, { deleteLikesForPost } from "./testUtils.js";

let agent;
let app;

const testCookie = testDatas.testCookie;
const adminTestCookie = testDatas.adminTestCookie;

// Sunucuyu baslat ve gonderiye ait tum likelari sil
beforeAll(async () => {
    app = global.__SERVER_APP__;
    await deleteLikesForPost(100);
});

// Aktif kullanicinin tum likelarini getirir
describe("Get /api/likes/me", () => {
    it("should return 200 ok and likes list...", async () => {
        agent = request.agent(app);
        await agent
            .get("/api/likes/me")
            .set("Cookie", adminTestCookie)
            .expect(200);
    });
});

// Bir gonderiye like ekleme
describe("Post /api/likes/:postId", () => {
    it("should return 201 ok and like details...", async () => {
        agent = request.agent(app);
        await agent
            .post("/api/likes/100")
            .set("Cookie", testCookie)
            .expect(201);
    });
});

// Bir gonderiden like kaldirma
describe("Delete /api/likes/:postId", () => {
    it("should return 200 ok...", async () => {
        agent = request.agent(app);
        await agent
            .delete("/api/likes/100")
            .set("Cookie", testCookie)
            .expect(200);
    });
});
