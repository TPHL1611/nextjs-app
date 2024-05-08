export default function Loading({ number }) {
    return Array(number)
        .fill(0)
        .map((el, index) => (
            <div
                key={index}
                className="flex flex-col items-center bg-[#1b1c1e] shadow-lg w-full h-full gap-y-2 p-2 rounded">
                <p className="w-full bg-gray-100 h-2 rounded-full animate-pulse"></p>
                <p className="w-full bg-gray-100 h-2 rounded-full animate-pulse"></p>
            </div>
        ));
}
