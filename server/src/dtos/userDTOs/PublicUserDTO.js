/**
 * Herkes tarafından erişilebilecek olan kullanıcı verilerini temsil eden DTO sınıfı.
 * API yanıtlarında döndürülecek kullanıcı verilerini yapılandırır.
 * @class PublicUserDTO
 */

class PublicUserDTO {
    constructor(user) {
        if (!user) throw new Error("User object is required");
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.profilePicture = user.profilePicture;
        this.bio = user.bio;
        this.location = user.location;
        this.verified = user.verified;
        this.isFollowing = user.isFollowing;
        this.followerCount = user.followerCount;
        this.followingCount = user.followingCount;
        this.postsCount = user.postsCount;
    }
}

export default PublicUserDTO;
