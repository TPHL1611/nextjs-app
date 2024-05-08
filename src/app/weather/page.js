"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
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
import toast, { Toaster } from "react-hot-toast";

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
                <div className="p-20 min-h-screen">
                    <div className="container mx-auto">
                        <div className="flex gap-x-5">
                            <div className="w-1/4">
                                <div
                                    className="px-6 py-8 today-component relative rounded-2xl mb-8"
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
                            <div className="w-3/4">
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
