import { useEffect, useState, useMemo } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import Pagination from "./components/Pagination";
import Modal from "./components/Modal";
import MovieDetail from "./components/MovieDetail";
import SkeletonGrid from "./components/SkeletonGrid";

const TMDB = {
    trending: (page = 1) =>
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_KEY}&page=${page}`,
    search: (q, page = 1) =>
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&query=${encodeURIComponent(
            q
        )}&include_adult=false&language=en-US&page=${page}`,
    details: (id) =>
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&append_to_response=videos,credits`,
};

export default function App() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [selected, setSelected] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);

    useEffect(() => {
        let alive = true;
        const run = async () => {
            setLoading(true);
            setError("");
            try {
                const url = query.trim()
                    ? TMDB.search(query.trim(), page)
                    : TMDB.trending(page);
                const res = await fetch(url);
                if (!res.ok) throw new Error("Failed to fetch movies");
                const data = await res.json();
                if (!alive) return;
                setMovies(data.results || []);
                setTotalPages(Math.max(1, Math.min(500, data.total_pages || 1)));
            } catch (e) {
                if (!alive) return;
                setError(e.message || "Unknown error");
            } finally {
                if (alive) setLoading(false);
            }
        };
        run();
        return () => {
            alive = false;
        };
    }, [query, page]);

    useEffect(() => {
        if (!selectedId) return;
        let alive = true;
        const run = async () => {
            setModalLoading(true);
            try {
                const res = await fetch(TMDB.details(selectedId));
                if (!res.ok) throw new Error("Failed to fetch details");
                const data = await res.json();
                if (!alive) return;
                setSelected(data);
            } catch (e) {
                if (!alive) return;
                setSelected({ error: e.message });
            } finally {
                if (alive) setModalLoading(false);
            }
        };
        run();
        return () => {
            alive = false;
        };
    }, [selectedId]);

    const title = useMemo(
        () => (query.trim() ? `Search: “${query.trim()}”` : "Trending now"),
        [query]
    );

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100">
            <Header />
            <main className="mx-auto max-w-7xl px-4 pb-16">
                <SearchBar
                    value={query}
                    onChange={(v) => {
                        setPage(1);
                        setQuery(v);
                    }}
                    onClear={() => {
                        setQuery("");
                        setPage(1);
                    }}
                    onSubmit={() => setPage(1)}
                />

                <section className="mt-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onPrev={() => setPage((p) => Math.max(1, p - 1))}
                        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
                    />
                </section>

                {loading && <SkeletonGrid />}
                {!loading && error && (
                    <div className="mt-10 rounded-2xl border border-red-500/20 bg-red-950/20 p-4 text-red-300">
                        {error}
                    </div>
                )}
                {!loading && !error && (
                    <MovieGrid movies={movies} onClickCard={(id) => setSelectedId(id)} />
                )}

                {selectedId && (
                    <Modal
                        onClose={() => {
                            setSelectedId(null);
                            setSelected(null);
                        }}
                    >
                        {modalLoading && <div className="p-6">Loading…</div>}
                        {!modalLoading && selected && !selected.error && (
                            <MovieDetail movie={selected} />
                        )}
                        {!modalLoading && selected && selected.error && (
                            <div className="p-6 text-red-300">{selected.error}</div>
                        )}
                    </Modal>
                )}
            </main>
        </div>
    );
}
