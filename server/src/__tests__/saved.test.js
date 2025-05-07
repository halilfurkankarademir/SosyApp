import request from "supertest";
import { initializeServer } from "../app.js";
import testDatas, { deleteSavedForPost } from "./testUtils.js";

let agent;
let app;

const testCookie = testDatas.testCookie;
const adminTestCookie = testDatas.adminTestCookie;

// Sunucuyu baslat ve gonderiye ait tum likelari sil
beforeAll(async () => {
    app = global.__SERVER_APP__;
    await deleteSavedForPost(69);
});

// Aktif kullanıcının kaydettiği gönderileri getirir.
describe("Get /api/saved/me", () => {
    it("should return 200 ok and saveds list...", async () => {
        agent = request.agent(app);
        await agent
            .get("/api/saved/me")
            .set("Cookie", adminTestCookie)
            .expect(200);
    });
});

// Bir gönderiyi kaydeder.
describe("Post /api/saved/:postId", () => {
    it("should return 201 ok and saved details...", async () => {
        agent = request.agent(app);
        await agent.post("/api/saved/69").set("Cookie", testCookie).expect(201);
    });
});

// Bir gonderiyi kayittan kaldirir
describe("Delete /api/saved/:postId", () => {
    it("should return 200 ok...", async () => {
        agent = request.agent(app);
        await agent
            .delete("/api/saved/69")
            .set("Cookie", testCookie)
            .expect(200);
    });
});
