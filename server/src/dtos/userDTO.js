class userDTO {
    constructor(user) {
        this.uid = user.uid;
        this.role = user.role;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.username = user.username;
        this.profilePicture = user.profilePicture;
        this.bio = user.bio;
        this.location = user.location;
    }
}

export default userDTO;
