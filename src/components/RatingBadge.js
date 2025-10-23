export default function RatingBadge({ score }) {
    const value = Math.round((score || 0) * 10);
    const color =
        value >= 70 ? "bg-green-500" : value >= 50 ? "bg-yellow-400" : "bg-red-500";
    return (
        <div
            className={`flex items-center gap-1 rounded-full ${color} px-2 py-1 text-xs font-semibold text-black`}
        >
            ★ {value}
        </div>
    );
}
