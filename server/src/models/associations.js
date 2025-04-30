import Post from "./postModel.js";
import User from "./userModel.js";
import Like from "./likeModel.js";
import Saved from "./savedModel.js";
import Follow from "./followModel.js";
import Comment from "./commentModel.js";

export default function setupAssociations() {
    // User - Post ilişkisi (1-N)
    User.hasMany(Post, {
        foreignKey: "userId",
        sourceKey: "uid",
    });

    Post.belongsTo(User, {
        foreignKey: "userId",
        targetKey: "uid",
    });

    // User - User (Follow) ilişkileri (N-M)
    User.belongsToMany(User, {
        as: "Following",
        through: Follow,
        foreignKey: "followerId",
        otherKey: "followingId",
        sourceKey: "uid",
        targetKey: "uid",
        inverse: {
            as: "Followers",
        },
    });

    User.belongsToMany(User, {
        as: "Followers",
        through: Follow,
        foreignKey: "followingId",
        otherKey: "followerId",
        sourceKey: "uid",
        targetKey: "uid",
        inverse: {
            as: "Following",
        },
    });

    // Follow modelinin User'a bağlantıları
    Follow.belongsTo(User, {
        foreignKey: "followerId",
        targetKey: "uid",
        as: "FollowerUser",
    });
    Follow.belongsTo(User, {
        foreignKey: "followingId",
        targetKey: "uid",
        as: "FollowedUser",
    });

    // User - Like ilişkisi (1-N)
    User.hasMany(Like, {
        foreignKey: "userId",
        sourceKey: "uid",
    });

    Like.belongsTo(User, {
        foreignKey: "userId",
        targetKey: "uid",
    });

    // User - Saved ilişkisi (1-N)
    User.hasMany(Saved, {
        foreignKey: "userId",
        sourceKey: "uid",
    });

    Saved.belongsTo(User, {
        foreignKey: "userId",
        targetKey: "uid",
    });

    // User - Comment ilişkisi (1-N)
    User.hasMany(Comment, {
        foreignKey: "userId",
        sourceKey: "uid",
    });

    Comment.belongsTo(User, {
        foreignKey: "userId",
        targetKey: "uid",
    });

    // Post modeli ilişkileri
    // Post - Like ilişkisi (1-N)
    Post.hasMany(Like, {
        foreignKey: "postId",
        sourceKey: "id",
    });

    Like.belongsTo(Post, {
        foreignKey: "postId",
        targetKey: "id",
    });

    // Post - Comment ilişkisi (1-N)
    Post.hasMany(Comment, {
        foreignKey: "postId",
        sourceKey: "id",
    });

    Comment.belongsTo(Post, {
        foreignKey: "postId",
        targetKey: "id",
    });

    // Post - Saved ilişkisi (1-N)
    Post.hasMany(Saved, {
        foreignKey: "postId",
        sourceKey: "id",
    });

    Saved.belongsTo(Post, {
        foreignKey: "postId",
        targetKey: "id",
    });
}
