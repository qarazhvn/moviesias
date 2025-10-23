export default function SkeletonGrid() {
    return (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
                <div
                    key={i}
                    className="animate-pulse overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900"
                >
                    <div className="aspect-[2/3] w-full bg-neutral-800" />
                    <div className="p-3">
                        <div className="h-4 w-3/4 rounded bg-neutral-800" />
                        <div className="mt-2 h-3 w-1/4 rounded bg-neutral-800" />
                    </div>
                </div>
            ))}
        </div>
    );
}
