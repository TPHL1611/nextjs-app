import Tippy from "@tippyjs/react";
import "tippy.js/themes/light.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { FaRegQuestionCircle } from "react-icons/fa";
import React from "react";

const TerminalHeader = React.forwardRef((props, ref) => {
    return (
        <div className="bg-[#373737] flex items-center justify-between py-3 px-4">
            <div className="flex gap-2">
                <div
                    className="w-3 h-3 rounded-full bg-[#ff5f5a]"
                    onClick={() => {
                        props.setIsTerminalClose(!props.isTerminalClose);
                    }}></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbe2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#2aca44]"></div>
            </div>
            <Tippy content="Type 'help' to show valid command" theme="light" className="text-sm">
                <div
                    onClick={() => {
                        props.setValueCommand("help");
                        ref.current.focus();
                    }}>
                    <FaRegQuestionCircle />
                </div>
            </Tippy>
        </div>
    );
});
export default TerminalHeader;
