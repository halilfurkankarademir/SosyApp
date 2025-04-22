let ioInstance = null;
let userSocketsRef = {};

// Socket.io verilerini almak icin kullanilacak fonksiyon
export function initializeNotificationService(io, userSockets) {
    ioInstance = io;
    userSocketsRef = userSockets;
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

    sendNotification(postOwnerId, {
        type: "like",
        message: `${likerUser.username} gönderini beğendi.`,
        postId: postId,
        likerUsername: likerUser.username,
        likerProfilePicture: likerUser.profilePicture,
        timestamp: new Date(),
    });
}

export const sendFollowNotification = (followerUser, followedUserId) => {
    if (followerUser.uid === followedUserId) {
        return;
    }
    console.log("Sending follow notification to user:", followedUserId);
    sendNotification(followedUserId, {
        type: "follow",
        message: `${followerUser.username} seni takip etmeye başladı.`,
        followerUsername: followerUser.username,
        followerProfilePicture: followerUser.profilePicture,
        timestamp: new Date(),
    });
};

export const sendCommentNotification = (commenterUser, postOwnerId, postId) => {
    console.log(commenterUser);
    console.log(postOwnerId);
    if (commenterUser.uid === postOwnerId) {
        console.log("Commenter and post owner are the same!");
        return;
    }
    console.log("Sending comment notification to user:", postOwnerId);
    sendNotification(postOwnerId, {
        type: "comment",
        message: `${commenterUser.username} gönderine yorum yaptı.`,
        postId: postId,
        commenterUsername: commenterUser.username,
        commenterProfilePicture: commenterUser.profilePicture,
        timestamp: new Date(),
    });
};
