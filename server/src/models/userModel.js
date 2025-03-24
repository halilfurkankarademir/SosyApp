// Firebase bağlantısı
const {
    firestore,
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    deleteDoc,
    serverTimestamp,
} = require("../config/firebase");

class User {
    constructor({
        userId, // Firebase Auth'dan gelen ID
        email, // Kullanıcının email adresi
        username, // Kullanıcı adı
        fullName, // Tam ad soyad
        profilePicture = null, // Profil fotoğrafı URL'i
        bio = "", // Profil biyografisi
        followers = [], // Takipçi ID'leri
        following = [], // Takip edilen ID'leri
        posts = [], // Kullanıcının gönderileri
        createdAt = serverTimestamp(), // Hesap oluşturulma tarihi
    }) {
        this.userId = userId;
        this.email = email;
        this.username = username;
        this.fullName = fullName;
        this.profilePicture = profilePicture;
        this.bio = bio;
        this.followers = followers;
        this.following = following;
        this.posts = posts;
        this.createdAt = createdAt;
    }

    // Firestore'a kaydetme
    async save() {
        const userData = {
            userId: this.userId,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
            profilePicture: this.profilePicture,
            bio: this.bio,
            followers: this.followers,
            following: this.following,
            posts: this.posts,
            createdAt: this.createdAt,
        };

        const userRef = doc(firestore, "users", this.userId);
        await setDoc(userRef, userData, { merge: true });
        return this;
    }

    // Firestore'dan kullanıcı getirme (userId'ye göre)
    static async findById(userId) {
        const userRef = doc(firestore, "users", userId);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return new User(data);
        }
        return null; // Kullanıcı bulunamazsa
    }

    // Kullanıcı adına göre kullanıcı bulma
    static async findByUsername(username) {
        const usersRef = collection(firestore, "users");
        const querySnapshot = await getDocs(usersRef);
        let foundUser = null;

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.username === username) {
                foundUser = new User(data);
            }
        });

        return foundUser;
    }

    // Firestore'dan kullanıcı silme
    async delete() {
        const userRef = doc(firestore, "users", this.userId);
        await deleteDoc(userRef);
    }

    // Takipçi ekleme
    async addFollower(followerId) {
        if (!this.followers.includes(followerId)) {
            this.followers.push(followerId);
            await this.save();
            return true;
        }
        return false;
    }

    // Takipçi çıkarma
    async removeFollower(followerId) {
        this.followers = this.followers.filter((id) => id !== followerId);
        await this.save();
    }

    // Takip edilen kullanıcı ekleme
    async followUser(userId) {
        if (!this.following.includes(userId)) {
            this.following.push(userId);

            // Karşı kullanıcıya takipçi olarak eklenme
            const targetUser = await User.findById(userId);
            if (targetUser) {
                await targetUser.addFollower(this.userId);
            }

            await this.save();
            return true;
        }
        return false;
    }

    // Takip edilen kullanıcı çıkarma
    async unfollowUser(userId) {
        this.following = this.following.filter((id) => id !== userId);

        // Karşı kullanıcının takipçilerinden çıkarılma
        const targetUser = await User.findById(userId);
        if (targetUser) {
            await targetUser.removeFollower(this.userId);
        }

        await this.save();
    }

    // Gönderi ekleme
    async addPost(postId) {
        if (!this.posts.includes(postId)) {
            this.posts.push(postId);
            await this.save();
        }
    }

    // Gönderi silme
    async removePost(postId) {
        this.posts = this.posts.filter((id) => id !== postId);
        await this.save();
    }

    // Profil bilgilerini güncelleme
    async updateProfile(updateData) {
        const allowedFields = ["fullName", "bio", "profilePicture"];

        for (const field of allowedFields) {
            if (updateData[field] !== undefined) {
                this[field] = updateData[field];
            }
        }

        await this.save();
        return this;
    }

    // Tüm kullanıcıları getirme
    static async getAllUsers() {
        const usersRef = collection(firestore, "users");
        const querySnapshot = await getDocs(usersRef);
        const users = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            users.push(new User(data));
        });

        return users;
    }
}

module.exports = User;
