"use client";
import React, { useState } from "react";
import { PrefixCommand } from "./PrefixCommand";

const TerminalInput = React.forwardRef((props, ref) => {
    return (
        <div className="mt-2 flex items-center">
            <PrefixCommand />
            <input
                type="text"
                placeholder="Nhập câu lệnh tại đây ... "
                className="bg-transparent border-b border-white md:border-b-0 text-xs ml-1 p-2 outline-none focus:outline-none border-0 flex-1"
                ref={ref}
                value={props.valueCommand}
                onChange={(e) => props.setValueCommand(e.target.value)}
                onKeyUp={(e) => props.handleSubmitCommand(e)}
            />
        </div>
    );
});
TerminalInput.displayName = "TerminalInput";
export default TerminalInput;
