import React, { useContext, useState } from "react";
import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import MapHandler from "./MapHandler";
import Direction from "./Direction";
import { WeatherAppContext } from "../page";

export default function CustomMapControl({ location, onPlaceSelect }) {
    const { selectedPlace, isDirection } = useContext(WeatherAppContext);
    const defaultCenter =
        location?.latitude && location?.longitude
            ? { lat: location?.latitude, lng: location?.longitude }
            : { lat: 12.242923984756745, lng: 109.18205282570901 };

    return (
        <div className="h-100 w-100">
            <Direction onPlaceSelect={onPlaceSelect} />
            <Map
                defaultZoom={14}
                defaultCenter={defaultCenter}
                mapId={"a7fed9fa86696bb2"}
                fullscreenControl={false}
                className="w-100 h-[700px] rounded-2xl">
                {!isDirection ? (
                    <AdvancedMarker
                        position={
                            selectedPlace
                                ? {
                                      lat: selectedPlace?.geometry.location.lat(),
                                      lng: selectedPlace?.geometry.location.lng(),
                                  }
                                : defaultCenter
                        }
                        visible={true}
                    />
                ) : (
                    <></>
                )}
            </Map>
            <MapHandler place={selectedPlace} />
        </div>
    );
}
