import { useEffect, useState, useRef } from "react";
import { useParams, NavLink, Outlet, Link, useLocation } from "react-router-dom";
import { api, IMG_BASE_URL } from "../../api";
import styles from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const location = useLocation();
    const backLink = useRef(location.state?.from || "/movies");

    useEffect(() => {
        api
            .get(`/movie/${movieId}?language=en-US`)
            .then((res) => setMovie(res.data))
            .catch(setError);
    }, [movieId]);

    if (error) return <p>Error loading movie</p>;
    if (!movie) return <p>Loading...</p>;

    return (
        <main>
            <Link to={backLink.current} className={styles.backbtn}>⬅ Go back</Link>
            <h1>{movie.title}</h1>
            {movie.poster_path && (
                <img src={`${IMG_BASE_URL}${movie.poster_path}`} alt={movie.title} width={200} />
            )}
            <p>{movie.overview}</p>
            <p>Genres: {movie.genres.map((g) => g.name).join(", ")}</p>

            <nav>
                <NavLink to="cast">Cast</NavLink> |{" "}
                <NavLink to="reviews">Reviews</NavLink>
            </nav>

            <Outlet />
        </main>
    );
}
