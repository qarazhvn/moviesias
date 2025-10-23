export default function Header() {
    return (
        <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                    <img
                        src="/film-slate.png"
                        alt="Moviesias logo"
                        className="h-8 w-8 rounded-lg object-cover"
                    />
                    <span className="text-lg font-semibold">Moviesias</span>
                </div>
            </div>
        </header>
    );
}
