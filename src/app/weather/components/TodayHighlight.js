import React from "react";
import Wind from "./Wind";
import Uv from "./Uv";
import SunriseSunset from "./SunriseSunset";
import Humidity from "./Humidity";
import Visibility from "./Visibility";
import FeelsLike from "./FeelsLike";
import TodayHighLightItem from "./TodayHighLightItem";

export default function TodayHighlight({ currentWeather, timeDisplay }) {
    return (
        <div className="flex flex-wrap gap-y-4 -mx-3 mt-4">
            <TodayHighLightItem>
                <Wind currentWeather={currentWeather} timeDisplay={timeDisplay} />
            </TodayHighLightItem>
            <TodayHighLightItem>
                <Uv currentWeather={currentWeather} />
            </TodayHighLightItem>
            <TodayHighLightItem>
                <SunriseSunset currentWeather={currentWeather} />
            </TodayHighLightItem>
            <TodayHighLightItem>
                <Humidity currentWeather={currentWeather} />
            </TodayHighLightItem>
            <TodayHighLightItem>
                <Visibility currentWeather={currentWeather} />
            </TodayHighLightItem>
            <TodayHighLightItem>
                <FeelsLike currentWeather={currentWeather} />
            </TodayHighLightItem>
        </div>
    );
}
