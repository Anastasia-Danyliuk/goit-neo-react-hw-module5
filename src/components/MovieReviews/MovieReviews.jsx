import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api";

export default function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        api
            .get(`/movie/${movieId}/reviews`)
            .then((res) => setReviews(res.data.results))
            .catch(setError);
    }, [movieId]);

    if (error) return <p>Error loading reviews</p>;
    if (!reviews.length) return <p>No reviews available</p>;

    return (
        <ul>
            {reviews.map((r) => (
                <li key={r.id}>
                    <h4>{r.author}</h4>
                    <p>{r.content}</p>
                </li>
            ))}
        </ul>
    );
}
