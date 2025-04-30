let ioInstance = null;
let userSocketsRef = {};

/**
 * Bildirim servisini Socket.io örneği ve kullanıcı soket referansları ile başlatır.
 * Bu fonksiyonun, bildirim gönderilmeden önce çağrılması gerekmektedir.
 * @param {object} io - Başlatılmış Socket.io sunucu örneği.
 * @param {object} userSockets - Kullanıcı ID'lerini soket ID'lerine eşleyen nesne referansı.
 * @returns {void}
 */
export function initializeNotificationService(io, userSockets) {
    ioInstance = io;
    userSocketsRef = userSockets;
}

/**
 * Belirtilen kullanıcı ID'sine sahip aktif kullanıcıya Socket.io üzerinden bildirim gönderir.
 * Servis başlatılmamışsa veya hedef kullanıcı bulunamazsa konsola hata yazar.
 * @param {string} targetUserId - Bildirimin gönderileceği hedef kullanıcının ID'si.
 * @param {object} data - Gönderilecek bildirim verisi (örn: { type, message, ... }).
 * @returns {void}
 */
function sendNotification(targetUserId, data) {
    if (!ioInstance) {
        console.error("Notification service is not initialized!");
        return;
    }
    console.log("Sending notification to user:", targetUserId);
    // console.log(userSocketsRef); // Geliştirme sırasında loglama için bırakılabilir
    const targetSocketId = userSocketsRef[targetUserId];

    if (!targetSocketId) {
        console.error(
            `Target user socket not found for user ID: ${targetUserId}`
        );
        return;
    }

    ioInstance.to(targetSocketId).emit("new_notification", data);
    console.log(
        `Notification sent to user ${targetUserId} on socket ${targetSocketId}`
    );
}

/**
 * Bir gönderi beğenildiğinde gönderi sahibine bildirim gönderir.
 * Kullanıcı kendi gönderisini beğenirse bildirim gönderilmez.
 * @param {User} likerUser - Gönderiyi beğenen kullanıcı nesnesi.
 * @param {string} postOwnerId - Beğenilen gönderinin sahibinin ID'si.
 * @param {number} postId - Beğenilen gönderinin ID'si.
 * @returns {void}
 */
export function sendLikeNotification(likerUser, postOwnerId, postId) {
    if (!likerUser || typeof likerUser !== "object" || !likerUser.uid) {
        console.error(
            "Invalid likerUser object provided to sendLikeNotification"
        );
        return;
    }
    if (likerUser.uid === postOwnerId) {
        console.log("User liked their own post. No notification sent.");
        return;
    }

    sendNotification(postOwnerId, {
        type: "like",
        message: `${likerUser.username || "Bir kullanıcı"} gönderini beğendi.`,
        postId: postId,
        likerUsername: likerUser.username || "Bilinmeyen Kullanıcı",
        likerProfilePicture: likerUser.profilePicture, // Varsayılan resim eklenebilir
        timestamp: new Date(),
    });
}

/**
 * Bir kullanıcı başka bir kullanıcıyı takip ettiğinde takip edilen kullanıcıya bildirim gönderir.
 * Kullanıcı kendini takip etmeye çalışırsa bildirim gönderilmez.
 * @param {User} followerUser - Takip eden kullanıcı nesnesi.
 * @param {string} followedUserId - Takip edilen kullanıcının ID'si.
 * @returns {void}
 */
export const sendFollowNotification = (followerUser, followedUserId) => {
    if (
        !followerUser ||
        typeof followerUser !== "object" ||
        !followerUser.uid
    ) {
        console.error(
            "Invalid followerUser object provided to sendFollowNotification"
        );
        return;
    }
    if (followerUser.uid === followedUserId) {
        console.log(
            "User attempted to follow themselves. No notification sent."
        );
        return;
    }
    console.log(
        "Attempting to send follow notification to user:",
        followedUserId
    );
    sendNotification(followedUserId, {
        type: "follow",
        message: `${
            followerUser.username || "Bir kullanıcı"
        } seni takip etmeye başladı.`,
        followerUsername: followerUser.username || "Bilinmeyen Kullanıcı",
        followerProfilePicture: followerUser.profilePicture, // Varsayılan resim eklenebilir
        timestamp: new Date(),
    });
};

/**
 * Bir gönderiye yorum yapıldığında gönderi sahibine bildirim gönderir.
 * Kullanıcı kendi gönderisine yorum yaparsa bildirim gönderilmez.
 * @param {User} commenterUser - Yorum yapan kullanıcı nesnesi.
 * @param {string} postOwnerId - Yorum yapılan gönderinin sahibinin ID'si.
 * @param {number} postId - Yorum yapılan gönderinin ID'si.
 * @returns {void}
 */
export const sendCommentNotification = (commenterUser, postOwnerId, postId) => {
    if (
        !commenterUser ||
        typeof commenterUser !== "object" ||
        !commenterUser.uid
    ) {
        console.error(
            "Invalid commenterUser object provided to sendCommentNotification"
        );
        return;
    }
    if (commenterUser.uid === postOwnerId) {
        console.log("User commented on their own post. No notification sent.");
        return;
    }
    console.log(
        "Attempting to send comment notification to user:",
        postOwnerId
    );
    sendNotification(postOwnerId, {
        type: "comment",
        message: `${
            commenterUser.username || "Bir kullanıcı"
        } gönderine yorum yaptı.`,
        postId: postId,
        commenterUsername: commenterUser.username || "Bilinmeyen Kullanıcı",
        commenterProfilePicture: commenterUser.profilePicture, // Varsayılan resim eklenebilir
        timestamp: new Date(),
    });
};
