import React from "react";
import { convertUnixTimeToLocaleTime } from "@/utils/convertUnixTimeToLocaleTime";
import { GiSunset, GiSunrise } from "react-icons/gi";
import Loading from "./Loading";

export default function SunriseSunset({ currentWeather }) {
    const iconSize = "w-6 h-6";
    return (
        <>
            <p>Sunrise & Sunset</p>
            <div className="chart"></div>
            {!currentWeather ? (
                <Loading number={4} />
            ) : (
                <div className="flex justify-between items-center">
                    <div>
                        <GiSunrise className={iconSize} />
                        <p className="text-[#f6c52d]">Sunrise</p>
                        <p className="uppercase">
                            {convertUnixTimeToLocaleTime(currentWeather.sys.sunrise)}
                        </p>
                    </div>
                    <div>
                        <GiSunset className={iconSize} />
                        <p className="text-[#f6c52d]">Sunset</p>
                        <p className="uppercase">
                            {convertUnixTimeToLocaleTime(currentWeather.sys.sunset)}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
