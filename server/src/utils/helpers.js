/**
 * Uygulama genelinde kullanılan yardımcı fonksiyonları tanımlayan modül.
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
    if (typeof ip !== "string") {
        throw new Error("ip must be a string");
    }
    return ip.replace(/\.\d+$/, ".XXX");
};

/**
 * Bu fonksiyon return edilen post verilerine, (isOwner, isLiked, isSaved) degerlerini ekler
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
    } else {
        const plainPost = posts.toJSON();

        const isOwner = plainPost.userId === userId;

        const isLiked = plainPost.likes.some((like) => like.userId === userId);

        const isSaved = plainPost.saveds.some(
            (saved) => saved.userId === userId
        );
        return {
            ...plainPost,
            isOwner,
            isLiked,
            isSaved,
        };
    }
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
 * @returns {boolean}
 * */
export const areUserIdsEqual = (userId1, userId2) => {
    return userId1 === userId2;
};

/**
 * Kullanıcının admin olup olmadıgını kontrol eder
 * @param {string} role - Kullanıcının rolu
 * @returns {boolean}
 */
export const checkAdmin = (role) => {
    return role === "admin";
};

/**
 * Requstten gelen sayfayı ve limiti alarak offset hesaplar
 * @param {number} page - Sayfa numarası
 * @param {number} limit - Sayfa basına gonderi sayısı
 * @returns {{page: number, limit: number, offset: number}}
 */
export const getPagination = (page, limit) => {
    const offset = (page - 1) * limit;
    return { page, limit, offset };
};

/**
 * Requstten gelen filtreleri alır
 * @param {string} filterQuery - Filtreleme yapılacak metin
 * @returns {{filterQuery: string}}
 * */
export const getFilters = (filterQuery) => {
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
 * @param {object} currentUser - Kullanıcı bilgileri
 * @param {string} userIdToCheck - Uzerindeki yetki seviyesi kontrol edilecek kullanıcı ID'si
 * @returns {number} 1 - Normal kullanıcı, 2 - Istegi yapan kullanıcı, 3 - Admin
 */
export const getPermissionLevel = (currentUser, userIdToCheck) => {
    if (!currentUser) {
        return permissionLevels.NONE;
    }

    const userRole = currentUser.role.toLowerCase();

    const isSelfUser = currentUser.uid === userIdToCheck;

    if (userRole === "admin") {
        return permissionLevels.ADMIN;
    } else if (isSelfUser) {
        return permissionLevels.SELF_USER;
    } else {
        return permissionLevels.NORMAL_USER;
    }
};

// Kullanıcının yetkilerine gore kullanıcı bilgilerini donderir
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

export const getAnonymizedClientIpAdress = (req) => {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    return getAnonymizedIp(ip);
};

export const extractPostData = (postDataFromBody, userId) => {
    return {
        ...postDataFromBody,
        userId,
    };
};
