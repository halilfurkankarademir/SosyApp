/**
 * @fileoverview Veritabanı iliskilerini tanımlayan modül.
 * @module models/associations
 */

import Post from "./postModel.js";
import User from "./userModel.js";
import Like from "./likeModel.js";
import Saved from "./savedModel.js";
import Follow from "./followModel.js";
import Comment from "./commentModel.js";

export default function setupAssociations() {
    // User - Post ilişkisi (1-N)
    /**@description Kullanicinin birden fazla gonderisi olabilir */
    User.hasMany(Post, {
        foreignKey: "userId",
        sourceKey: "uid",
    });

    /**@description Bir gonderi sadece bir kullaniciya aittir */
    Post.belongsTo(User, {
        foreignKey: "userId",
        targetKey: "uid",
    });

    // User - User (Follow) ilişkileri (N-M)
    /**@description kullanici farklı kullanıcıları takip edebilir */
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

    /**@description kullanicinin farklı takipcileri olabilir */
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
    /**@description Bir takip bir kullanıcıya aittir */
    Follow.belongsTo(User, {
        foreignKey: "followerId",
        targetKey: "uid",
        as: "FollowerUser",
    });

    /**@description Bir takip bir kullanıcıya aittir */
    Follow.belongsTo(User, {
        foreignKey: "followingId",
        targetKey: "uid",
        as: "FollowedUser",
    });

    // User - Like ilişkisi (1-N)
    /**@description Kullanicinin birden fazla begenisi olabilir */
    User.hasMany(Like, {
        foreignKey: "userId",
        sourceKey: "uid",
    });

    /**@description Bir begeni bir kullanıcıya aittir */
    Like.belongsTo(User, {
        foreignKey: "userId",
        targetKey: "uid",
    });

    // User - Saved ilişkisi (1-N)
    /**@description Kullanicinin birden fazla kaydedilen gonderisi olabilir */
    User.hasMany(Saved, {
        foreignKey: "userId",
        sourceKey: "uid",
    });

    /**@description Bir kaydedilen gonderi bir kullanıcıya aittir */
    Saved.belongsTo(User, {
        foreignKey: "userId",
        targetKey: "uid",
    });

    // User - Comment ilişkisi (1-N)
    /**@description Kullanicinin birden fazla yorumu olabilir */
    User.hasMany(Comment, {
        foreignKey: "userId",
        sourceKey: "uid",
    });

    /**@description Bir yorum bir kullanıcıya aittir */
    Comment.belongsTo(User, {
        foreignKey: "userId",
        targetKey: "uid",
    });

    // Post modeli ilişkileri
    // Post - Like ilişkisi (1-N)
    /**@description Bir gonderi birden fazla begenisi olabilir */
    Post.hasMany(Like, {
        foreignKey: "postId",
        sourceKey: "id",
    });

    /**@description Bir begeni bir gonderiye aittir */
    Like.belongsTo(Post, {
        foreignKey: "postId",
        targetKey: "id",
    });

    // Post - Comment ilişkisi (1-N)
    /**@description Bir gonderi birden fazla yorumu olabilir */
    Post.hasMany(Comment, {
        foreignKey: "postId",
        sourceKey: "id",
    });

    /**@description Bir yorum bir gonderiye aittir */
    Comment.belongsTo(Post, {
        foreignKey: "postId",
        targetKey: "id",
    });

    // Post - Saved ilişkisi (1-N)
    /**@description Bir gonderi birden fazla kullanicinin kaydedilen gonderi olabilir */
    Post.hasMany(Saved, {
        foreignKey: "postId",
        sourceKey: "id",
    });

    /**@description Bir kaydedilen gonderi bir gonderiye aittir */
    Saved.belongsTo(Post, {
        foreignKey: "postId",
        targetKey: "id",
    });
}
