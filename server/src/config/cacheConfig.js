// Saniye cinsinden cache saklama sabitleri TTL
const cacheConfig = {
    randomUsers: 60 * 5, // 5 dakika
    allUsers: 60 * 5, // 5 dakika
    trendingPosts: 60 * 10, // 10 dakika
};

export default cacheConfig;
