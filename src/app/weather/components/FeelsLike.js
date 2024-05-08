import React from "react";
import convertKelvinToCelsius from "@/utils/convertKelvinToCelsius";
import { FaTemperatureEmpty } from "react-icons/fa6";
import Loading from "./Loading";

export default function FeelsLike({ currentWeather }) {
    return (
        <>
            <p>Feels Like</p>
            {!currentWeather ? (
                <Loading number={2} />
            ) : (
                <div className="flex justify-between items-center">
                    <p className="flex items-center gap-x-1">
                        <FaTemperatureEmpty className="w-4 h-8" />
                        <span className="text-5xl">
                            {convertKelvinToCelsius(currentWeather.main.feels_like)}℃
                        </span>
                    </p>
                    <p className="max-w-[50%] text-sm">Humidity is making it feel hotter</p>
                </div>
            )}
        </>
    );
}
