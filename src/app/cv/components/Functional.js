import { functions } from "@/data/functions";
import React from "react";
export function Functional() {
    return (
        <ol className="pl-[5px] md:pl-5 ml-5">
            {functions.map((functional) => (
                <li key={functional.id} className="list-decimal mt-4">
                    <p className="text-sm">{functional.function_name}</p>
                </li>
            ))}
        </ol>
    );
}
