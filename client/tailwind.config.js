/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            screens: {
                xs: "480px", // Ekstra küçük ekranlar için
                sm: "640px", // Küçük ekranlar için (varsayılan)
                md: "768px", // Orta ekranlar için (varsayılan)
                lg: "1024px", // Büyük ekranlar için (varsayılan)
                xl: "1280px", // Ekstra büyük ekranlar için (varsayılan)
                "2xl": "1536px", // 2X ekstra büyük ekranlar için (varsayılan)
            },
            keyframes: {
                fadeSlideIn: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                mobileMenuEnter: {
                    "0%": { transform: "translateX(100%)" },
                    "100%": { transform: "translateX(0)" },
                },
                mobileMenuExit: {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(100%)" },
                },
            },
            animation: {
                fadeSlideIn: "fadeSlideIn 0.5s ease-out forwards",
                mobileMenuEnter: "mobileMenuEnter 0.3s ease-out forwards",
                mobileMenuExit: "mobileMenuExit 0.3s ease-out forwards",
            },
        },
    },
    plugins: [],
};
