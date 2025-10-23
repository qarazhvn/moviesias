import { useEffect } from "react";

export default function Modal({ children, onClose }) {
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose?.();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/70" onClick={onClose} />
            <div className="relative z-10 max-h-[85vh] w-[min(900px,92vw)] overflow-y-auto rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 rounded-lg border border-neutral-700 px-2 py-1 text-sm text-neutral-300 hover:bg-neutral-800"
                >
                    Close
                </button>
                {children}
            </div>
        </div>
    );
}
