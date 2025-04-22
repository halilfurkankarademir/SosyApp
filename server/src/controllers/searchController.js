import searchService from "../services/searchService.js";

const searchController = {
    searchUsers: async (req, res) => {
        const { query } = req.query;
        const users = await searchService.searchUsers(query);
        if (!users) {
            return res.status(404).json({ error: "Search results not found" });
        }
        res.status(200).json(users);
    },

    searchPosts: async (req, res) => {
        const { query } = req.query;
        const posts = await searchService.searchPosts(query);
        if (!posts) {
            return res.status(404).json({ error: "Search results not found" });
        }
        res.status(200).json(posts);
    },
};

export default searchController;
