"use client";

import { About } from "./components/About";
import Alarm from "./components/Alarm";
import { Header } from "./components/Header";
import { Timer } from "./components/Timer";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";

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
                <Modal show={isModalOpen} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Cài đặt</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="flex justify-between gap-4">
                        <div className="flex flex-col items-center">
                            <label htmlFor="pomo">Thời gian</label>
                            <input
                                id="pomo"
                                type="number"
                                className="w-full text-center border border-slate-950 rounded-[5px] mt-1 py-1 px-3"
                                ref={pomoInputRef}
                                min="0"
                                value={pomodoroTime}
                                onChange={(e) => setPomodoroTime(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <label htmlFor="short">Quãng nghỉ ngắn</label>
                            <input
                                id="short"
                                type="number"
                                className="w-full text-center border border-slate-950 rounded-[5px] mt-1 py-1 px-3"
                                ref={shortInputRef}
                                min="0"
                                value={shortBreak}
                                onChange={(e) => setShortBreak(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <label htmlFor="long">Quãng nghỉ dài</label>
                            <input
                                id="long"
                                type="number"
                                className="w-full text-center border border-slate-950 rounded-[5px] mt-1 py-1 px-3"
                                ref={longInputRef}
                                min="0"
                                value={longBreak}
                                onChange={(e) => setLongBreak(e.target.value)}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => {
                                handleClose(), handleSave();
                            }}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* End Modal */}
            </div>
        </main>
    );
}
