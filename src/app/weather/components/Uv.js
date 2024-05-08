import React from "react";
import Loading from "./Loading";
export default function Uv({ currentWeather }) {
    if (!currentWeather) {
        return <Loading />;
    }
    return <>UV Component</>;
}
