import React from "react";
export default function TodayHighLightItem({ children }) {
    return (
        <div className="w-1/3 px-2">
            <div className="bg-[#1b1c1e] h-full p-2.5 rounded-md flex flex-col gap-y-4">
                {children}
            </div>
        </div>
    );
}
