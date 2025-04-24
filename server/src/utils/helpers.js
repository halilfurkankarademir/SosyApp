// Sayfalama icin yardimci fonksiyon
export const getPagination = (page, size) => {
    // Limit 1 sayfada kac tane gonderi olacagini tanimlar
    const limit = size ? +size : 10;
    // Offset kacinci gonderiden itibaren gosterilecegini tanimlar
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

// Ip adresinin son 3 hanesini xxx ile degistirir
export const getAnonymizedIp = (ip) => {
    return ip.replace(/\.\d+$/, ".XXX");
};
