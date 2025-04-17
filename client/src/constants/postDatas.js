import { FaHeart, FaComment, FaBookmark, FaShare } from "react-icons/fa";
export const postCartDatas = [
    {
        icon: FaHeart,
        text: "Beğen",
        action: (likeStatus) => !likeStatus, // Toggle like status
    },
    {
        icon: FaComment,
        text: "Yorum Yap",
        action: () => navigateToPage(`/post/${id}`),
    },
    {
        icon: FaShare,
        text: "Paylaş",
        action: () => console.log("Paylaş butonuna tıklandı"),
    },
    {
        icon: FaBookmark,
        text: "Kaydet",
        action: () => console.log("Kaydet butonuna tıklandı"),
    },
];
