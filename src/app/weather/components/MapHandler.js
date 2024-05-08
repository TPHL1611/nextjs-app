import React, { useContext, useEffect, useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { WeatherAppContext } from "../page";
import toast from "react-hot-toast";

function MapHandler({ place }) {
    const map = useMap();
    const routesLibrary = useMapsLibrary("routes");
    const [directionsService, setDirectionsService] = useState();
    const [directionsRenderer, setDirectionsRenderer] = useState();
    const [routes, setRoutes] = useState([]);
    const { isDirection, startAddressDirection, endAddressDirection } =
        useContext(WeatherAppContext);

    // Initialize directions service and renderer
    useEffect(() => {
        if (!routesLibrary || !map || !place) return;

        if (!isDirection) {
            if (place?.geometry?.viewport) {
                map.setCenter({
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                });
                map.setZoom(14);
            }
        }

        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
    }, [isDirection, routesLibrary, map, place]);

    // Use directions service
    useEffect(() => {
        if (!directionsService || !directionsRenderer) return;

        if (isDirection) {
            directionsService.route(
                {
                    origin: startAddressDirection || "",
                    destination: endAddressDirection || "",
                    travelMode: google.maps.TravelMode.DRIVING,
                    provideRouteAlternatives: true,
                },
                (DirectionsResult, DirectionsStatus) => {
                    if (DirectionsStatus === "ZERO_RESULTS") {
                        toast.error("No route found between the origin and destination");
                    }
                    if (DirectionsStatus == "OK") {
                        directionsRenderer.setDirections(DirectionsResult);
                        setRoutes(DirectionsResult.routes);
                    }
                }
            );
        }

        return () => {
            if (!isDirection) return directionsRenderer.setMap(null);
            if (isDirection && (!endAddressDirection || !startAddressDirection))
                return directionsRenderer.setMap(null);
        };
    }, [
        isDirection,
        startAddressDirection,
        endAddressDirection,
        directionsService,
        directionsRenderer,
    ]);
    return null;
}
export default React.memo(MapHandler);
