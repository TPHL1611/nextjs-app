"use client";
import { usePathname } from "next/navigation";

export function PrefixCommand() {
    const pathname = usePathname();
    return (
        <p className="text-amber-300 mr-1 flex gap-x-2">
            <span>{pathname}</span>
            <span>$</span>
        </p>
    );
}
