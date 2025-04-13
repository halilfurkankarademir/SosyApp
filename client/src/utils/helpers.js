//Kullanicinin tam isminden ilk ismini ayirmak icin kullanilan fonksiyon
export const getFirstName = (name) => name.split(" ")[0];
//Bir olayin ne kadar sure once yasandigini ceviren fonksiyon
export const getDateDiff = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    //Timestampi 1000'e bolerek saniye farkini buluyoruz. Ordan da sirayl donusumleri sagliyoruz.
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years} yıl önce`;
    if (months > 0) return `${months} ay önce`;
    if (days > 0) return `${days} gün önce`;
    if (hours > 0) return `${hours} saat önce`;
    if (minutes > 0) return `${minutes} dakika önce`;
    if (seconds > 0) return `${seconds} saniye önce`;
    else return "Şimdi";
};
