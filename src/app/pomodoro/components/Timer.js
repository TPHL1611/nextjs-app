import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBellSlash } from "@fortawesome/free-regular-svg-icons";

export function Timer({
    currentTab,
    isTimerRunning,
    setIsTimerRunning,
    resetTimer,
    seconds,
    setCurrentTab,
    showCurrentTabValueInTimer,
    isTimeUp,
    audioRef,
}) {
    const options = ["Pomodoro", "Short break", "Long break"];
    return (
        <div className="flex flex-col items-center mt-14">
            <ul className="flex gap-x-4">
                {options.map((option, index) => (
                    <li
                        key={index}
                        className={twMerge(
                            "text-base p-2 rounded-lg cursor-pointer text-white duration-200",
                            index === currentTab ? "bg-slate-700" : "bg-transparent"
                        )}
                        onClick={() => {
                            if (isTimerRunning) {
                                if (
                                    confirm(
                                        `Bạn muốn đặt lại đồng hồ và chuyển sang ${option} ?`
                                    ) == true
                                ) {
                                    resetTimer();
                                    setCurrentTab(index);
                                }
                            } else {
                                setCurrentTab(index);
                            }
                        }}>
                        {option}
                    </li>
                ))}
            </ul>
            <div className="my-16 text-8xl font-bold text-white">
                {showCurrentTabValueInTimer()}:{seconds.toString().padStart(2, "0")}
            </div>
            <div className="flex items-center justify-center">
                <button
                    className="uppercase text-blue-500 bg-white py-2 px-10 rounded-lg text-xl font-bold duration-200"
                    onClick={() => {
                        setIsTimerRunning(!isTimerRunning);
                    }}>
                    {isTimerRunning ? "Stop" : "Start"}
                </button>
                {isTimeUp && (
                    <FontAwesomeIcon
                        icon={faBellSlash}
                        className="text-white text-xl ml-3 cursor-pointer"
                        onClick={() => audioRef.current.pause()}
                    />
                )}
            </div>
            {isTimerRunning && (
                <p
                    className="text-white mt-3 underline cursor-pointer py-1 px-3"
                    onClick={() => {
                        resetTimer();
                    }}>
                    Reset
                </p>
            )}
        </div>
    );
}
