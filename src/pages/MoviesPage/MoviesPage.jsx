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
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        const query = searchParams.get("query");
        if (!query) return;

        setLoading(true);
        setError(null);
        setNoResults(false);

        api.get(`/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)
            .then(res => {
                setMovies(res.data.results);
                setNoResults(res.data.results.length === 0);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [searchParams]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchInput.trim()) return;
        setSearchParams({ query: searchInput });
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

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {noResults && <p>No results</p>}

            {!loading && !error && !noResults && <MovieList movies={movies} />}
        </div>
    );
}
