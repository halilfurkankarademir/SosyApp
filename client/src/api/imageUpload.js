import axios from "axios";

export const imageUpload = async (image) => {
    // Yeni bir FormData nesnesi oluşturuyoruz ve gelen fotografi ekliyoruz
    const formData = new FormData();
    formData.append("file", image);
    formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    // Cloudinary API'ye POST isteği gönderiyoruz
    // Bu istek, fotografi yükler ve dönen veriyi alır
    try {
        const { data } = await axios.post(
            `https://api.cloudinary.com/v1_1/${
                import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
            }/image/upload`,
            formData
        );
        // Burada api'den gelen guvenli url'i alıyoruz
        // Bu url, fotografi görüntülemek için kullanılabilir
        return data.secure_url;
    } catch (error) {
        console.error("Image upload error:", error);
        throw error;
    }
};
