/**
 * Sadece kullanıcının kendisi tarafından erişilebilecek olan kullanıcı verilerini temsil eden DTO sınıfı.
 * API yanıtlarında döndürülecek kullanıcı verilerini yapılandırır.
 * @class OwnerUserDTO
 */
class OwnerUserDTO {
    constructor(user) {
        if (!user) throw new Error("User object is required");
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.username = user.username;
        this.profilePicture = user.profilePicture;
        this.bio = user.bio;
        this.location = user.location;
        this.verified = user.verified;
        this.isFollowing = user.isFollowing;
        this.isOwnProfile = true;
        this.followerCount = user.followerCount;
        this.followingCount = user.followingCount;
        this.postsCount = user.postsCount;
    }
}

export default OwnerUserDTO;
