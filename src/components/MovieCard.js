import RatingBadge from "./RatingBadge";

const TMDB_IMG = (path) =>
    path ? `https://image.tmdb.org/t/p/w500${path}` : "";

export default function MovieCard({ movie, onClick }) {
    const year = movie.release_date?.slice(0, 4) || "—";
    return (
        <button
            onClick={onClick}
            className="group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 text-left transition hover:-translate-y-1 hover:border-neutral-700 hover:shadow-xl hover:shadow-black/40"
        >
            <div className="relative aspect-[2/3] w-full overflow-hidden">
                {movie.poster_path ? (
                    <img
                        src={TMDB_IMG(movie.poster_path)}
                        alt={movie.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-neutral-800 text-neutral-500">
                        No image
                    </div>
                )}
                <div className="absolute left-2 top-2">
                    <RatingBadge score={movie.vote_average} />
                </div>
            </div>
            <div className="p-3">
                <div className="line-clamp-1 text-sm font-medium">{movie.title}</div>
                <div className="mt-1 text-xs text-neutral-400">{year}</div>
            </div>
        </button>
    );
}
