import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import api from "../../api";
import styles from "../../pages/MoviesPage/MoviesPage.module.css";


export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchInput, setSearchInput] = useState(searchParams.get("query") || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchInput) return;

        setSearchParams({ query: searchInput }); // оновлюємо URL
        api.get(`/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=1`)
            .then(res => setMovies(res.data.results))
            .catch(err => setError(err.message));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search movies..."
                    className={styles.search}
                />
                <button type="submit">Search</button>
            </form>

            {error && <p>{error}</p>}
            <MovieList movies={movies} />
        </div>
    );
}
