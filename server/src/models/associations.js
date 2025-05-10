/**
 *  Veritabanı iliskilerini tanımlayan modül.
 */

import Post from "./postModel.js";
import User from "./userModel.js";
import Like from "./likeModel.js";
import Saved from "./savedModel.js";
import Follow from "./followModel.js";
import Comment from "./commentModel.js";

export default function setupAssociations() {
    // User - Post ilişkisi (1-N)
    /** Kullanicinin birden fazla gonderisi olabilir */
    User.hasMany(Post, {
        foreignKey: "userId",
        sourceKey: "uid",
    });

    /** Bir gonderi sadece bir kullaniciya aittir */
    Post.belongsTo(User, {
        foreignKey: "userId",
        targetKey: "uid",
    });

    User.belongsToMany(User, {
        as: "Following",
        through: Follow,
        foreignKey: {
            name: "followerId",
            onDelete: "CASCADE",
        },
        otherKey: {
            name: "followingId",
            onDelete: "CASCADE",
        },
        sourceKey: "uid",
        targetKey: "uid",
        inverse: {
            as: "Followers",
        },
    });

    // Follow modelinin User'a bağlantıları
    /** Bir takip bir kullanıcıya aittir */
    Follow.belongsTo(User, {
        foreignKey: "followerId",
        targetKey: "uid",
        as: "FollowerUser",
    });

    /** Bir takip bir kullanıcıya aittir */
    Follow.belongsTo(User, {
        foreignKey: "followingId",
        targetKey: "uid",
        as: "FollowedUser",
    });

    // User - Like ilişkisi (1-N)
    /** Kullanicinin birden fazla begenisi olabilir */
    User.hasMany(Like, {
        foreignKey: "userId",
        sourceKey: "uid",
    });

    /** Bir begeni bir kullanıcıya aittir */
    Like.belongsTo(User, {
        foreignKey: "userId",
        targetKey: "uid",
    });

    // User - Saved ilişkisi (1-N)
    /** Kullanicinin birden fazla kaydedilen gonderisi olabilir */
    User.hasMany(Saved, {
        foreignKey: "userId",
        sourceKey: "uid",
    });

    /** Bir kaydedilen gonderi bir kullanıcıya aittir */
    Saved.belongsTo(User, {
        foreignKey: "userId",
        targetKey: "uid",
    });

    // User - Comment ilişkisi (1-N)
    /** Kullanicinin birden fazla yorumu olabilir */
    User.hasMany(Comment, {
        foreignKey: "userId",
        sourceKey: "uid",
    });

    /** Bir yorum bir kullanıcıya aittir */
    Comment.belongsTo(User, {
        foreignKey: "userId",
        targetKey: "uid",
    });

    // Post modeli ilişkileri
    // Post - Like ilişkisi (1-N)
    /** Bir gonderi birden fazla begenisi olabilir */
    Post.hasMany(Like, {
        foreignKey: "postId",
        sourceKey: "id",
    });

    /** Bir begeni bir gonderiye aittir */
    Like.belongsTo(Post, {
        foreignKey: "postId",
        targetKey: "id",
    });

    // Post - Comment ilişkisi (1-N)
    /** Bir gonderi birden fazla yorumu olabilir */
    Post.hasMany(Comment, {
        foreignKey: "postId",
        sourceKey: "id",
    });

    /** Bir yorum bir gonderiye aittir */
    Comment.belongsTo(Post, {
        foreignKey: "postId",
        targetKey: "id",
    });

    // Post - Saved ilişkisi (1-N)
    /** Bir gonderi birden fazla kullanicinin kaydedilen gonderi olabilir */
    Post.hasMany(Saved, {
        foreignKey: "postId",
        sourceKey: "id",
    });

    /** Bir kaydedilen gonderi bir gonderiye aittir */
    Saved.belongsTo(Post, {
        foreignKey: "postId",
        targetKey: "id",
    });
}
