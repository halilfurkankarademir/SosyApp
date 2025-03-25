const {
    firestore,
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    deleteDoc,
    query,
    where,
    serverTimestamp,
} = require("../config/firebase");
// Random id olusturmak icin gerekli kutuphane
const uuid = require("uuid");

class Comment {
    constructor({
        commentId,
        postId,
        userId,
        content,
        likes = [],
        createdAt = serverTimestamp(),
    }) {
        this.commentId = commentId;
        this.postId = postId;
        this.userId = userId;
        this.content = content;
        this.likes = likes;
        this.createdAt = createdAt;
    }

    /**
     * @param {string} content Yorum icerigi
     * @param {string} userId Yorumu olusturan kullanici
     * @param {string} postId Yorumun yapildigi post
     */
    async saveComment(content, userId, postId) {
        this.commentId = uuid.v4();
        this.content = content;
        this.userId = userId;
        this.postId = postId;
        this.createdAt = serverTimestamp();

        const commentRef = doc(firestore, "comments", this.commentId);
        await setDoc(commentRef, { ...this });
        return this.commentId;
    }

    /**
     * @param {string} commentId duzenlenecek yorum idsi
     * @param {string} content yeni yorum icerigi
     */
    async updateComment(commentId, content) {
        const commentRef = doc(firestore, "comments", commentId);
        await setDoc(commentRef, { content }, { merge: true });
    }

    /**
     * @param {string} commentId silinecek yorum idsi
     */
    async deleteComment(commentId) {
        const commentRef = doc(firestore, "comments", commentId);
        await deleteDoc(commentRef);
    }

    /**
     * @param {string} commentId beğenilen yorum idsi
     * @param {string} userId begenen kullanıcı idsi
     */
    async likeComment(commentId, userId) {
        const commentRef = doc(firestore, "comments", commentId);
        const commentSnap = await getDoc(commentRef);
        const likes = commentSnap.data().likes || [];

        const updatedLikes = likes.includes(userId)
            ? likes.filter((id) => id !== userId)
            : [...likes, userId];

        await setDoc(commentRef, { likes: updatedLikes }, { merge: true });
    }

    /**
     * @param {string} postId yorumlari gosterilecek gönderi idsi
     */
    async getCommentsByPostId(postId) {
        const commentsRef = collection(firestore, "comments");
        const q = query(commentsRef, where("postId", "==", postId));
        const snapshot = await getDocs(q);

        return snapshot.docs.map((doc) => new Comment(doc.data()));
    }
}

module.exports = Comment;
