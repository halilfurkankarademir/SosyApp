import createHttpError from "http-errors";
import { ErrorMessages } from "../utils/constants.js";
import { addCommentDetailsForUser } from "../utils/helpers.js";
import { sendCommentNotification } from "./notificationService.js";

/**
 * Yorum işlemleri için servis katmanı.
 * Yorumlarla ilgili iş mantığını yönetir ve repository katmanını kullanır.
 */
const commentService = (commentRepository, postService) => ({
    /**
     * Yeni bir yorum oluşturur.
     * @param {string} userId Yorumu yapan kullanıcının ID'si.
     * @param {string} postId Yorum yapılan gönderinin ID'si.
     * @param {string} content Yorum içeriği.
     * @returns {Promise<object>} Oluşturulan yorum nesnesi.
     */
    createComment: async (userId, postId, content, requestUser) => {
        try {
            const comment = await commentRepository.createComment(
                userId,
                postId,
                content
            );
            const postDetails = await postService.getPostById(postId);
            const postOwnerId = postDetails.user.uid;
            sendCommentNotification(requestUser, postOwnerId, postId);
            return comment;
        } catch (error) {
            throw new Error(ErrorMessages.COMMENT_CREATION_FAILED);
        }
    },

    /**
     * Belirtilen ID'ye sahip yorumu siler.
     * @param {string} commentId Silinecek yorumun ID'si.
     * @returns {Promise<void>}
     */
    deleteComment: async (commentId) => {
        try {
            await commentRepository.deleteComment(commentId);
        } catch (error) {
            throw new Error(ErrorMessages.COMMENT_DELETION_FAILED);
        }
    },

    /**
     * Bir gönderiye ait yorumları, istek yapan kullanıcıya özel detaylarla (örn. beğeni durumu) birlikte getirir.
     * @param {string} postId Yorumları alınacak gönderinin ID'si.
     * @param {string} userId İsteği yapan kullanıcının ID'si.
     * @returns {Promise<Array<object>>} Gönderiye ait yorumların listesi.
     */
    getCommentsByPostId: async (postId, userId) => {
        try {
            const comments = await commentRepository.getCommentsByPostId(
                postId
            );
            // Yorumlara kullanıcıya özel ek bilgiler eklenir (örneğin, kullanıcının yorumu beğenip beğenmediği)
            const updatedComments = addCommentDetailsForUser(comments, userId);
            return updatedComments;
        } catch (error) {
            throw createHttpError(500, ErrorMessages.COMMENT_FETCH_FAILED);
        }
    },
});

export default commentService;
