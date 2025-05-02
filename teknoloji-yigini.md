# SosyApp Projesi Teknoloji Yığınları

Bu belge, SosyApp projesinde kullanılan teknoloji yığınlarını ve yazılım kütüphanelerini listeler.

## Backend (Server) Teknoloji Yığını

### Temel Teknolojiler

-   **Node.js**: JavaScript çalışma ortamı
-   **Express.js**: Web uygulama çerçevesi
-   **PostgreSQL**: İlişkisel veritabanı

### ORM ve Veritabanı

-   **Sequelize/SequelizeORM**: PostgreSQL ile entegrasyon için ORM (Object Relational Mapping)
-   **@sequelize/core**: Sequelize çekirdek kütüphanesi
-   **@sequelize/postgres**: PostgreSQL diyalekti
-   **pg** ve **pg-hstore**: PostgreSQL bağlantı adaptörleri

### Kimlik Doğrulama ve Güvenlik

-   **jsonwebtoken (JWT)**: Token tabanlı kimlik doğrulama
-   **bcrypt**: Şifre hashleme
-   **helmet**: HTTP güvenlik başlıklarını ayarlamak için
-   **cors**: Cross-Origin Resource Sharing politikaları
-   **express-rate-limit**: Rate limiting (istek sınırlaması)
-   **cookie-parser**: Cookie işleme

### Gerçek Zamanlı İletişim

-   **Socket.io**: Gerçek zamanlı, çift yönlü iletişim

### Doğrulama ve Veri İşleme

-   **joi**: Şema doğrulama

### Loglama ve Hata Yönetimi

-   **winston**: Yapılandırılabilir loglama

### API Dokümantasyonu

-   **swagger-ui-express**: Swagger UI
-   **swagger-autogen**: Swagger dokümantasyonu oluşturma

### Depolama ve Servisler

-   **firebase** ve **firebase-admin**: Firebase servisleri entegrasyonu
-   **@google/genai**: Google AI servisleri için

### Geliştirme Araçları

-   **nodemon**: Canlı geliştirme sunucusu
-   **dotenv**: Ortam değişkenleri yönetimi
-   **jest**: Test çerçevesi
-   **supertest**: HTTP testleri için

## Frontend (Client) Teknoloji Yığını

### Temel Teknolojiler

-   **React 19**: UI kütüphanesi
-   **Vite**: Hızlı geliştirme ortamı ve bundler

### Styling ve UI Bileşenleri

-   **Tailwind CSS 4**: Utility-first CSS çerçevesi
-   **@material-tailwind/react**: Material Design bileşenleri (Tailwind CSS üzerine)
-   **@heroui/react**: UI bileşen kütüphanesi
-   **react-icons**: Icon kütüphanesi

### Durum Yönetimi

-   **zustand**: Hafif durum yönetimi kütüphanesi

### Routing

-   **react-router-dom**: Sayfa yönlendirme

### HTTP İstekleri

-   **axios**: API istekleri için HTTP client

### Gerçek Zamanlı İletişim

-   **socket.io-client**: Socket.IO client implementasyonu

### Form ve Veri İşleme

-   **react-image-file-resizer**: Görüntü boyutlandırma
-   **use-debounce**: Debounce işlevselliği
-   **lodash**: Utilite fonksiyonları

### Sonsuz Kaydırma ve Görsel İşleme

-   **react-infinite-scroll-component**: Sonsuz kaydırma
-   **react-lazy-load-image-component**: Lazy loading görseller
-   **@cloudinary/react** ve **@cloudinary/url-gen**: Cloudinary entegrasyonu

### UI/UX Geliştirmeleri

-   **react-hot-toast**: Bildirim toast'ları
-   **react-modal**: Modal pencereler

### Geliştirme Araçları

-   **ESLint**: Kod kalitesi ve standartlar
-   **vitest**: Test çerçevesi
-   **playwright**: E2E test
-   **TypeScript Desteği**: @types/\* paketleriyle TypeScript tip tanımları
-   **dotenv**: Ortam değişkenleri yönetimi

## DevOps ve Dağıtım

-   **vercel.json**: Vercel üzerinde dağıtım yapılandırması

## Mimari Yaklaşım

### Backend

-   **Model-View-Controller (MVC)** mimari deseni
-   **Repository** deseni veri erişimi için
-   **Middleware** yapısı istekleri işlemek için
-   **Service** katmanı iş mantığı için
-   **DTO (Data Transfer Object)** deseni veri transferi için

### Frontend

-   **Component-based** mimari
-   **Context API** ile durum yönetimi
-   **Custom Hooks** ile mantık ayırımı
-   **Lazy Loading** ile performans optimizasyonu
