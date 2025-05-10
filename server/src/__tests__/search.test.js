import request from "supertest";
import testDatas from "./testUtils.js";

let agent;
let app;

const testCookie = testDatas.testCookie;
const adminTestCookie = testDatas.adminTestCookie;
const userQueryToSearch = "furkan";
const postQueryToSearch = "test";

// Sunucuyu baslat ve gonderiye ait tum likelari sil
beforeAll(async () => {
    app = global.__SERVER_APP__;
});

// Parametre alarak kullanicilari arar
describe("Get /api/search/users", () => {
    it("should return 200 ok and users list...", async () => {
        agent = request.agent(app);
        await agent
            .get(`/api/search/users?query=${userQueryToSearch}`)
            .set("Cookie", adminTestCookie)
            .expect(200);
    });
});

// Parametre alarak gonderiler arar
describe("Get /api/search/posts", () => {
    it("should return 200 ok and posts list...", async () => {
        agent = request.agent(app);
        await agent
            .get(`/api/search/posts?query=${postQueryToSearch}`)
            .set("Cookie", adminTestCookie)
            .expect(200);
    });
});
