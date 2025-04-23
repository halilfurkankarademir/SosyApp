# SosyApp - Modern Sosyal Medya Platformu

![SosyApp Logo](https://github.com/yourusername/sosyapp/raw/main/client/public/logo.png)

## 📋 Proje Hakkında

SosyApp, kullanıcıların gönderi paylaşabildiği, beğeni yapabildiği, yorum ekleyebildiği, diğer kullanıcıları takip edebildiği ve içerikleri kaydedip daha sonra erişebildiği modern bir sosyal medya platformudur.

Bu proje, tam kapsamlı bir sosyal medya deneyimi sunmak için React 19 ve Express.js kullanılarak geliştirilmiştir.

## 🚀 Özellikler

-   👤 Kullanıcı hesabı oluşturma ve yönetme
-   📝 Gönderi paylaşma (metin ve medya)
-   ❤️ Gönderi beğenme ve yorum yapma
-   🔔 Gerçek zamanlı bildirimler
-   👥 Kullanıcıları takip etme
-   🔖 İçerikleri kaydetme
-   🔍 Kullanıcı ve içerik arama
-   📱 Tamamen responsive tasarım

## 🛠️ Teknoloji Yığını

### Frontend

-   **React 19** - Modern UI geliştirme için
-   **Vite 6** - Hızlı geliştirme deneyimi
-   **TailwindCSS 4** - Utility-first CSS framework
-   **React Router DOM 7** - Sayfa yönlendirme
-   **Zustand** - State yönetimi
-   **Socket.io Client** - Gerçek zamanlı iletişim

### Backend

-   **Express.js** - Web API framework
-   **Sequelize 7** - PostgreSQL ORM
-   **PostgreSQL** - İlişkisel veritabanı
-   **Socket.io** - Gerçek zamanlı iletişim
-   **JWT** - Güvenli kimlik doğrulama
-   **Swagger** - API dokümantasyonu

## 🏗️ Proje Yapısı

```
/
├── client/              # Frontend uygulaması
│   ├── src/             # React kaynak kodları
│   │   ├── api/         # API entegrasyonları
│   │   ├── components/  # React bileşenleri
│   │   ├── context/     # React context'leri
│   │   ├── pages/       # Sayfa bileşenleri
│   │   └── utils/       # Yardımcı fonksiyonlar
│   ├── public/          # Statik dosyalar
│   └── index.html       # Ana HTML dosyası
│
├── server/              # Backend uygulaması
│   ├── src/             # Express kaynak kodları
│   │   ├── config/      # Yapılandırma dosyaları
│   │   ├── controllers/ # API kontrolcüleri
│   │   ├── middlewares/ # Middleware fonksiyonları
│   │   ├── models/      # Veri modelleri
│   │   ├── routes/      # API rotaları
│   │   ├── services/    # İş mantığı servisleri
│   │   └── app.js       # Ana uygulama dosyası
│   └── swagger.js       # Swagger yapılandırması
│
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
```

## 📝 API Dokümantasyonu

API dokümantasyonu Swagger UI ile sağlanmaktadır. Backend'i çalıştırdıktan sonra aşağıdaki URL'i ziyaret edin:

```
http://localhost:3000/api-docs
```

## 📖 Veri Modelleri

Proje, ilişkisel veri modelleri üzerine kurulmuştur. Ana modeller şunlardır:

-   **User**: Kullanıcı hesapları
-   **Post**: Kullanıcı gönderileri
-   **Comment**: Gönderi yorumları
-   **Like**: Gönderi beğenileri
-   **Follow**: Takip ilişkileri
-   **Saved**: Kaydedilen gönderiler

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
