import request from "supertest";
import testDatas from "./testUtils.js";

let agent;
let app;

const testCookie = testDatas.testCookie;
const userIdToFollow = testDatas.followDetails.userId;
const userIdToUnfollow = testDatas.followDetails.userId;
const userIdToRemoveFollower = testDatas.followDetails.followerId;
const filter = "furkan";

beforeAll(async () => {
    app = global.__SERVER_APP__;
});

// Aktif kullanıcının takipçilerini getirme
describe("Get /follows/followers", () => {
    it("should return 200 ok and followers list...", async () => {
        agent = request.agent(app);
        await agent
            .get(`/api/follows/followers?filter=${filter}"`)
            .set("Cookie", testCookie)
            .expect(200);
    });
});

// Aktif kullanicinin takip ettiklerini getirme
describe("Get /follows/following", () => {
    it("should return 200 ok and following list...", async () => {
        agent = request.agent(app);
        await agent
            .get(`/api/follows/following?filter=${filter}`)
            .set("Cookie", testCookie)
            .expect(200);
    });
});

// Kullanici takip etme
describe("Post /follows/:userId", () => {
    it("should return 200 ok if successfully followed...", async () => {
        agent = request.agent(app);
        await agent
            .post(`/api/follows/${userIdToFollow}`)
            .set("Cookie", testCookie)
            .send(testDatas.followDetails)
            .expect(200);
    });
});

// Kullaniciyi takipten cikma
describe("Delete /follows/:userId", () => {
    it("should return 200 ok if successfully unfollowed...", async () => {
        agent = request.agent(app);
        await agent
            .post(`/api/follows/${userIdToUnfollow}`)
            .set("Cookie", testCookie)
            .send(testDatas.followDetails)
            .expect(200);
    });
});

// Takipci cikarma olayi icin tekrar takip edilmesi
describe("Post /follows/:userId", () => {
    it("should return 200 ok if successfully followed...", async () => {
        agent = request.agent(app);
        await agent
            .post(`/api/follows/${userIdToFollow}`)
            .set("Cookie", testCookie)
            .send(testDatas.followDetails)
            .expect(200);
    });
});

// Aktif kullaniciyi takip eden bir kisiyi cikarma
describe("Post /follows/follower/:followerId", () => {
    it("should return 200 ok if successfully unfollowed...", async () => {
        agent = request.agent(app);
        await agent
            .delete(`/api/follows/follower/${userIdToRemoveFollower}`)
            .set("Cookie", testCookie)
            .expect(200);
    });
});
