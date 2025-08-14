import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
});

export default api;
export const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
