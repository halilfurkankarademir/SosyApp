import Post from "./postModel.js";
import User from "./userModel.js";

export default function setupAssociations() {
    // Kullanici birden fazla gonderiye sahip olabilir
    User.hasMany(Post, {
        // Posttaki eslestirilecek anahtar
        foreignKey: "userId",
        // User modeldeki hedef anahtar
        sourceKey: "id",
    });

    Post.belongsTo(User, { foreignKey: "userId", targetKey: "id" });
}
