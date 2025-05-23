import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [tailwindcss(), react()],
    mode: "development",
    define: {
        "process.env.VITE_CLOUDINARY_CLOUD_NAME":
            process.env.VITE_CLOUDINARY_CLOUD_NAME,
        "process.env.VITE_CLOUDINARY_UPLOAD_PRESET":
            process.envVITE_CLOUDINARY_UPLOAD_PRESET,
    },
});
