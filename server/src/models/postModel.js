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

class Post {
    constructor({
        postId, // Benzersiz post idsi
        userId, // Postu olusturan kullanici idsi
        content, // Post icerigi yazi olarak
        media, // Varsa fotograf urlsi
        likes = [], // Postu begenen kullanici idleri
        comments = [], // Posta yapilan yorum Idleri
        shares, // Postun paylasilma sayisi
        createdAt = serverTimestamp(), // Postun olusturulma tarihi
    }) {
        this.postId = postId;
        this.userId = userId;
        this.content = content;
        this.media = media;
        this.likes = likes;
        this.comments = comments;
        this.shares = shares;
        this.createdAt = createdAt;
    }

    // Todo post olusturma fonk

    // Todo post editleme fonk

    // Todo post silme fonk

    // Todo post goruntuleme fonk (id ye gore)

    // Todo posta begeni ekleme fonk (postId ve userId)

    // Todo posta begeni silme fonk (postId ve userId)

    // Todo posta yorum ekleme fonk (postId ve commentId)

    // Todo post yorum silme fonk (postId ve commentId)

    // Todo kullaniciya ait postlari getirme (userId)
}

module.exports = Post;
