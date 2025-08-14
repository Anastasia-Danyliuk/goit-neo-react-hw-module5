import { useEffect, useState } from "react";
import { api } from "../../api";
import MovieList from "/src/components/MovieList/MovieList.jsx";

export default function HomePage() {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        api
            .get("/trending/movie/day")
            .then((res) => setMovies(res.data.results))
            .catch(setError);
    }, []);

    if (error) return <p>Error loading movies</p>;

    return (
        <main>
            <h1>Trending Today</h1>
            {movies.length > 0 && <MovieList movies={movies} />}
        </main>
    );
}
