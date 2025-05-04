/**
 * @fileoverview Uygulama genelinde kullanılan yardımcı fonksiyonları tanımlayan modül.
 * @module utils/helpers
 */

import AdminProfileDTO from "../dtos/profileDTOs/AdminProfileDTO.js";
import OwnProfileDTO from "../dtos/profileDTOs/OwnProfileDTO.js";
import PublicProfileDTO from "../dtos/profileDTOs/PublicProfileDTO.js";

/**
 * Istemcinin IP adresinin son bölümünü ".XXX" ile değiştirerek anonimleştirir.
 * Bu genellikle IPv4 adresleri için kullanılır.
 * @param {string} ip - İstemcinin IP adresi (örn: "192.168.1.101").
 * @returns {string} Son bölümü anonimleştirilmiş IP adresi (örn: "192.168.1.XXX").
 */
export const getAnonymizedIp = (ip) => {
    if (typeof ip !== "string") return "";
    return ip.replace(/\.\d+$/, ".XXX");
};

/**
 * Bu fonksiyon return edilen post verilerine, (isFollower, isFollowing, isOwner, isLiked, isSaved) degerlerini ekler
 * ve donderir. Boylece frontendde bu bilgilere kolayca erisim saglanarak kontroller yapilabilir
 * @param {Array<Post> | Post} posts - Gonderi verileri
 * @param {string} userId - Aktif kullanıcının ID'si
 * @returns {Array<Post> | Post} Guncellenmis gonderi verilerini donderir
 */
export const addPostDetailsForUser = (posts, userId) => {
    // Gelen verinin bir array olup olmadıgını kontrol ediyoruz
    const isPostsArray = Array.isArray(posts) && posts.length > 0;
    if (isPostsArray) {
        return posts.map((post) => {
            if (!post) {
                return null;
            }

            // Gonderiyi json'a cevirip isOwner, isLiked, isSaved degerlerini ekliyoruz
            const plainPost = post.toJSON();

            const isOwner = plainPost.userId === userId;
            const isLiked = plainPost.likes.some(
                (like) => like.userId === userId
            );
            const isSaved = plainPost.saveds.some(
                (saved) => saved.userId === userId
            );
            return {
                ...plainPost,
                isOwner,
                isLiked,
                isSaved,
            };
        });
    }
    const plainPost = posts.toJSON();
    const isOwner = plainPost.userId === userId;
    const isLiked = plainPost.likes.some((like) => like.userId === userId);
    const isSaved = plainPost.saveds.some((saved) => saved.userId === userId);
    return {
        ...plainPost,
        isOwner,
        isLiked,
        isSaved,
    };
};

/**
 * Bu fonksiyon return edilen comment verilerine, (isOwner) degerlerini ekler
 * ve donderir. Boylece frontendde bu bilgilere kolayca erisim saglanarak kontroller yapilabilir
 * @param {Array<Comment> | Comment} comments - Yorum verileri
 * @param {string} userId - Aktif kullanıcının ID'si
 * @returns {Array<Comment> | Comment} Guncellenmis yorum verilerini donderir
 */
export const addCommentDetailsForUser = (comments, userId) => {
    return comments.map((comment) => {
        if (!comment) {
            return null;
        }
        const plainComment = comment.toJSON();
        const isOwner = plainComment.userId === userId;

        return {
            ...plainComment,
            isOwner,
        };
    });
};

/**
 * Kullanıcıların aynı kullanıcı olup olmadıgını kontrol eder
 * @param {string} userId1 - Birinci kullanıcının ID'si.
 * @param {string} userId2 - Ikinci kullanıcının ID'si.
 * @returns {boolean} Aynı kullanıcı ise `true`, aksi halde `false` döndürür.
 * */
export const checkOwner = (userId1, userId2) => {
    return userId1 === userId2;
};

export const checkAdmin = (req) => {
    const role = req.user.role;
    if (role === "admin") {
        return true;
    }
    return false;
};

export const getPagination = (req) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const offset = (page - 1) * limit;
    return { page, limit, offset };
};

export const getFilters = (req) => {
    const filterQuery = req.query.filter;
    if (typeof filterQuery === "string") {
        return { filterQuery: filterQuery.trim() };
    }
    return { filterQuery };
};

const permissionLevels = {
    NONE: 0,
    NORMAL_USER: 1,
    SELF_USER: 2,
    ADMIN: 3,
};
Object.freeze(permissionLevels);

/**
 * Post gosterim yetkilerini belirler
 * @param {object} req
 * @param {string} userIdToCheck
 * @returns {number} 1 - Normal kullanıcı, 2 - Istegi yapan kullanıcı, 3 - Admin
 */
export const getPermissionLevel = (req, userIdToCheck) => {
    if (!req.user) {
        return permissionLevels.NONE;
    }

    const userRole = req.user.role.toLowerCase();

    const isSelfUser = req.user.uid === userIdToCheck;

    if (userRole === "admin") {
        return permissionLevels.ADMIN;
    } else if (isSelfUser) {
        return permissionLevels.SELF_USER;
    } else {
        return permissionLevels.NORMAL_USER;
    }
};

export const getUserDTOInstanceByPermissionLevel = (permissionLevel, user) => {
    switch (permissionLevel) {
        case 1:
            return new PublicProfileDTO(user);
        case 2:
            return new OwnProfileDTO(user);
        case 3:
            return new AdminProfileDTO(user);
        default:
            return new PublicProfileDTO(user);
    }
};
