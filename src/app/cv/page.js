"use client";
import React from "react";
import { SuggestCommand } from "./components/SuggestCommand";
import { HistoryCommand } from "./components/HistoryCommand";

const CV = React.forwardRef(() => {
    return (
        <div className="flex-1 md:flex-none">
            <SuggestCommand />
            <div className="border border-dashed border-slate-700 mt-5"></div>
            <HistoryCommand />
        </div>
    );
});
CV.displayName = "CV";
export default CV;
