import Post from "./postModel.js";
import User from "./userModel.js";
import Like from "./likeModel.js";
import Saved from "./savedModel.js";
import Follow from "./followModel.js";
import Comment from "./commentModel.js";

export default function setupAssociations() {
    // User - Follow ilişkisi (1-N)

    // 1. Bir kullanıcının TAKİP ETTİĞİ diğer kullanıcıları tanımlama:
    User.belongsToMany(User, {
        as: "Following",
        through: Follow,
        foreignKey: "followerId", // Ara tablodaki BU kullanıcı (takip eden)
        otherKey: "followingId", // Ara tablodaki DİĞER kullanıcı (takip edilen)
        sourceKey: "uid",
        targetKey: "uid",
        inverse: {
            as: "Followers", // <<< TERS İLİŞKİNİN ADI (diğer belongsToMany'nin 'as' değeri)
        },
    });

    // 2. Bir kullanıcıyı TAKİP EDEN diğer kullanıcıları tanımlama:
    User.belongsToMany(User, {
        as: "Followers", // Takma ad: user.getFollowers()
        through: Follow,
        foreignKey: "followingId", // Ara tablodaki BU kullanıcı (takip edilen)
        otherKey: "followerId", // Ara tablodaki DİĞER kullanıcı (takip eden)
        sourceKey: "uid",
        targetKey: "uid",
        inverse: {
            as: "Following", // <<< TERS İLİŞKİNİN ADI (diğer belongsToMany'nin 'as' değeri)
        },
    });

    // Follow modelindeki belongsTo tanımlamaları hala isteğe bağlı ama faydalı olabilir.
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

    // Saved ve Post arasındaki ilişki (1-N)
    Saved.belongsTo(Post, {
        foreignKey: "postId",
        targetKey: "id",
    });

    Post.hasMany(Saved, {
        foreignKey: "postId",
        sourceKey: "id",
    });

    // Comment ve User arasındaki ilişki (1-N)
    User.hasMany(Comment, {
        foreignKey: "userId",
        sourceKey: "uid",
    });

    Comment.belongsTo(User, {
        foreignKey: "userId",
        targetKey: "uid",
    });
}
