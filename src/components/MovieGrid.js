import MovieCard from "./MovieCard";

export default function MovieGrid({ movies, onClickCard }) {
    if (!movies?.length)
        return <div className="mt-10 text-neutral-400">No movies found.</div>;

    return (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {movies.map((m) => (
                <MovieCard key={m.id} movie={m} onClick={() => onClickCard?.(m.id)} />
            ))}
        </div>
    );
}
