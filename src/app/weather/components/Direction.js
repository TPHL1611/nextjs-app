import React, { useContext, useState } from "react";
import { FaArrowsRotate } from "react-icons/fa6";
import AutoCompleteSearch from "./AutoCompleteSearch";
import { WeatherAppContext } from "../page";

export default function Direction({ onPlaceSelect }) {
    const classWrap = "w-2/5 flex bg-[#53c8df] rounded-3xl";
    const classLabel = "px-5 py-2.5";
    const classInput = "h-100 flex-1 pl-4 text-black text-sm";
    const {
        inputValue,
        setInputValue,
        startAddressDirection,
        endAddressDirection,
        setEndAddressDirection,
        setStartAddressDirection,
        setIsDirection,
        setAutoRedirection,
    } = useContext(WeatherAppContext);
    return (
        <div className="flex gap-x-4 mb-4">
            <div className={classWrap}>
                <label htmlFor="start_direction" className={classLabel}>
                    Đi
                </label>
                <AutoCompleteSearch
                    onPlaceSelect={onPlaceSelect}
                    inputValue={startAddressDirection}
                    setInputValue={setStartAddressDirection}
                />
            </div>
            <div
                className="flex items-center justify-center mx-2"
                onClick={() => {
                    setStartAddressDirection(endAddressDirection);
                    setEndAddressDirection(startAddressDirection);
                }}>
                <FaArrowsRotate className="w-4 h-4 text-white" />
            </div>
            <div className={classWrap}>
                <label htmlFor="start_direction" className={classLabel}>
                    Đến
                </label>
                <AutoCompleteSearch
                    onPlaceSelect={onPlaceSelect}
                    inputValue={endAddressDirection}
                    setInputValue={setEndAddressDirection}
                />
            </div>
            <button
                className="flex-1 bg-[#53c8df]  rounded-3xl"
                onClick={() => {
                    setIsDirection(true);
                    setAutoRedirection(true);
                }}>
                Tìm đường
            </button>
        </div>
    );
}
