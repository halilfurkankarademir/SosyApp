export const colors = {
    pink: "#f986f3",
    blue: "#62c8ff",
    purple: "#8c46ff",
    red: "#fe4d4d",
    green: "#30c454",
};

// kayit formu alanlari

export const registerFields = [
    {
        id: "name",
        name: "name",
        type: "text",
        autoComplete: "name",
        required: true,
        placeholder: "Ad",
    },
    {
        id: "surname",
        name: "surname",
        type: "text",
        autoComplete: "family-name",
        required: true,
        placeholder: "Soyad",
    },
    {
        id: "email",
        name: "email",
        type: "email",
        autoComplete: "email",
        required: true,
        placeholder: "E-posta",
    },
    {
        id: "password",
        name: "password",
        type: "password",
        autoComplete: "new-password",
        required: true,
        placeholder: "Şifre",
    },
    {
        id: "confirmPassword",
        name: "confirmPassword",
        type: "password",
        autoComplete: "new-password",
        required: true,
        placeholder: "Şifre Tekrar",
    },
];

// giris formu alanlari

export const loginFields = [
    {
        id: "email",
        name: "email",
        type: "email",
        autoComplete: "email",
        required: true,
        placeholder: "E-posta",
    },
    {
        id: "password",
        name: "password",
        type: "password",
        autoComplete: "current-password",
        required: true,
        placeholder: "Şifre",
    },
];

// kullanici kayit bilgileri form alanlari

export const userInfoFields = [
    {
        id: "username",
        name: "username",
        type: "text",
        required: true,
        placeholder: "Kullanıcı Adı",
        label: "Kullanıcı Adı *",
    },
    {
        id: "about",
        name: "about",
        type: "textarea",
        required: true,
        placeholder: "Kendinden bahset...",
        label: "Hakkında",
    },
    {
        id: "location",
        name: "location",
        type: "text",
        required: false,
        placeholder: "Şehir, Ülke vb.",
        label: "Konum (Opsiyonel)",
    },
];
