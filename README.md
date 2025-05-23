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

-   **Sosyal Paylaşım**

    -   Post oluşturma ve paylaşma
    -   Fotoğraf yükleme
    -   İçerik beğenme ve kaydetme

-   **Sosyal Etkileşim**

    -   Yorum yapabilme
    -   Kullanıcıları takip etme/takipten çıkma
    -   Bildirim alma

-   **İçerik Keşfi**

    -   Kullanıcı ve içerik arama
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
-   **React 19** - Modern UI geliştirme
-   **Vite 6** - Hızlı geliştirme deneyimi
-   **TailwindCSS 4** - Utility-first CSS framework
-   **Material Tailwind** - UI bileşenleri
-   **Material Tailwind** - UI bileşenleri
-   **React Router DOM 7** - Sayfa yönlendirme
-   **Zustand** - State yönetimi
-   **Socket.io Client** - Gerçek zamanlı iletişim
-   **Axios** - HTTP istekleri
-   **Cloudinary** - Medya yönetimi
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
-   **Winston** - Loglama
-   **Helmet** - Güvenlik başlıkları
-   **Joi** - Veri doğrulama
-   **NodeMailer** - E-posta gönderme

## 🏗️ Proje Yapısı

```
/
├── client/              # Frontend uygulaması
│   ├── src/             # React kaynak kodları
│   │   ├── api/         # API entegrasyonları
│   │   ├── assets/      # Statik dosyalar
│   │   ├── assets/      # Statik dosyalar
│   │   ├── components/  # React bileşenleri
│   │   ├── config/      # Yapılandırma dosyaları
│   │   ├── constants/   # Sabit değerler
│   │   ├── config/      # Yapılandırma dosyaları
│   │   ├── constants/   # Sabit değerler
│   │   ├── context/     # React context'leri
│   │   ├── hooks/       # Custom React hooks
│   │   ├── hooks/       # Custom React hooks
│   │   ├── pages/       # Sayfa bileşenleri
│   │   ├── utils/       # Yardımcı fonksiyonlar
│   │   ├── App.jsx      # Ana uygulama bileşeni
│   │   ├── index.css    # Global CSS
│   │   └── main.jsx     # Uygulama giriş noktası
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
│   │   ├── __tests__/   # Test dosyaları
│   │   ├── config/      # Yapılandırma dosyaları
│   │   ├── controllers/ # API kontrolcüleri
│   │   ├── dtos/        # Veri transfer objeleri
│   │   ├── logs/        # Log dosyaları
│   │   ├── dtos/        # Veri transfer objeleri
│   │   ├── logs/        # Log dosyaları
│   │   ├── middlewares/ # Middleware fonksiyonları
│   │   ├── models/      # Veri modelleri
│   │   ├── repositories/# Veri erişim katmanı
│   │   ├── repositories/# Veri erişim katmanı
│   │   ├── routes/      # API rotaları
│   │   ├── services/    # İş mantığı servisleri
│   │   ├── utils/       # Yardımcı fonksiyonlar
│   │   ├── app.js       # Express uygulama yapılandırması
│   │   └── server.js    # Sunucu başlatma dosyası
│   │   ├── utils/       # Yardımcı fonksiyonlar
│   │   ├── app.js       # Express uygulama yapılandırması
│   │   └── server.js    # Sunucu başlatma dosyası
│   └── swagger.js       # Swagger yapılandırması
│
├── .github/             # GitHub yapılandırması
├── .gitignore           # Git tarafından yok sayılacak dosyalar
├── associations.pgerd   # Veritabanı ilişki diyagramı
├── package-lock.json    # Bağımlılık kilitleme dosyası
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
git clone https://github.com/halilfurkankarademir/SosyApp.git
cd SosyApp
```

2. Backend için bağımlılıkları yükleyin ve başlatın

```bash
cd server
npm install
npm start
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
JWT_ACCESS_SECRET = OZEL_BIR_SECRET_KEY
JWT_REFRESH_SECRET = OZEL_BIR_SECRET_KEY
ACCESS_TOKEN_EXPIRY = 2h
REFRESH_TOKEN_EXPIRY = 30d
DB_NAME = PostgreDb veritabani ismi
DB_USER = PostgreDb kullanici adiniz
DB_PASSWORD = PostgreDb kullanici sifresi
DB_HOST = localhost
DB_PORT = 5432
PORT = 3000
NODE_ENV = development
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

## 🤝 Katkıda Bulunma

1. Bu depoyu fork edin
2. Feature branch'inizi oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inize push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📜 Lisans

Bu proje MIT lisansı altında lisanslanmıştır - daha fazla bilgi için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

Github: [github.com/halilfurkankarademir](https://github.com/halilfurkankarademir)

LinkedIn: [linkedin.com/halilfurkankarademir](https://www.linkedin.com/in/halilfurkankarademir)

---

⭐️ Bu projeyi beğendiyseniz, yıldız vermeyi unutmayın! ⭐️
