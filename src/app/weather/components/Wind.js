import React from "react";
import Loading from "./Loading";
export default function Wind({ currentWeather, timeDisplay }) {
    return (
        <>
            <p>Wind Status</p>
            <div className="chart"></div>
            {!currentWeather ? (
                <Loading number={3} />
            ) : (
                <div className="flex items-center justify-between">
                    <p>{currentWeather.wind.speed}km/h</p>
                    <p>{timeDisplay}</p>
                </div>
            )}
        </>
    );
}
