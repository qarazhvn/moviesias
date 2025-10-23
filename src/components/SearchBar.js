export default function SearchBar({ value, onChange, onClear, onSubmit }) {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit?.();
            }}
            className="mt-6"
        >
            <div className="relative">
                <input
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder="Search movies…"
                    className="w-full rounded-2xl border border-neutral-800 bg-neutral-900 px-5 py-3 pr-28 text-sm outline-none placeholder:text-neutral-500 focus:border-neutral-700"
                />
                {value && (
                    <button
                        type="button"
                        onClick={onClear}
                        className="absolute right-28 top-1/2 -translate-y-1/2 text-white-400 hover:text-neutral-200"
                    >
                        ✕
                    </button>
                )}
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
                >
                    Search
                </button>

            </div>
        </form>
    );
}
