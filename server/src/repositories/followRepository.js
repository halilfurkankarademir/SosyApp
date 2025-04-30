import Follow from "../models/followModel.js";
import User from "../models/userModel.js"; // Gerekli olacak ilişkiler için
import logger from "../utils/logger.js"; // Opsiyonel loglama için

/**
 * Follow modeli için veritabanı işlemleri deposu.
 * @namespace followRepository
 */
const followRepository = {
    /**
     * Yeni bir takip ilişkisi oluşturur.
     * @memberof followRepository
     * @param {string} followerId - Takip eden kullanıcının UUID'si.
     * @param {string} followingId - Takip edilen kullanıcının UUID'si.
     * @returns {Promise<Follow>} Oluşturulan Sequelize 'Follow' model örneği.
     */
    async create(followerId, followingId) {
        return Follow.create({ followerId, followingId });
    },

    /**
     * Belirtilen takip ilişkisini siler.
     * @memberof followRepository
     * @param {string} followerId - Takip eden kullanıcının UUID'si.
     * @param {string} followingId - Takip edilen kullanıcının UUID'si.
     * @returns {Promise<number>} Silinen kayıt sayısı (genellikle 1 veya 0).
     */
    async delete(followerId, followingId) {
        return Follow.destroy({ where: { followerId, followingId } });
    },

    /**
     * Belirli bir takip ilişkisinin var olup olmadığını kontrol eder.
     * @memberof followRepository
     * @param {string} followerId - Takip eden kullanıcının UUID'si.
     * @param {string} followingId - Takip edilen kullanıcının UUID'si.
     * @returns {Promise<Follow|null>} Bulunan 'Follow' model örneğini veya bulunamazsa null döndürür.
     */
    async findOne(followerId, followingId) {
        return Follow.findOne({ where: { followerId, followingId } });
    },

    /**
     * Belirli bir kullanıcıyı takip eden tüm kullanıcıları (Follower'ları) detaylarıyla getirir.
     * @memberof followRepository
     * @param {string} followingId - Takip edilen kullanıcının UUID'si.
     * @returns {Promise<Array<Follow>>} Takip eden kullanıcı bilgilerini içeren 'Follow' model örneklerinin dizisi ('FollowerUser' ilişkisi dahil).
     */
    async findFollowersWithDetails(followingId) {
        return Follow.findAll({
            where: { followingId },
            // Modelinizdeki ilişki adının 'FollowerUser' olduğunu varsayıyoruz.
            include: [
                {
                    model: User, // Doğrudan model kullanarak daha net olabilir.
                    as: "FollowerUser", // Modeldeki 'as' tanımıyla eşleşmeli.
                    attributes: [
                        "uid",
                        "username",
                        "profilePicture",
                        "firstName",
                        "lastName",
                    ], // İstenilen alanları belirtin
                },
            ],
        });
    },

    /**
     * Belirli bir kullanıcının takip ettiği tüm kullanıcıları (Following'leri) detaylarıyla getirir.
     * @memberof followRepository
     * @param {string} followerId - Takip eden kullanıcının UUID'si.
     * @returns {Promise<Array<Follow>>} Takip edilen kullanıcı bilgilerini içeren 'Follow' model örneklerinin dizisi ('FollowedUser' ilişkisi dahil).
     */
    async findFollowingWithDetails(followerId) {
        return Follow.findAll({
            where: { followerId },
            // Modelinizdeki ilişki adının 'FollowedUser' olduğunu varsayıyoruz.
            include: [
                {
                    model: User, // Doğrudan model kullanarak daha net olabilir.
                    as: "FollowedUser", // Modeldeki 'as' tanımıyla eşleşmeli.
                    attributes: [
                        "uid",
                        "username",
                        "profilePicture",
                        "firstName",
                        "lastName",
                    ], // İstenilen alanları belirtin
                },
            ],
        });
    },

    /**
     * Belirli bir kullanıcının takip ettiği tüm kullanıcıların ID'lerini getirir.
     * @memberof followRepository
     * @param {string} followerId - Takip eden kullanıcının UUID'si.
     * @returns {Promise<Array<string>>} Takip edilen kullanıcıların UUID'lerinin dizisi.
     */
    async findFollowingIds(followerId) {
        const follows = await Follow.findAll({
            where: { followerId },
            attributes: ["followingId"], // Sadece followingId'yi seç
            raw: true, // Düz JavaScript nesneleri olarak al
        });
        return follows.map((follow) => follow.followingId);
    },
};

export default followRepository;
