let ioInstance = null;
let userSocketsRef = {};

// Socket.io verilerini almak icin kullanilacak fonksiyon
export function initializeNotificationService(io, userSockets) {
    ioInstance = io;
    userSocketsRef = userSockets;
    console.log("Notification service initialized!");
}

function sendNotification(targetUserId, data) {
    if (!ioInstance) {
        console.error("Notification service is not initialized!");
        return;
    }
    console.log("Sending notification to user:", targetUserId);
    console.log(userSocketsRef);
    const targetSocketId = userSocketsRef[targetUserId];

    if (!targetSocketId) {
        console.error("Target user not found!");
        return;
    }

    ioInstance.to(targetSocketId).emit("new_notification", data);
    console.log(
        `Notification sent to user ${targetUserId} on socket ${targetSocketId}`
    );
}

export function sendLikeNotification(likerUser, postOwnerId, postId) {
    if (likerUser.uid === postOwnerId) {
        return;
    }

    console.log("Gonderi sahibi", postOwnerId);
    console.log("Begenen kullanıcı", likerUser.uid);

    sendNotification(postOwnerId, {
        type: "like",
        message: `${likerUser.username} gönderini beğendi.`,
        postId: postId,
        likerUsername: likerUser.username,
        likerProfilePicture: likerUser.profilePicture,
        timestamp: new Date(),
    });
}
