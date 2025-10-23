export default function Pagination({ page, totalPages, onPrev, onNext }) {
    return (
        <div className="flex items-center gap-3 text-sm text-neutral-300">
            <button
                onClick={onPrev}
                disabled={page <= 1}
                className="rounded-xl border border-neutral-800 px-3 py-1.5 disabled:opacity-40"
            >
                Prev
            </button>
            <span className="tabular-nums">
        {page} / {totalPages}
      </span>
            <button
                onClick={onNext}
                disabled={page >= totalPages}
                className="rounded-xl border border-neutral-800 px-3 py-1.5 disabled:opacity-40"
            >
                Next
            </button>
        </div>
    );
}
