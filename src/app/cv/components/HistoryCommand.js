"use client";
import { useContext } from "react";
import { HistoryContext } from "../layout";
import { PrefixCommand } from "./PrefixCommand";
import { SuggestCommand } from "./SuggestCommand";
import { ProjectList } from "./ProjectList";
import { About } from "./About";
import { Skill } from "./Skill";
import { Functional } from "./Functional";

export function HistoryCommand() {
    const historyCommands = useContext(HistoryContext);
    return (
        <>
            {historyCommands.map((historyCommand) => {
                if (historyCommand.error == "not_supported") {
                    return (
                        <div
                            key={historyCommand.id}
                            className="mt-3 text-xs flex items-center flex-wrap">
                            <PrefixCommand />
                            <span className="ml-2">
                                {historyCommand.command}:{" "}
                                <span className="font-jet-italic">{historyCommand.desc}</span>
                            </span>
                        </div>
                    );
                } else if (historyCommand.error == "show_suggest") {
                    return (
                        <div
                            key={historyCommand.id}
                            className="mt-3 text-xs flex items-center flex-wrap">
                            <PrefixCommand />
                            <span className="ml-2">{historyCommand.command}</span>
                            <div className="mt-4 ml-4 w-full">
                                <SuggestCommand className="mt-4" />
                            </div>
                        </div>
                    );
                } else if (historyCommand.error == "show_project") {
                    return (
                        <div
                            key={historyCommand.id}
                            className="mt-3 text-xs flex items-center flex-wrap">
                            <PrefixCommand />
                            <span className="ml-2">{historyCommand.command}</span>
                            <ProjectList />
                        </div>
                    );
                } else if (historyCommand.error == "show_about") {
                    return (
                        <div
                            key={historyCommand.id}
                            className="mt-3 text-xs flex items-center flex-wrap">
                            <PrefixCommand />
                            <span className="ml-2">{historyCommand.command}</span>
                            <About />
                        </div>
                    );
                } else if (historyCommand.error == "show_skill") {
                    return (
                        <div
                            key={historyCommand.id}
                            className="mt-3 text-xs flex items-center flex-wrap">
                            <PrefixCommand />
                            <span className="ml-2">{historyCommand.command}</span>
                            <Skill />
                        </div>
                    );
                } else if (historyCommand.error == "function") {
                    return (
                        <div
                            key={historyCommand.id}
                            className="mt-3 text-xs flex items-center flex-wrap">
                            <PrefixCommand />
                            <span className="ml-2">{historyCommand.command}</span>
                            <Functional />
                        </div>
                    );
                }
            })}
        </>
    );
}
