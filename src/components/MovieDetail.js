import RatingBadge from "./RatingBadge";

const TMDB_IMG = (path) =>
    path ? `https://image.tmdb.org/t/p/w500${path}` : "";

export default function MovieDetail({ movie }) {
    const runtime = movie.runtime ? `${movie.runtime} min` : "";
    const year = movie.release_date?.slice(0, 4) || "—";
    const genres = movie.genres?.map((g) => g.name).join(" · ") || "";
    const trailer = movie.videos?.results?.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
    );

    return (
        <div className="grid gap-6 p-6 sm:grid-cols-[220px,1fr]">
            <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-800/40">
                {movie.poster_path ? (
                    <img src={TMDB_IMG(movie.poster_path)} alt={movie.title} />
                ) : (
                    <div className="flex aspect-[2/3] items-center justify-center text-neutral-500">
                        No image
                    </div>
                )}
            </div>

            <div>
                <h3 className="text-2xl font-semibold">{movie.title}</h3>
                <div className="mt-1 text-sm text-neutral-400">
                    {year} · {genres} {runtime && `· ${runtime}`}
                </div>
                <div className="mt-3">
                    <RatingBadge score={movie.vote_average} />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-neutral-200">
                    {movie.overview || "No overview."}
                </p>

                {trailer && (
                    <a
                        href={`https://www.youtube.com/watch?v=${trailer.key}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-block rounded-xl bg-orange-500 px-4 py-2 text-sm font-medium text-black hover:bg-orange-400"
                    >
                        Watch trailer
                    </a>
                )}
            </div>
        </div>
    );
}
