import request from "supertest";
import testDatas from "./testUtils.js";

let agent;
let app;

beforeAll(async () => {
    app = global.__SERVER_APP__;
});

// Basarili ve basarisiz login testleri
describe("Post /api/auth/login", () => {
    it("should return logged in user details and set cookies...", async () => {
        agent = request.agent(app);
        const loginRes = await agent
            .post("/api/auth/login")
            .send(testDatas.loginDetails)
            .expect(200);
        expect(loginRes.headers["set-cookie"]).toBeDefined();
    });

    it("should return invalid credentials if login details are wrong...", async () => {
        agent = request.agent(app);
        await agent
            .post("/api/auth/login")
            .send(testDatas.invalidLoginDetails)
            .expect(401);
    });
});

// Basarili ve basarisiz register testleri
describe("Post /api/auth/register", () => {
    it("should return 201 ok if successfully registered...", async () => {
        agent = request.agent(app);
        const registerRes = await agent
            .post("/api/auth/register")
            .send(testDatas.registerDetails)
            .expect(201);
        expect(registerRes.headers["set-cookie"]).toBeDefined();
    });

    it("should return 500 error if register details are invalid", async () => {
        agent = request.agent(app);
        await agent
            .post("/api/auth/register")
            .send(testDatas.invalidRegisterDetails)
            .expect(500);
    });
});

// Logout testleri
describe("Post /api/auth/logout", () => {
    it("should return 200 ok if successfully logged out", async () => {
        agent = request.agent(app);
        await agent.post("/api/auth/logout").expect(200);
    });
});
