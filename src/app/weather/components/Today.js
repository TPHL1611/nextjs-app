"use client";
import React, { useContext, useState } from "react";
import convertKelvinToCelsius from "@/utils/convertKelvinToCelsius";
import { RxCalendar } from "react-icons/rx";
import { GrLocation } from "react-icons/gr";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import { iconUrl } from "@/data/constant";
import { CiSearch } from "react-icons/ci";
import Loading from "./Loading";
import AutoCompleteSearch from "./AutoCompleteSearch";
import Image from "next/image";
import { WeatherAppContext } from "../page";

export default function Today({
    currentWeather,
    timeDisplay,
    dateDisplay,
    setBackgroundCity,
    setLocation,
}) {
    const imgSrc = currentWeather ? `${iconUrl}/${currentWeather.weather[0].icon}@4x.png` : "";
    const [searchPositionInputValue, setSearchPositionInputValue] = useState("");
    const { setSelectedPlace } = useContext(WeatherAppContext);
    return (
        <>
            {!currentWeather ? (
                <Loading number={5} />
            ) : (
                <div className="flex flex-col relative justify-between">
                    <div className="flex relative">
                        <AutoCompleteSearch
                            onPlaceSelect={setSelectedPlace}
                            setLocation={setLocation}
                            setBackgroundCity={setBackgroundCity}
                            isSetLocationAndFetchImageCity={true}
                            inputValue={searchPositionInputValue}
                            setInputValue={setSearchPositionInputValue}
                            classInput="pr-12"
                        />
                        <CiSearch className="w-5 h-5 absolute top-1/2 right-5 -translate-y-1/2 text-black" />
                    </div>
                    <div>
                        <Image src={imgSrc} alt="" width={112} height={112} />
                        <p className="text-6xl">
                            {convertKelvinToCelsius(currentWeather.main.temp)}℃
                        </p>
                        <div className="flex items-center gap-x-4 mt-4">
                            <Image
                                src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
                                alt=""
                                width={40}
                                height={40}
                            />
                            <p>{capitalizeFirstLetter(currentWeather.weather[0].description)}</p>
                        </div>
                        <div className="flex items-center gap-x-2 mt-3 pt-3 border-t border-white/[.4] text-sm">
                            <GrLocation />
                            <p>
                                <span>{currentWeather.name}</span>
                                <span>,{currentWeather.sys.country}</span>
                            </p>
                        </div>
                        <div className="flex gap-x-2 items-center text-sm mt-3">
                            <RxCalendar />
                            <p>{`${dateDisplay} ${timeDisplay}`}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
