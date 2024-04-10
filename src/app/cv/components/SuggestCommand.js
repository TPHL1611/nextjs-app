"use client";
import {
    commandAboutPage,
    commandProjectPage,
    commandSkillPage,
    commands,
    functionProjectPage,
} from "@/data/terminalCommand";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function SuggestCommand() {
    const pathname = usePathname();
    var suggestCommands;
    if (pathname == "/cv/about") {
        suggestCommands = [...commands, commandAboutPage];
    } else if (pathname == "/cv/skill") {
        suggestCommands = [...commands, commandSkillPage];
    } else if (pathname == "/cv/project") {
        suggestCommands = [...commands, commandProjectPage, functionProjectPage];
    } else {
        suggestCommands = commands;
    }
    return (
        <div className="flex flex-col gap-y-1">
            <p className="font-jet-bold text-base mb-1">Danh sách câu lệnh được hỗ trợ</p>
            {suggestCommands.map((command) => (
                <p
                    key={command.id}
                    className={twMerge(
                        "text-sm text-green-400 ml-3",
                        command.id === 1 ? "mt-0" : "mt-1"
                    )}>
                    <span className="min-w-[80px] inline-block">{command.command_name}</span>
                    <span className="mr-10">-</span>
                    <span>{command.command_description}</span>
                </p>
            ))}
        </div>
    );
}
