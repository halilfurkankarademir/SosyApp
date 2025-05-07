import app from "../app.js";
import request from "supertest";

let agent;
let authCookie;

const validUser = {
    email: "dert@gmail.com",
    password: "123456",
};

export const getAuthenticatedAgent = async () => {
    agent = request.agent(app);
    const loginRes = await agent
        .post("/api/auth/login")
        .send(validUser)
        .expect(200);
    console.log(loginRes);
    expect(loginRes.headers["set-cookie"]).toBeDefined();
    authCookie = loginRes.headers["set-cookie"][0];
    console.log(authCookie);
    agent.set("Cookie", authCookie);
    return { agent, authCookie };
};
