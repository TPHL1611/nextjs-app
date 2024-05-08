import React from "react";
import { IoWaterOutline } from "react-icons/io5";
import Loading from "./Loading";

export default function Humidity({ currentWeather }) {
    return (
        <>
            <p>Humidity</p>
            {!currentWeather ? (
                <Loading number={2} />
            ) : (
                <div className="flex justify-between items-center">
                    <p>
                        <span className="text-5xl">{currentWeather.main.humidity}</span>%
                    </p>
                    <div className="max-w-[50%] text-sm">
                        <IoWaterOutline className="w-4 h-4" />
                        <p>The dew point is 27℃ right now</p>
                    </div>
                </div>
            )}
        </>
    );
}
