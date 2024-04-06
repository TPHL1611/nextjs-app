"use client";
import { twMerge } from "tailwind-merge";
import { IoTerminal } from "react-icons/io5";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Link from "next/link";
import { useState, useRef, createContext, useContext } from "react";
import TerminalHeader from "./components/TerminalHeader";
import TerminalInput from "./components/TerminalInput";
import { commands } from "@/data/terminalCommand";
import { usePathname } from "next/navigation";
import { getErrorDescriptionForCommand } from "@/utils/getErrorDescriptionForCommand";

export const HistoryContext = createContext(null);

export default function CVRootLayout({ children }) {
    const inputRef = useRef(null);

    const [isTerminalClose, setIsTerminalClose] = useState(false);
    const [valueCommand, setValueCommand] = useState("");
    const [historyCommands, setHistoryCommands] = useState([]);

    function handleSubmitCommand(e) {
        if (e.key === "Enter" || e.keyCode === 13) {
            const newCommand = commands.filter((command) => {
                if (command.command_name == valueCommand) {
                    return command.id;
                }
            });
            if (newCommand.length > 0 && newCommand[0].command_name != "cls") {
                window.location.href = `/cv/${newCommand[0].command_name}`;
            } else {
                let errorDesc = getErrorDescriptionForCommand(valueCommand);
                if (errorDesc == "clear_screen") {
                    setHistoryCommands([]);
                } else {
                    setHistoryCommands((prevArr) => [
                        ...prevArr,
                        {
                            id: prevArr.length + 1,
                            command: valueCommand,
                            error: errorDesc,
                            desc: "Cú pháp này không được hỗ trợ!",
                        },
                    ]);
                }
            }
            inputRef.current.scrollIntoView();
            setValueCommand("");
        }
    }

    return (
        <HistoryContext.Provider value={historyCommands}>
            <main className="flex min-h-screen flex-col justify-center bg-[#202020] p-24 relative font-jet-regular">
                <Link
                    href="/"
                    className="w-full text-white flex gap-3 items-center mb-8 max-w-[600px] mx-auto underline underline-offset-8">
                    <FaLongArrowAltLeft />
                    <span>Trang chủ</span>
                </Link>
                <div
                    className={twMerge(
                        "h-full min-h-[500px] max-h-[500px] w-full max-w-[600px] rounded-xl overflow-hidden flex flex-col shadow-2xl shadow-[#ffffff1c] duration-200 mx-auto",
                        isTerminalClose ? "scale-0" : "scale-100"
                    )}>
                    <TerminalHeader
                        ref={inputRef}
                        isTerminalClose={isTerminalClose}
                        setIsTerminalClose={setIsTerminalClose}
                        setValueCommand={setValueCommand}
                    />
                    <div className="terminal--wrap">
                        {children}
                        <div className="mt-6">
                            <TerminalInput
                                ref={inputRef}
                                valueCommand={valueCommand}
                                setValueCommand={setValueCommand}
                                handleSubmitCommand={handleSubmitCommand}
                            />
                        </div>
                    </div>
                </div>
                <IoTerminal
                    className={twMerge(
                        "w-10 h-10 duration-200 absolute l-24 top-1/2 -translate-y-1/2",
                        isTerminalClose ? "scale-100" : "scale-0"
                    )}
                    onDoubleClick={() => setIsTerminalClose(!isTerminalClose)}
                />
            </main>
        </HistoryContext.Provider>
    );
}