class AdminProfileDTO {
    constructor(user) {
        if (!user) throw new Error("User object is required");

        const publicFields = [
            "uid",
            "role",
            "firstName",
            "lastName",
            "email",
            "username",
            "profilePicture",
            "bio",
            "ipAdress",
            "lastLoginAt",
            "Followers",
            "Following",
            "posts",
            "verified",
        ];

        publicFields.forEach((field) => {
            this[field] = user[field];
        });
    }
}

export default AdminProfileDTO;
