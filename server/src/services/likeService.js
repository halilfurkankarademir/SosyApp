/**
 * Beğeni (like) işlemleri için servis katmanı.
 * Repository katmanını kullanarak iş mantığını yürütür.
 * @namespace likeService
 */
const likeService = (likeRepository) => ({
    /**
     * Bir kullanıcının bir gönderiyi beğenmesini sağlar.
     * Repository üzerinden yeni bir beğeni kaydı oluşturur.
     * @memberof likeService
     * @param {string} userId - Beğeniyi yapan kullanıcının ID'si.
     * @param {number} postId - Beğenilen gönderinin ID'si.
     * @returns {Promise<Like>} Oluşturulan beğeni kaydı nesnesi.
     * @throws {Error} Beğeni oluşturma işlemi sırasında bir hata oluşursa.
     */
    async createLike(userId, postId) {
        try {
            const like = await likeRepository.create(userId, postId);
            return like;
        } catch (error) {
            throw new Error("Error creating like: " + error.message);
        }
    },

    /**
     * Bir kullanıcının bir gönderiye yaptığı beğeniyi geri almasını sağlar.
     * Repository üzerinden ilgili beğeni kaydını siler.
     * @memberof likeService
     * @param {string} userId - Beğeniyi geri alan kullanıcının ID'si.
     * @param {number} postId - Beğenisi geri alınan gönderinin ID'si.
     * @returns {Promise<void>} İşlem başarılı olursa bir şey döndürmez (veya silinen kayıt sayısını döndürebilir).
     * @throws {Error} Beğeni silme işlemi sırasında bir hata oluşursa.
     */
    async deleteLike(userId, postId) {
        try {
            await likeRepository.deleteByUserIdAndPostId(userId, postId);
        } catch (error) {
            throw new Error("Error deleting like: " + error.message);
        }
    },

    /**
     * Belirli bir gönderiye ait tüm beğenileri getirir.
     * Repository üzerinden ilgili gönderinin beğenilerini sorgular.
     * @memberof likeService
     * @param {number} postId - Beğenileri getirilecek gönderinin ID'si.
     * @returns {Promise<Array<Like>>} Belirtilen gönderiye ait beğeni kayıtlarının dizisi.
     * @throws {Error} Beğenileri getirme işlemi sırasında bir hata oluşursa.
     */
    async getAllLikes(postId) {
        try {
            const likes = await likeRepository.findByPostId(postId);
            return likes;
        } catch (error) {
            throw new Error("Error getting likes: " + error.message);
        }
    },

    /**
     * Belirli bir kullanıcının yaptığı tüm beğenileri (ilişkili gönderi bilgileriyle birlikte) getirir.
     * Repository üzerinden kullanıcı ID'sine göre sorgulama yapar.
     * @memberof likeService
     * @param {string} userId - Beğenileri getirilecek kullanıcının ID'si.
     * @returns {Promise<Array<Post>>} Kullanıcının yaptığı beğeni kayıtlarının dizisi.
     * @throws {Error} Kullanıcının beğenilerini getirme işlemi sırasında bir hata oluşursa.
     */
    async getLikesByUserId(userId) {
        try {
            const likes = await likeRepository.findWithPostsByUserId(userId);
            return likes;
        } catch (error) {
            throw new Error("Error getting likes by user ID: " + error.message);
        }
    },
});

export default likeService;
