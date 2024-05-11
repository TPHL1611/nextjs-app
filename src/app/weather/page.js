"use client";
import React, { createContext, useEffect, useState } from "react";
import Today from "./components/Today";
import Forecast from "./components/Forecast";
import { monthNames } from "@/data/monthsArrayText";
import { leadingZeroNumber } from "@/utils/leadingZeroNumber";
import Loading from "./components/Loading";
import { APIProvider } from "@vis.gl/react-google-maps";
import {
    fetchForecast,
    fetchImageCity,
    fetchWeatherLatLng,
    reverseGeocoding,
} from "@/utils/fetchData";
import CustomMapControl from "./components/CustomMapControl";
import { Toaster } from "react-hot-toast";
import { twMerge } from "tailwind-merge";

const WeatherAppContext = createContext(null);
export { WeatherAppContext };

export default function Weather() {
    const [currentWeather, setCurrentWeather] = useState();
    const [backgroundCity, setBackgroundCity] = useState(
        "radial-gradient(ellipse at top, #53c8df82, transparent), radial-gradient(#fe8d6171, transparent)"
    );
    const [forecast, setForecast] = useState();
    const [location, setLocation] = useState();
    const [dateDisplay, setDateDisplay] = useState("");
    const [timeDisplay, setTimeDisplay] = useState("");
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [startAddressDirection, setStartAddressDirection] = useState("");
    const [endAddressDirection, setEndAddressDirection] = useState("");
    const [isDirection, setIsDirection] = useState(false);
    const [autoRedirection, setAutoRedirection] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isShowDirection, setIsShowDirection] = useState(false);
    const valueContext = {
        inputValue,
        setInputValue,
        selectedPlace,
        setSelectedPlace,
        startAddressDirection,
        setStartAddressDirection,
        endAddressDirection,
        setEndAddressDirection,
        isDirection,
        setIsDirection,
        autoRedirection,
        setAutoRedirection,
    };

    //Get current position
    useEffect(() => {
        if ("geolocation" in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setLocation({ latitude, longitude });
            });
        }
    }, []);
    // Fetch weather data
    useEffect(() => {
        if (location) {
            fetchWeatherLatLng(location).then((dataWeatherPosition) => {
                setCurrentWeather(dataWeatherPosition);
            });
            fetchForecast(location).then((dataWeatherForecast) =>
                setForecast(dataWeatherForecast.list)
            );
            reverseGeocoding(location).then((dataAddress) => {
                const invalidResult = ["REQUEST_DENIED", "INVALID_REQUEST"];
                if (invalidResult.includes(dataAddress.status)) {
                    return;
                }
                const longNameCity = dataAddress?.results[0]?.address_components[0].long_name;
                const query = selectedPlace?.name || longNameCity;
                fetchImageCity(query)
                    .then((imageCityUrl) => {
                        setBackgroundCity(`url(${imageCityUrl})`);
                    })
                    .catch((error) => {
                        console.error("Error fetching image:", error);
                    });
            });
        }
    }, [location]);
    // Run clock
    useEffect(() => {
        const timerID = setInterval(() => {
            const currentDate = new Date();
            setDateDisplay(
                `${leadingZeroNumber(currentDate.getDate())} ${
                    monthNames[currentDate.getMonth()]
                }, ${currentDate.getFullYear()}`
            );
            setTimeDisplay(
                `${leadingZeroNumber(currentDate.getHours())}:${leadingZeroNumber(
                    currentDate.getMinutes()
                )}`
            );
        }, 1000);
        return () => {
            clearInterval(timerID);
        };
    }, []);
    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <Toaster position="top-right" />
            <WeatherAppContext.Provider value={valueContext}>
                <div className="p-5 md:p-20 min-h-screen">
                    <div className="container mx-auto">
                        <div className="flex gap-x-3 md:hidden">
                            <button
                                className={twMerge(
                                    "flex flex-1 items-center justify-center border border-white py-2 text-sm rounded-lg duration-300",
                                    !isShowDirection ? "bg-white text-black" : null
                                )}
                                onClick={() => setIsShowDirection(false)}>
                                Thời tiết
                            </button>
                            <button
                                className={twMerge(
                                    "flex flex-1 items-center justify-center border border-white py-2 text-sm rounded-lg duration-300",
                                    isShowDirection ? "bg-white text-black" : null
                                )}
                                onClick={() => setIsShowDirection(true)}>
                                Chỉ đường
                            </button>
                        </div>
                        <div className="mt-5 xl:mt-0 flex flex-wrap">
                            <div
                                className={twMerge(
                                    "w-full xl:w-1/4 md:flex md:flex-wrap gap-x-6 mb-8 xl:mb-0",
                                    !isShowDirection ? "block" : "hidden"
                                )}>
                                <div
                                    className="px-6 py-8 today-component relative rounded-2xl w-full lg:w-3/5 mb-8 lg:mb-0 xl:w-full xl:mb-8"
                                    style={{
                                        backgroundImage: backgroundCity,
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "cover",
                                    }}>
                                    <Today
                                        currentWeather={currentWeather}
                                        dateDisplay={dateDisplay}
                                        timeDisplay={timeDisplay}
                                        setLocation={setLocation}
                                        setBackgroundCity={setBackgroundCity}
                                    />
                                </div>
                                {!forecast ? (
                                    <Loading number={1} />
                                ) : (
                                    <Forecast forecast={forecast} />
                                )}
                            </div>
                            <div
                                className={twMerge(
                                    "w-full xl:w-3/4 md:block xl:pl-5",
                                    isShowDirection ? "block" : "hidden"
                                )}>
                                {location ? (
                                    <CustomMapControl
                                        location={location}
                                        selectedPlace={selectedPlace}
                                        onPlaceSelect={setSelectedPlace}
                                    />
                                ) : (
                                    <Loading />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </WeatherAppContext.Provider>
        </APIProvider>
    );
}
