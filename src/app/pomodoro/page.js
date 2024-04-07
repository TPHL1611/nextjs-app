"use client";

import { About } from "./components/About";
import Alarm from "./components/Alarm";
import { Header } from "./components/Header";
import { Timer } from "./components/Timer";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import Setting from "./components/Setting";
import { twMerge } from "tailwind-merge";

export default function Pomodoro() {
    const audioRef = useRef(null);
    const pomoInputRef = useRef(null);
    const shortInputRef = useRef(null);
    const longInputRef = useRef(null);

    const [pomodoroTime, setPomodoroTime] = useState(25);
    const [shortBreak, setShortBreak] = useState(1);
    const [longBreak, setLongBreak] = useState(10);
    const [seconds, setSeconds] = useState(0);
    const [currentTab, setCurrentTab] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [isTimeUp, setIsTimeUp] = useState(false);
    function showCurrentTabValueInTimer() {
        const currentStage = {
            0: pomodoroTime,
            1: shortBreak,
            2: longBreak,
        };
        return currentStage[currentTab];
    }
    function updateMinutes() {
        const updateStage = {
            0: setPomodoroTime,
            1: setShortBreak,
            2: setLongBreak,
        };
        return updateStage[currentTab];
    }
    function startTimer() {
        const minute = showCurrentTabValueInTimer();
        const setMinute = updateMinutes();
        if (minute === 0 && seconds === 0) {
            setIsTimeUp(true);
            audioRef.current.play();
            resetTimer();
        } else if (seconds === 0) {
            setSeconds(59);
            setMinute(minute - 1);
        } else {
            setSeconds(seconds - 1);
        }
        return null;
    }
    function resetTimer() {
        setPomodoroTime(25);
        setShortBreak(5);
        setLongBreak(10);
        setSeconds(0);
        setIsTimerRunning(false);
        setTimeout(() => {
            setIsTimeUp(false);
        }, audioRef.current.duration * 1000);
    }
    useEffect(() => {
        const timer = setInterval(() => {
            if (isTimerRunning) {
                startTimer();
            }
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, [seconds, pomodoroTime, shortBreak, longBreak, isTimerRunning]);
    // Handle modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleClose = () => setIsModalOpen(false);
    const handleShow = () => setIsModalOpen(true);
    const handleSave = () => {
        setPomodoroTime(pomoInputRef.current.value);
        setShortBreak(shortInputRef.current.value);
        setLongBreak(longInputRef.current.value);
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between py-12 px-24 bg-[#111827]">
            <div className="max-w-[600px] w-full">
                {/* Header */}
                <Header onSettingClick={handleShow} />
                {/* End Header */}
                {/* Body */}
                <Timer
                    currentTab={currentTab}
                    isTimerRunning={isTimerRunning}
                    setIsTimerRunning={setIsTimerRunning}
                    resetTimer={resetTimer}
                    seconds={seconds}
                    setCurrentTab={setCurrentTab}
                    showCurrentTabValueInTimer={showCurrentTabValueInTimer}
                    isTimeUp={isTimeUp}
                    audioRef={audioRef}
                />
                <Alarm ref={audioRef} />
                {/* End Body */}
                <About />
                {/* Modal */}
                <div
                    className={twMerge(
                        "fixed top-0 left-0 bottom-0 right-0 bg-black/[.5] flex items-center justify-center duration-300",
                        isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    )}
                    onClick={() => {
                        setIsModalOpen(false);
                    }}>
                    <div
                        className={twMerge(
                            "bg-white max-w-[500px] rounded-xl p-6 duration-200 text-black",
                            isModalOpen ? "translate-y-4" : "translate-y-0"
                        )}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}>
                        <div className="flex items-center justify-between mb-5 font-mt-bold text-base">
                            <p>Cài đặt</p>
                            <IoClose
                                className="w-6 h-6 cursor-pointer"
                                onClick={() => {
                                    setIsModalOpen(false);
                                }}
                            />
                        </div>
                        <div className="flex gap-x-3">
                            <Setting
                                ref={pomoInputRef}
                                inputID="pomo"
                                valueTime={pomodoroTime}
                                setValueTime={setPomodoroTime}
                            />
                            <Setting
                                ref={shortInputRef}
                                inputID="short"
                                valueTime={shortBreak}
                                setValueTime={setShortBreak}
                            />
                            <Setting
                                ref={longInputRef}
                                inputID="long"
                                valueTime={longBreak}
                                setValueTime={setLongBreak}
                            />
                        </div>
                        <div className="mt-5">
                            <p
                                className="bg-red-400 text-white rounded-[5px] py-2 px-5 w-fit ml-auto cursor-pointer"
                                onClick={() => {
                                    setIsModalOpen(false);
                                    handleSave;
                                }}>
                                Lưu thay đổi
                            </p>
                        </div>
                    </div>
                </div>
                {/* End Modal */}
            </div>
        </main>
    );
}
