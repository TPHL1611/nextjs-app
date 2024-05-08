import { iconUrl } from "@/data/constant";
import { dayOfWeekText } from "@/data/dayOfWeekText";
import { monthNames } from "@/data/monthsArrayText";
import convertKelvinToCelsius from "@/utils/convertKelvinToCelsius";
import { getMaxValueArray } from "@/utils/getMaxValueArray";
import { getMinValueArray } from "@/utils/getMinValueArray";
import { leadingZeroNumber } from "@/utils/leadingZeroNumber";
import React, { useState } from "react";
export default function Forecast({ forecast }) {
    const [displayCount, setDisplayCount] = useState(5);
    function extractDateInDateTimeString(dateTimeString) {
        const result = dateTimeString.split(" ")[0];
        return result;
    }
    function splitArrayByDate(arr) {
        const result = {};

        arr.forEach((item) => {
            const date = extractDateInDateTimeString(item.dt_txt); // Extract date from datetime string
            if (!result[date]) {
                result[date] = [];
            }
            result[date].push(item);
        });

        return Object.values(result);
    }
    const handleSelectChange = (e) => {
        setDisplayCount(parseInt(e.target.value));
    };
    const forecastArraySplit = splitArrayByDate(forecast);
    const forecastDayList = [];
    forecastArraySplit.forEach((forecastArray) => {
        const TempHighArray = [];
        forecastArray.forEach((forecastItem) => {
            TempHighArray.push(forecastItem.main.temp_max);
        });
        const TempLowArray = [];
        forecastArray.forEach((forecastItem) => {
            TempLowArray.push(forecastItem.main.temp_min);
        });
        const date = forecastArray[0].dt_txt;
        const forecastDay = {
            temp_high: convertKelvinToCelsius(getMaxValueArray(TempHighArray)),
            temp_low: convertKelvinToCelsius(getMinValueArray(TempLowArray)),
            day_of_week: dayOfWeekText[new Date(date).getDay()],
            date: `${leadingZeroNumber(new Date(date).getDate())} ${
                monthNames[new Date(date).getMonth()]
            }`,
            image_url: `${iconUrl}/${forecastArray[0].weather[0].icon}@2x.png`,
        };
        forecastDayList.push(forecastDay);
    });

    return (
        <>
            <div className="flex justify-between items-center">
                <p>{displayCount} days Forecast</p>
                <select
                    value={displayCount}
                    onChange={handleSelectChange}
                    className="rounded-lg py-1 px-2 bg-slate-800 text-sm cursor-pointer">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                            {num} day
                        </option>
                    ))}
                </select>
            </div>
            <div className="forecast-component-item rounded-2xl p-6 mt-5">
                {forecastDayList.slice(0, displayCount).map((forecastDay, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-x-2 w-1/3">
                            <img src={forecastDay.image_url} alt="" className="w-10 h-10" />
                            <p>
                                <span className="text-lg">{forecastDay.temp_high}&deg;</span>
                                <span className="mx-1">/</span>
                                <span className="text-sm">{forecastDay.temp_low}&deg;</span>
                            </p>
                        </div>
                        <p className="w-1/4 text-center text-sm">{forecastDay.date}</p>
                        <p className="w-1/4">{forecastDay.day_of_week}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
