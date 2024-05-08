import React from "react";
import Loading from "./Loading";
export default function Visibility({ currentWeather }) {
    return (
        <>
            <p>Visibility</p>
            {!currentWeather ? (
                <Loading number={2} />
            ) : (
                <div className="flex items-center justify-between">
                    <p>
                        <span className="text-5xl">{currentWeather.visibility / 1000}</span>km
                    </p>
                    <p className="">Haze is affecting visibility</p>
                </div>
            )}
        </>
    );
}
