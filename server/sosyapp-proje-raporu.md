# SosyApp - Sosyal Medya Uygulaması Projesi Raporu

## İçindekiler

1. [Giriş](#giriş)
2. [Mimari Yapı](#mimari-yapı)
3. [Veri Tabanı Modelleri](#veri-tabanı-modelleri)
4. [API Endpointleri](#api-endpointleri)
5. [Servisler](#servisler)
6. [Middleware Yapıları](#middleware-yapıları)
7. [Güçlü Yönler](#güçlü-yönler)
8. [Geliştirilebilecek Yönler](#geliştirilebilecek-yönler)
9. [Sonuç](#sonuç)

## Giriş

SosyApp, modern bir sosyal medya platformu olarak tasarlanmış bir web uygulamasıdır. Kullanıcıların hesap oluşturabildiği, gönderi paylaşabildiği, beğeni yapabildiği, yorum ekleyebildiği, diğer kullanıcıları takip edebildiği ve gönderileri kaydedip daha sonra erişebildiği kapsamlı bir sosyal medya deneyimi sunmaktadır.

Proje, Express.js tabanlı bir backend API ve PostgreSQL veritabanı kullanılarak geliştirilmiştir. Sequelize ORM kullanılarak veritabanı işlemleri yönetilmektedir. Ayrıca, Socket.IO entegrasyonu ile gerçek zamanlı bildirimler de desteklenmektedir.

## Mimari Yapı

Proje, MVC (Model-View-Controller) mimarisine benzer bir yaklaşımla yapılandırılmıştır, ancak View katmanı yerine API odaklı bir yapı kullanılmıştır.

### Mimari Bileşenler:

1. **Models**: Veritabanı tabloları ve ilişkileri
2. **Routes**: API endpoint tanımlamaları
3. **Controllers**: İstek işleme ve yanıt döndürme
4. **Services**: İş mantığı ve veri işleme
5. **Middlewares**: Kimlik doğrulama, hata yakalama, rate limiting vb.
6. **DTOs**: Veri transfer nesneleri
7. **Config**: Yapılandırmalar (veritabanı, cors, rate limiter, vb.)

Proje, katmanlı bir mimariye sahiptir ve her katman kendi sorumluluğuna odaklanmaktadır.

## Veri Tabanı Modelleri

Projede, ilişkisel veritabanı mimarisi kullanılmıştır. PostgreSQL veritabanı üzerine Sequelize ORM ile aşağıdaki modeller tanımlanmıştır:

### User Model

```javascript
{
    id: INTEGER (PK, auto-increment),
    uid: UUID (unique),
    role: STRING (default: "user"),
    password: STRING,
    username: STRING (unique),
    email: STRING (unique),
    firstName: STRING,
    lastName: STRING,
    profilePicture: STRING,
    bio: STRING,
    location: STRING,
    verified: BOOLEAN (default: false),
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP
}
```

### Post Model

```javascript
{
    id: INTEGER (PK, auto-increment),
    userId: UUID (FK -> User.uid),
    content: TEXT,
    media: STRING,
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP
}
```

### Comment Model

```javascript
{
    id: INTEGER (PK, auto-increment),
    userId: UUID (FK -> User.uid),
    postId: INTEGER (FK -> Post.id),
    content: TEXT,
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP
}
```

### Like Model

```javascript
{
    id: INTEGER (PK, auto-increment),
    userId: UUID (FK -> User.uid),
    postId: INTEGER (FK -> Post.id),
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP
}
```

### Follow Model

```javascript
{
    id: INTEGER (PK, auto-increment),
    followerId: UUID (FK -> User.uid),
    followingId: UUID (FK -> User.uid),
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP
}
```

### Saved Model

```javascript
{
    id: INTEGER (PK, auto-increment),
    userId: UUID (FK -> User.uid),
    postId: INTEGER (FK -> Post.id),
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP
}
```

### Model İlişkileri

Modeller arasında aşağıdaki ilişkiler tanımlanmıştır:

1. **User-Post İlişkisi (1:N)**: Bir kullanıcı birden fazla gönderi oluşturabilir.
2. **User-Like İlişkisi (1:N)**: Bir kullanıcı birden fazla gönderiyi beğenebilir.
3. **Post-Like İlişkisi (1:N)**: Bir gönderi birden fazla beğeni alabilir.
4. **User-Follow İlişkisi (N:M)**: Kullanıcılar birbirlerini takip edebilir.
5. **User-Comment İlişkisi (1:N)**: Bir kullanıcı birden fazla yorum yapabilir.
6. **Post-Comment İlişkisi (1:N)**: Bir gönderiye birden fazla yorum yapılabilir.
7. **User-Saved İlişkisi (1:N)**: Bir kullanıcı birden fazla gönderiyi kaydedebilir.
8. **Post-Saved İlişkisi (1:N)**: Bir gönderi birden fazla kullanıcı tarafından kaydedilebilir.

## API Endpointleri

Proje, aşağıdaki ana rota gruplarını içermektedir:

### Authentication Endpoints

-   **POST /api/auth/register**: Yeni kullanıcı kaydı.
-   **POST /api/auth/login**: Kullanıcı girişi.
-   **POST /api/auth/logout**: Kullanıcı çıkışı.

### User Endpoints

-   **GET /api/users**: Tüm kullanıcıları getir.
-   **GET /api/users/id/:userId**: ID'ye göre kullanıcı getir.
-   **GET /api/users/username/:username**: Kullanıcı adına göre kullanıcı getir.
-   **GET /api/users/email/:email**: Email'e göre kullanıcı getir.
-   **GET /api/users/current**: Mevcut giriş yapmış kullanıcıyı getir.
-   **GET /api/users/random**: Rastgele 5 kullanıcı önerisi getir.
-   **POST /api/users**: Yeni kullanıcı oluştur.
-   **PUT /api/users**: Mevcut kullanıcı bilgilerini güncelle.
-   **DELETE /api/users/:userId**: Kullanıcı sil.

### Post Endpoints

-   **GET /api/posts**: Tüm gönderileri getir.
-   **GET /api/posts/:postId**: ID'ye göre gönderi getir.
-   **GET /api/posts/user/:userId**: Kullanıcıya ait gönderileri getir.
-   **POST /api/posts**: Yeni gönderi oluştur.
-   **DELETE /api/posts/:postId**: Gönderi sil.

### Like Endpoints

-   **GET /api/likes/post/:postId**: Gönderiye ait tüm beğenileri getir.
-   **GET /api/likes/:postId/check**: Aktif kullanıcının gönderiyi beğenip beğenmediğini kontrol et.
-   **GET /api/likes/user**: Aktif kullanıcının beğendiği gönderileri getir.
-   **POST /api/likes/:postId**: Gönderiyi beğen.
-   **DELETE /api/likes/:postId**: Gönderi beğenisini kaldır.

### Follow Endpoints

-   **GET /api/follows/followers**: Aktif kullanıcının takipçilerini getir.
-   **GET /api/follows/following**: Aktif kullanıcının takip ettiklerini getir.
-   **GET /api/follows/followers/:followingUserId**: Belirli bir kullanıcının takipçilerini getir.
-   **GET /api/follows/following/:followingUserId**: Belirli bir kullanıcının takip ettiklerini getir.
-   **GET /api/follows/check/:followingUserId**: Takip durumunu kontrol et.
-   **POST /api/follows/:userId**: Kullanıcıyı takip et.
-   **DELETE /api/follows/:userId**: Takipten çık.

### Comment Endpoints

-   **GET /api/comments/:postId**: Bir gönderiye ait tüm yorumları getir.
-   **POST /api/comments/:postId**: Gönderiye yorum yap.
-   **DELETE /api/comments/:commentId**: Yorumu sil.

### Saved Endpoints

-   **GET /api/saved**: Kullanıcının kaydettiği gönderileri getir.
-   **GET /api/saved/check/:postId**: Kullanıcının gönderiyi kaydedip kaydetmediğini kontrol et.
-   **POST /api/saved/:postId**: Gönderiyi kaydet.
-   **DELETE /api/saved/:postId**: Gönderiyi kaydetmekten vazgeç.

## Servisler

Projedeki ana servisler şunlardır:

### authService

Kullanıcı kimlik doğrulama, kayıt ve giriş işlemleri.

### userService

Kullanıcı işlemleri, profil görüntüleme, güncelleme, silme.

### postService

Gönderi oluşturma, listeleme, güncelleme, silme.

### likeService

Beğeni işlemleri.

### followService

Takip işlemleri.

### commentService

Yorum işlemleri.

### savedService

Kaydetme işlemleri.

### notificationService

Gerçek zamanlı bildirim işlemleri (Socket.IO ile):

-   Beğeni bildirimleri
-   Takip bildirimleri
-   Yorum bildirimleri

## Middleware Yapıları

Proje, güvenlik ve işlevsellik açısından çeşitli middleware'ler kullanmaktadır:

### authenticateToken

JWT tabanlı kimlik doğrulama. Korumalı rotaları erişim jetonlarıyla güvence altına alır.

### errorHandler

API yanıtlarında hata yakalama ve standartlaştırma.

### rateLimiter

Güvenlik için API isteklerinin sınırlandırılması.

### socketAuth

Socket.IO bağlantılarında kimlik doğrulama.

### corsConfig

Farklı kaynaklardan gelen isteklerin yönetimi.

## Güçlü Yönler

1. **Katmanlı Mimari**: Modüler ve bakımı kolay bir kod yapısı.
2. **JWT Kullanımı**: Güvenli kimlik doğrulama ve yetkilendirme.
3. **Socket.IO Entegrasyonu**: Gerçek zamanlı bildirimler.
4. **DTO Kullanımı**: Verilerin standartlaştırılmış şekilde iletilmesi.
5. **Rate Limiting**: API güvenliği için istek sınırlandırma.
6. **Sequelize ORM**: Veritabanı işlemlerinin kolaylaştırılması ve ilişkilerin yönetimi.
7. **Error Handling**: Kapsamlı hata yakalama ve işleme.
8. **CORS Yapılandırması**: Güvenli çapraz kaynak istekleri.
9. **UUID Kullanımı**: Güvenli ve tahmin edilemeyen kimliklendirme.
10. **Graceful Shutdown**: Sunucu kapanma sürecinde kaynakların düzgün temizlenmesi.

## Geliştirilebilecek Yönler

1. **Test Coverage**: Birim ve entegrasyon testleri eklenebilir.
2. **Dokümantasyon**: API dokümantasyonu (Swagger/OpenAPI) geliştirilebilir.
3. **Performans Optimizasyonu**: Veritabanı sorgularının ve ilişkilerin optimizasyonu.
4. **Loglama Sistemi**: Daha detaylı ve yapılandırılmış loglama sistemi eklenebilir.
5. **Önbellek Mekanizması**: Redis gibi çözümlerle önbellek mekanizması eklenebilir.
6. **Dosya Yönetimi**: Gönderi medyaları için daha kapsamlı bir dosya yönetim sistemi kurulabilir.
7. **Konteynerleştirme**: Docker veya benzeri teknolojilerle konteynerleştirme yapılabilir.
8. **CI/CD Pipeline**: Sürekli entegrasyon ve dağıtım süreci eklenebilir.

## Sonuç

SosyApp, modern sosyal medya uygulamalarının temel özelliklerini karşılayan, sağlam bir mimari yapıya sahip bir projedir. Sequelize ORM ile veritabanı işlemleri, Express.js ile API yönetimi ve Socket.IO ile gerçek zamanlı bildirimler başarıyla entegre edilmiştir.

Proje, MVC benzeri bir mimari yaklaşımı takip ederek, kodun bakımını ve geliştirilmesini kolaylaştırmıştır. Her modül kendi sorumluluğunu yerine getirmektedir ve bağımlılıklar açıkça tanımlanmıştır.

JWT tabanlı kimlik doğrulama, rate limiting ve CORS yapılandırması gibi güvenlik önlemleri de projeye dahil edilmiştir.

Genel olarak, SosyApp projesi, modern web geliştirme pratiklerini uygulayan, ölçeklenebilir ve güvenli bir sosyal medya API backend'i sunmaktadır.
