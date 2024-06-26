"use client";
import { twMerge } from "tailwind-merge";
import { IoTerminal } from "react-icons/io5";
import { useState, useRef, createContext } from "react";
import TerminalHeader from "./components/TerminalHeader";
import TerminalInput from "./components/TerminalInput";
import { commands } from "@/data/terminalCommand";
import { useRouter } from "next/navigation";
import { getErrorDescriptionForCommand } from "@/utils/getErrorDescriptionForCommand";
import Div100vh from "react-div-100vh";

export const HistoryContext = createContext(null);

export default function CVRootLayout({ children }) {
    const inputRef = useRef(null);
    const router = useRouter();

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
                router.push(`/cv/${newCommand[0].command_name}`);
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
            setValueCommand("");
            inputRef.current.scrollIntoView();
        }
    }

    return (
        <HistoryContext.Provider value={historyCommands}>
            <Div100vh>
                <main className="h-full flex flex-col justify-center bg-[#202020] p-0 md:p-24 relative font-jet-regular">
                    <div
                        className={twMerge(
                            "h-full md:min-h-[500px] md:max-h-[500px] w-full max-w-[600px] rounded-none md:rounded-xl overflow-hidden flex flex-1 md:flex-none flex-col shadow-2xl shadow-[#ffffff1c] duration-200 mx-auto",
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
                            <div className="mt-3">
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
                            "w-10 h-10 duration-200 absolute md:l-24 left-1/2 top-1/2 -translate-x-1/2 md:-translate-x-1/2 -translate-y-1/2",
                            isTerminalClose ? "scale-100" : "scale-0"
                        )}
                        onDoubleClick={() => {
                            setIsTerminalClose(!isTerminalClose);
                            setHistoryCommands([]);
                        }}
                    />
                </main>
            </Div100vh>
        </HistoryContext.Provider>
    );
}
