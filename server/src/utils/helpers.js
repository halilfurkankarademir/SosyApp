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

export const addPostDetailsForUser = (posts, userId) => {
    return posts.map((post) => {
        if (!post) {
            return null;
        }

        // Gonderiyi json'a cevirip isOwner, isLiked, isSaved degerlerini ekliyoruz
        const plainPost = post.toJSON();

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
    });
};
