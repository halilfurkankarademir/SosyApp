/**
 * Istemcide kullaniciya gostermek uzere gonderilecek hata mesajlari
 */
export const ErrorMessages = {
    USER_NOT_FOUND: "Kullanıcı bulunamadı.",
    USERS_NOT_FOUND: "Kullanıcılar bulunamadı.",
    USER_NOT_FOUND_WITH_USERNAME: "Kullanıcı adına sahip kullanıcı bulunamadı.",
    USER_NOT_FOUND_WITH_EMAIL: "E-posta adresine sahip kullanıcı bulunamadı.",
    USER_UPDATE_FAILED: "Kullanıcı güncellenemedi.",
    USER_CREATION_FAILED: "Kullanıcı oluşturulamadı.",
    USER_DELETION_FAILED: "Kullanıcı silinemedi.",
    EXISTING_USER: "Kullanıcı zaten mevcut.",
    EXISTING_EMAIL: "E-posta zaten mevcut.",
    WRONG_PASSWORD_OR_EMAIL: "E-posta veya şifre yanlış.",
    TOKEN_EXPIRED: "Geçersiz veya süresi dolmuş token.",
    TOKEN_NOT_FOUND: "Token bulunamadı.",
    ACCESS_TOKEN_NEEDED: "Access token gereklidir.",
    REFRESH_TOKEN_NEEDED: "Refresh token gereklidir.",
    USER_ID_NEEDED_FOR_TOKENS: "Token uretimi icin kullanıcı ID gereklidir.",
    POST_SEARCH_ERROR: "Gönderi araması yapılırken bir hata oluştu.",
    USER_SEARCH_ERROR: "Kullanıcı araması yapılırken bir hata oluştu.",
    INVALID_CREDENTIALS: "Hatalı kullanıcı adı veya şifre girdiniz.",
    POST_NOT_FOUND: "Gönderi bulunamadı.",
    EMAIL_ALREADY_EXISTS: "E-posta zaten kullanılıyor.",
    USERNAME_ALREADY_EXISTS: "Kullanıcı adı zaten kullanılıyor.",
    POST_CREATION_FAILED: "Gönderi oluşturulamadı.",
    POST_UPDATE_FAILED: "Gönderi güncellenemedi.",
    POST_DELETION_FAILED: "Gönderi silinemedi.",
    REGISTRATION_FAILED: "Kayıt olunamadı.",
    LOGIN_FAILED: "Giriş yapılırken bir hata oluştu.",
    ERROR_OCCURRED: "Bir hata oluştu.",
    COMMENT_CREATION_FAILED: "Yorum olusturulamadı.",
    COMMENT_NOT_FOUND: "Yorum bulunamadı.",
    COMMENT_UPDATE_FAILED: "Yorum güncellenemedi.",
    COMMENT_DELETION_FAILED: "Yorum silinemedi.",
};

export const verifyMailTemplate = (otpCode) => {
    return `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 10px; border: 1px solid #e0e0e0;">
            <h2 style="color: #2d2d2d;">Sosyapp'a Hoş Geldin!</h2>
            <p style="font-size: 16px; color: #555;">
              Sosyapp hesabını doğrulamak için aşağıdaki doğrulama kodunu kullanabilirsin:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <div style="display: inline-block; background-color: #f3f4f6; padding: 16px 32px; font-size: 28px; font-weight: bold; color: #111827; border-radius: 8px; letter-spacing: 4px; border: 1px dashed #2563eb;">
                ${otpCode}
              </div>
            </div>

            <p style="font-size: 14px; color: #777;">
              Kodun geçerlilik süresi 2 dakikadır. Eğer bu isteği sen yapmadıysan bu e-postayı göz ardı edebilirsin.
            </p>

            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
            <p style="font-size: 12px; color: #999; text-align: center;">
              Bu e-posta <strong>Sosyapp</strong> tarafından otomatik olarak gönderilmiştir. Lütfen yanıtlamayın.
            </p>
          </div>
        `;
};
