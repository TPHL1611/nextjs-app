"use client";
import React from "react";
import { SuggestCommand } from "./components/SuggestCommand";
import { HistoryCommand } from "./components/HistoryCommand";

const CV = React.forwardRef(() => {
    return (
        <div>
            <SuggestCommand />
            <div className="border border-dashed border-slate-700 mt-4 mb-4"></div>
            <HistoryCommand />
        </div>
    );
});
CV.displayName = "CV";
export default CV;
