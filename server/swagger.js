import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "SosyApp Api",
        description: "Sosyal medya uygulaması dokümantasyonu",
    },
    host: "localhost:3000",
    tags: [
        "Users",
        "Posts",
        "Follows",
        "Likes",
        "Comments",
        "Saved",
        "Notifications",
    ],
};

const swaggerOutputFile = "./swagger-output.json";
const apiEndpointsFiles = ["./src/routes/index.js"];

swaggerAutogen()(swaggerOutputFile, apiEndpointsFiles, doc);
