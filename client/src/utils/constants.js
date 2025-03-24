// Projede veritabani ve backend eklenene kadar fake olarak kullanilacak post bilgileri
export const fakePosts = [
    {
        username: "alice",
        profilePic:
            "https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696896000&semt=ais",
        content: "Bugün doğa yürüyüşü yaptım, harikaydı! 🌳",
        likes: 56,
        comments: 12,
        shares: 8,
        photo: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        createdAt: new Date(
            Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
        ).toISOString(),
    },
    {
        username: "johndoe",
        profilePic:
            "https://i1.sndcdn.com/artworks-gLOzhkPopE3fKUXJ-w3Ldmg-t1080x1080.jpg",
        content: "React öğrenmek gerçekten eğlenceli! 💻",
        likes: 45,
        comments: 5,
        shares: 3,
        photo: null,
        createdAt: new Date(
            Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
        ).toISOString(),
    },
    {
        username: "janedoe",
        profilePic:
            "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696896000&semt=ais",
        content: "Yeni bir projeye başladım, çok heyecanlıyım! 🎉",
        likes: 23,
        comments: 7,
        shares: 4,
        photo: "https://static1.squarespace.com/static/5d8d4da29b902c5fe9fb0d57/5d8d5df99a3b130ef0db9ca9/5d9834848c16fa7ad9bbd3d1/1590314274807/I+am+excited%21%21-4.png?format=1500w",
        createdAt: new Date(
            Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
        ).toISOString(),
    },
    {
        username: "bob",
        profilePic:
            "https://img.freepik.com/free-photo/portrait-young-man-with-dark-curly-hair_176420-23936.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696896000&semt=ais",
        content: "Yeni bir kitap okumaya başladım, tavsiye ederim. 📚",
        likes: 34,
        comments: 6,
        shares: 2,
        photo: null,
        createdAt: new Date(
            Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
        ).toISOString(),
    },
    {
        username: "ayseyilmaz",
        profilePic:
            "https://as2.ftcdn.net/v2/jpg/03/30/25/97/1000_F_330259751_tGPEAq5F5bjxkkliGrb97X2HhtXBDc9x.jpg",
        content: "Bugün yeni bir tarif denedim, harika oldu! 🍰",
        likes: 42,
        comments: 9,
        shares: 5,
        photo: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        createdAt: new Date(
            Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
        ).toISOString(),
    },
    {
        username: "ayseyilmaz",
        profilePic:
            "https://as2.ftcdn.net/v2/jpg/03/30/25/97/1000_F_330259751_tGPEAq5F5bjxkkliGrb97X2HhtXBDc9x.jpg",
        content: "Yoga yapmak ruhumu dinlendiriyor. 🧘‍♀️",
        likes: 38,
        comments: 4,
        shares: 3,
        photo: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80",
        createdAt: new Date(
            Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
        ).toISOString(),
    },
    {
        username: "ayseyilmaz",
        profilePic:
            "https://as2.ftcdn.net/v2/jpg/03/30/25/97/1000_F_330259751_tGPEAq5F5bjxkkliGrb97X2HhtXBDc9x.jpg",
        content: "Yeni bir şehir keşfetmek gibisi yok! 🌍",
        likes: 50,
        comments: 10,
        shares: 6,
        photo: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
        createdAt: new Date(
            Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
        ).toISOString(),
    },
];
// Projede veritabani ve backend eklenene kadar fake olarak kullanilacak insan bilgileri
export const fakePeople = [
    {
        name: "Derya Deniz",
        username: "deryadeniz",
        profilePic:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    },
    {
        name: "John Doe",
        username: "johndoe",
        profilePic:
            "https://i1.sndcdn.com/artworks-gLOzhkPopE3fKUXJ-w3Ldmg-t1080x1080.jpg",
    },
    {
        name: "Jane Doe",
        username: "janedoe",
        profilePic:
            "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696896000&semt=ais",
    },
];
// Projede veritabani ve backend eklenene kadar fake olarak kullanilacak profil bilgileri
export const fakeUserProfile = [
    {
        userId: "5f4d8e7b2a1c3b9e",
        email: "ayse.yilmaz@example.com",
        username: "ayseyilmaz",
        fullName: "Ayşe Yılmaz",
        profilePicture:
            "https://as2.ftcdn.net/v2/jpg/03/30/25/97/1000_F_330259751_tGPEAq5F5bjxkkliGrb97X2HhtXBDc9x.jpg",
        job: "Influencer",
        bio: "Kitap okumayı ve doğa yürüyüşlerini severim. Hayat bir kez yaşanır, tadını çıkarın! 📚🌿",
        followers: ["3a2b1c4d5e6f7g8h", "9i8j7k6l5m4n3o2p"],
        following: ["1q2w3e4r5t6y7u8i", "9o8p7i6u5y4t3r2e"],
        createdAt: "2022-05-15T09:30:00Z",
        postsCount: 10,
        verified: true,
    },
];

// Arkadaşlar için örnek veriler
export const allFriends = [
    {
        id: 1,
        name: "Ahmet Yılmaz",
        username: "ahmet_yilmaz",
        profilePic: "https://randomuser.me/api/portraits/men/22.jpg",
        mutualFriends: 15,
        isOnline: true,
        lastSeen: null,
    },
    {
        id: 2,
        name: "Ayşe Demir",
        username: "ayse_demir",
        profilePic: "https://randomuser.me/api/portraits/women/10.jpg",
        mutualFriends: 8,
        isOnline: false,
        lastSeen: "3 saat önce",
    },
    {
        id: 3,
        name: "Mehmet Kaya",
        username: "mehmet_kaya",
        profilePic: "https://randomuser.me/api/portraits/men/41.jpg",
        mutualFriends: 12,
        isOnline: false,
        lastSeen: "1 gün önce",
    },
    {
        id: 4,
        name: "Zeynep Çelik",
        username: "zeynep_celik",
        profilePic: "https://randomuser.me/api/portraits/women/65.jpg",
        mutualFriends: 21,
        isOnline: true,
        lastSeen: null,
    },
    {
        id: 5,
        name: "Ali Öztürk",
        username: "ali_ozturk",
        profilePic: "https://randomuser.me/api/portraits/men/55.jpg",
        mutualFriends: 4,
        isOnline: true,
        lastSeen: null,
    },
];

// Arkadaş istekleri için örnek veriler
export const friendRequests = [
    {
        id: 6,
        name: "Selin Aktaş",
        username: "selin_aktas",
        profilePic: "https://randomuser.me/api/portraits/women/32.jpg",
        mutualFriends: 6,
        requestDate: "2 gün önce",
    },
    {
        id: 7,
        name: "Burak Güneş",
        username: "burak_gunes",
        profilePic: "https://randomuser.me/api/portraits/men/73.jpg",
        mutualFriends: 9,
        requestDate: "5 gün önce",
    },
];

// Önerilen arkadaşlar için örnek veriler
export const suggestedFriends = [
    {
        id: 8,
        name: "İrem Yıldız",
        username: "irem_yildiz",
        profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
        mutualFriends: 18,
    },
    {
        id: 9,
        name: "Onur Şahin",
        username: "onur_sahin",
        profilePic: "https://randomuser.me/api/portraits/men/11.jpg",
        mutualFriends: 7,
    },
    {
        id: 10,
        name: "Elif Koç",
        username: "elif_koc",
        profilePic: "https://randomuser.me/api/portraits/women/57.jpg",
        mutualFriends: 12,
    },
];

export const fakeNotifications = [
    {
        id: 1,
        type: "follow",
        user: {
            name: "Ahmet Yılmaz",
            username: "@ahmetyilmaz",
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        message: "Seni takip etmeye başladı.",
        timestamp: "2 dakika önce",
    },
    {
        id: 2,
        type: "like",
        user: {
            name: "Ayşe Kaya",
            username: "@aysekaya",
            avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        message: "Gönderini beğendi.",
        timestamp: "10 dakika önce",
    },
    {
        id: 3,
        type: "comment",
        user: {
            name: "Mehmet Demir",
            username: "@mehmetdemir",
            avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        message: "Gönderine yorum yaptı: 'Harika bir paylaşım!'",
        timestamp: "1 saat önce",
    },
    {
        id: 4,
        type: "message",
        user: {
            name: "Zeynep Aktaş",
            username: "@zeynepaktas",
            avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        },
        message: "Sana bir mesaj gönderdi: 'Merhaba, nasılsın?'",
        timestamp: "3 saat önce",
    },
    {
        id: 5,
        type: "follow",
        user: {
            name: "Can Öztürk",
            username: "@canozturk",
            avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        },
        message: "Seni takip etmeye başladı.",
        timestamp: "5 saat önce",
    },
    {
        id: 6,
        type: "like",
        user: {
            name: "Elif Şahin",
            username: "@elifsahin",
            avatar: "https://randomuser.me/api/portraits/women/6.jpg",
        },
        message: "Gönderini beğendi.",
        timestamp: "1 gün önce",
    },
    {
        id: 7,
        type: "comment",
        user: {
            name: "Burak Koç",
            username: "@burakkoc",
            avatar: "https://randomuser.me/api/portraits/men/7.jpg",
        },
        message: "Gönderine yorum yaptı: 'Çok güzel bir fotoğraf!'",
        timestamp: "2 gün önce",
    },
    {
        id: 8,
        type: "message",
        user: {
            name: "Selin Yıldız",
            username: "@selinyildiz",
            avatar: "https://randomuser.me/api/portraits/women/8.jpg",
        },
        message: "Sana bir mesaj gönderdi: 'Toplantı saatini ayarlayalım mı?'",
        timestamp: "3 gün önce",
    },
];

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
        required: false,
        placeholder: "Kendinden bahset...",
        label: "Hakkında",
    },
    {
        id: "profession",
        name: "profession",
        type: "text",
        required: false,
        placeholder: "Meslek",
        label: "Meslek",
    },
    {
        id: "location",
        name: "location",
        type: "text",
        required: false,
        placeholder: "Konum",
        label: "Konum",
    },
    {
        id: "website",
        name: "website",
        type: "url",
        required: false,
        placeholder: "Website",
        label: "Website",
    },
    {
        id: "birthdate",
        name: "birthdate",
        type: "date",
        required: false,
        label: "Doğum Tarihi",
    },
    {
        id: "phone",
        name: "phone",
        type: "tel",
        required: false,
        placeholder: "Telefon",
        label: "Telefon",
    },
];
