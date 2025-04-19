import Post from "./postModel.js";
import User from "./userModel.js";
import Like from "./likeModel.js";

export default function setupAssociations() {
    // User - Post ilişkisi (1-N)
    User.hasMany(Post, {
        foreignKey: "userId",
        sourceKey: "uid", // User.uid ile Post.userId eşleşecek
    });

    Post.belongsTo(User, {
        foreignKey: "userId",
        targetKey: "uid",
    });

    // Post - Like ilişkisi (1-N)
    Post.hasMany(Like, {
        foreignKey: "postId",
        sourceKey: "id", // Post.id ile Like.postId eşleşecek
    });

    Like.belongsTo(Post, {
        foreignKey: "postId",
        targetKey: "id",
    });

    // User - Like ilişkisi (1-N)
    User.hasMany(Like, {
        foreignKey: "userId",
        sourceKey: "uid", // User.uid ile Like.userId eşleşecek
    });

    Like.belongsTo(User, {
        foreignKey: "userId",
        targetKey: "uid",
    });
}
