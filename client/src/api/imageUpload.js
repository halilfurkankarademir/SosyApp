import axios from "axios";

export const imageUpload = async (image) => {
    const formData = new FormData();
    formData.append("file", image); // Cloudinary'de standart "file" kullanılır ("image" değil)
    formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    try {
        const { data } = await axios.post(
            `https://api.cloudinary.com/v1_1/${
                import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
            }/image/upload`, // "/upload" değil, "/image/upload" olmalı
            formData
        );
        return data.secure_url;
    } catch (error) {
        console.error("Image upload error:", error);
        throw error; // Hata yönetimi için hatayı fırlatın
    }
};
