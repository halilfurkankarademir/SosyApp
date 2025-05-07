# SosyApp - Modern Sosyal Medya Platformu

![logo](https://github.com/user-attachments/assets/c4a83553-09bb-42b4-8221-8485e57e8889)

## 📋 Proje Hakkında

SosyApp, kullanıcıların gönderi paylaşabildiği, beğeni yapabildiği, yorum ekleyebildiği, diğer kullanıcıları takip edebildiği ve içerikleri kaydedip daha sonra erişebildiği modern bir sosyal medya platformudur.

Bu proje, tam kapsamlı bir sosyal medya deneyimi sunmak için React 19 ve Express.js kullanılarak geliştirilmiştir.

## 🚀 Özellikler

### Kullanıcı Özellikleri

-   **Hesap Yönetimi**

    -   Kayıt olma ve giriş yapma
    -   Profil oluşturma ve düzenleme
    -   Şifre sıfırlama

-   **Sosyal Paylaşım**

    -   Post oluşturma ve paylaşma
    -   Fotoğraf yükleme ve düzenleme
    -   İçerik beğenme ve kaydetme

-   **Sosyal Etkileşim**

    -   Yorum yapabilme ve yanıtlama
    -   Kullanıcıları takip etme/takipten çıkma
    -   Bildirim alma

-   **İçerik Keşfi**

    -   Kullanıcı ve içerik arama
    -   Keşfet sayfası ile yeni içerikler bulma
    -   Önerilen içerikler ve kullanıcılar

-   **Kullanıcı Arayüzü**

    -   Mobil ve masaüstü uyumlu tasarım
    -   Kolay kullanım ve gezinme
    -   Sonsuz kaydırma ile içerik yükleme

-   **Gerçek Zamanlı Özellikler**
    -   Anlık bildirimler
    -   Canlı etkileşim güncellemeleri
    -   Oturum durumu takibi

## 🛠️ Teknoloji Yığını

### Frontend

-   **React 19** - Modern UI geliştirme
-   **Vite 6** - Hızlı geliştirme deneyimi
-   **TailwindCSS 4** - Utility-first CSS framework
-   **Material Tailwind** - UI bileşenleri
-   **React Router DOM 7** - Sayfa yönlendirme
-   **Zustand** - State yönetimi
-   **Socket.io Client** - Gerçek zamanlı iletişim
-   **Axios** - HTTP istekleri
-   **Cloudinary** - Medya yönetimi

### Backend

-   **Express.js** - Web API framework
-   **Sequelize 7** - PostgreSQL ORM
-   **PostgreSQL** - İlişkisel veritabanı
-   **Socket.io** - Gerçek zamanlı iletişim
-   **JWT** - Güvenli kimlik doğrulama
-   **Swagger** - API dokümantasyonu
-   **Winston** - Loglama
-   **Helmet** - Güvenlik başlıkları
-   **Joi** - Veri doğrulama

## 🏗️ Proje Yapısı

```
/
├── client/              # Frontend uygulaması
│   ├── src/             # React kaynak kodları
│   │   ├── api/         # API entegrasyonları
│   │   ├── assets/      # Statik dosyalar
│   │   ├── components/  # React bileşenleri
│   │   ├── config/      # Yapılandırma dosyaları
│   │   ├── constants/   # Sabit değerler
│   │   ├── context/     # React context'leri
│   │   ├── hooks/       # Custom React hooks
│   │   ├── pages/       # Sayfa bileşenleri
│   │   ├── utils/       # Yardımcı fonksiyonlar
│   │   ├── App.jsx      # Ana uygulama bileşeni
│   │   ├── index.css    # Global CSS
│   │   └── main.jsx     # Uygulama giriş noktası
│   ├── public/          # Statik dosyalar
│   └── index.html       # Ana HTML dosyası
│
├── server/              # Backend uygulaması
│   ├── src/             # Express kaynak kodları
│   │   ├── __tests__/   # Test dosyaları
│   │   ├── config/      # Yapılandırma dosyaları
│   │   ├── controllers/ # API kontrolcüleri
│   │   ├── dtos/        # Veri transfer objeleri
│   │   ├── logs/        # Log dosyaları
│   │   ├── middlewares/ # Middleware fonksiyonları
│   │   ├── models/      # Veri modelleri
│   │   ├── repositories/# Veri erişim katmanı
│   │   ├── routes/      # API rotaları
│   │   ├── services/    # İş mantığı servisleri
│   │   ├── utils/       # Yardımcı fonksiyonlar
│   │   ├── app.js       # Express uygulama yapılandırması
│   │   └── server.js    # Sunucu başlatma dosyası
│   └── swagger.js       # Swagger yapılandırması
│
├── .github/             # GitHub yapılandırması
├── .gitignore           # Git tarafından yok sayılacak dosyalar
├── associations.pgerd   # Veritabanı ilişki diyagramı
├── package-lock.json    # Bağımlılık kilitleme dosyası
└── README.md            # Bu dosya
```

## 🚦 Başlangıç

### Ön Koşullar

-   Node.js (v18+)
-   PostgreSQL (v15+)
-   npm veya yarn

### Kurulum

1. Repoyu klonlayın

```bash
git clone https://github.com/yourusername/sosyapp.git
cd sosyapp
```

2. Backend için bağımlılıkları yükleyin ve başlatın

```bash
cd server
npm install
npm run dev
```

3. Frontend için bağımlılıkları yükleyin ve başlatın

```bash
cd ../client
npm install
npm run dev
```

4. Tarayıcınızda şu adresi açın: `http://localhost:5173`

### Ortam Değişkenleri

Backend için `.env` dosyasında aşağıdaki değişkenleri ayarlayın:

```env
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASS=yourpassword
DB_NAME=sosyapp
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Frontend için `.env` dosyasında aşağıdaki değişkenleri ayarlayın:

```env
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

## 📝 API Dokümantasyonu

API dokümantasyonu Swagger UI ile sağlanmaktadır. Backend'i çalıştırdıktan sonra aşağıdaki URL'i ziyaret edin:

```
http://localhost:3000/api-docs
```

## 🧪 Test

```bash
# Backend testleri için
cd server
npm test

# Frontend testleri için
cd client
npm test
```

## 🤝 Katkıda Bulunma

1. Bu depoyu fork edin
2. Feature branch'inizi oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inize push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📜 Lisans

Bu proje MIT lisansı altında lisanslanmıştır - daha fazla bilgi için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

Github: [github.com/yourusername](https://github.com/yourusername)

---

⭐️ Bu projeyi beğendiyseniz, yıldız vermeyi unutmayın! ⭐️
