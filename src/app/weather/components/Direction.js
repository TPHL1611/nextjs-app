import React, { useContext } from "react";
import { HiOutlineArrowNarrowRight, HiOutlineArrowNarrowLeft } from "react-icons/hi";
import {} from "react-icons/hi";
import AutoCompleteSearch from "./AutoCompleteSearch";
import { WeatherAppContext } from "../page";

export default function Direction({ onPlaceSelect }) {
    const classWrap = "w-[90%] lg:w-[45%] xl:w-2/5 flex bg-[#53c8df] rounded-3xl";
    const classLabel =
        "w-[50px] text-sm flex items-center py-2.5 px-3 md:px-5 md:w-[65px] lg:w-auto lg:pr-2.5";
    const classInput = "h-100 flex-1 pl-4 text-black text-sm xl:h-full";
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
        <div className="flex gap-x-4 md:gap-x-2 gap-y-4 xl:gap-y-0 mb-6 xl:mb-4 flex-wrap justify-between relative">
            <div className={classWrap}>
                <label htmlFor="start_direction" className={classLabel}>
                    Đi
                </label>
                <AutoCompleteSearch
                    onPlaceSelect={onPlaceSelect}
                    inputValue={startAddressDirection}
                    setInputValue={setStartAddressDirection}
                    classInput={classInput}
                />
            </div>
            <div
                className="absolute -right-8 top-6 z-10 w-16 flex flex-col items-center justify-center mx-2 my-3 rotate-90 h-auto rounded-full md:my-0 md:h-[55px] md:-right-5 lg:h-auto lg:w-fit lg:relative lg:rotate-0 lg:-right-0 lg:top-0"
                onClick={() => {
                    setStartAddressDirection(endAddressDirection);
                    setEndAddressDirection(startAddressDirection);
                }}>
                <HiOutlineArrowNarrowRight className="w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4 text-white" />
                <HiOutlineArrowNarrowLeft className="w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4 -mt-2 text-white" />
            </div>
            <div className={classWrap}>
                <label htmlFor="start_direction" className={classLabel}>
                    Đến
                </label>
                <AutoCompleteSearch
                    onPlaceSelect={onPlaceSelect}
                    inputValue={endAddressDirection}
                    setInputValue={setEndAddressDirection}
                    classInput={classInput}
                />
            </div>
            <button
                className="py-3 px-10 bg-[#53c8df] rounded-3xl w-full md:w-auto xl:flex-1 xl:px-4"
                onClick={() => {
                    setIsDirection(true);
                    setAutoRedirection(true);
                }}>
                Tìm đường
            </button>
        </div>
    );
}
