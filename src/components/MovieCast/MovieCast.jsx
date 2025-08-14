import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api, IMG_BASE_URL } from "../../api";
import styles from "../../components/MovieCast/MovieCast.module.css";

export default function MovieCast() {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        api
            .get(`/movie/${movieId}/credits`)
            .then((res) => setCast(res.data.cast))
            .catch(setError);
    }, [movieId]);

    if (error) return <p>Error loading cast</p>;
    if (!cast.length) return <p>No cast info available</p>;

    return (
        <ul>
            {cast.map((actor) => (
                <li key={actor.id} className={styles.item}>
                    {actor.profile_path && (
                        <img src={`${IMG_BASE_URL}${actor.profile_path}`} alt={actor.name} width={80} className={styles.cast} />
                    )}
                    <p className={styles.details}>{actor.name} as {actor.character}</p>
                </li>
            ))}
        </ul>
    );
}
