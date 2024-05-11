import React, { useCallback, useEffect, useState, FormEvent, useContext } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { twMerge } from "tailwind-merge";
import { fetchImageCity } from "@/utils/fetchData";
import { WeatherAppContext } from "../page";

export default function AutoCompleteSearch({
    onPlaceSelect,
    setLocation,
    setBackgroundCity,
    inputValue,
    setInputValue,
    isSetLocationAndFetchImageCity,
    classInput,
}) {
    //Service map for autocomplete search
    const map = useMap();
    const places = useMapsLibrary("places");
    // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteSessionToken
    const [sessionToken, setSessionToken] = useState();
    // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service
    const [autocompleteService, setAutocompleteService] = useState(null);
    // https://developers.google.com/maps/documentation/javascript/reference/places-service
    const [placesService, setPlacesService] = useState(null);

    const [predictionResults, setPredictionResults] = useState([]);
    const { setIsDirection, startAddressDirection, autoRedirection, endAddressDirection } =
        useContext(WeatherAppContext);
    //Map service autocomplete
    useEffect(() => {
        if (!places || !map) return;

        setAutocompleteService(new places.AutocompleteService());
        setPlacesService(new places.PlacesService(map));
        setSessionToken(new places.AutocompleteSessionToken());

        return () => setAutocompleteService(null);
    }, [map, places]);
    const fetchPredictions = useCallback(
        async (inputValue) => {
            if (!autocompleteService || !inputValue) {
                setPredictionResults([]);
                return;
            }

            const request = { input: inputValue, sessionToken };
            const response = await autocompleteService.getPlacePredictions(request);

            setPredictionResults(response.predictions);
        },
        [autocompleteService, sessionToken]
    );
    const onInputChange = useCallback(
        (event) => {
            const value = event.target?.value;

            setIsDirection(false);
            setInputValue(value);
            fetchPredictions(value);
        },
        [fetchPredictions]
    );
    const handleSuggestionClick = useCallback(
        (placeId, structured_formatting) => {
            if (!places) return;

            const detailRequestOptions = {
                placeId,
                fields: ["geometry", "name", "formatted_address"],
                sessionToken,
            };

            const detailsRequestCallback = (placeDetails) => {
                //Request Complete search
                onPlaceSelect(placeDetails);
                setPredictionResults([]);
                setSessionToken(new places.AutocompleteSessionToken());
                //Set value input
                setInputValue(placeDetails?.formatted_address ?? "");
                if (autoRedirection && endAddressDirection && startAddressDirection) {
                    setIsDirection(true);
                }
                //Reset new marker on map and get image city
                if (isSetLocationAndFetchImageCity === true) {
                    setLocation({
                        latitude: placeDetails?.geometry.location.lat(),
                        longitude: placeDetails?.geometry.location.lng(),
                    });
                    fetchImageCity(structured_formatting.main_text)
                        .then((imageCityUrl) => {
                            setBackgroundCity(`url(${imageCityUrl})`);
                        })
                        .catch((error) => {
                            console.error("Error fetching image:", error);
                        });
                }
            };

            placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
        },
        [
            places,
            sessionToken,
            placesService,
            onPlaceSelect,
            autoRedirection,
            endAddressDirection,
            startAddressDirection,
            isSetLocationAndFetchImageCity,
        ]
    );
    return (
        <div className="autocomplete-container flex-1 relative">
            <input
                value={inputValue}
                onChange={(event) => onInputChange(event)}
                placeholder="Nhập địa điểm cần tìm"
                className={twMerge(
                    "text-black py-3 px-4 text-sm w-full rounded-3xl border-b border-black/[.2]",
                    classInput,
                    predictionResults.length > 0 ? "rounded-bl-none rounded-br-none" : null
                )}
            />
            {predictionResults.length > 0 && (
                <ul
                    className={twMerge(
                        "custom-list bg-white absolute top-full left-0 rounded-3xl p-3 w-full z-10",
                        predictionResults.length > 0 ? "rounded-tl-none rounded-tr-none" : ""
                    )}>
                    {predictionResults.map(
                        ({ place_id, description, structured_formatting }, index) => {
                            return (
                                <li
                                    key={place_id}
                                    className={twMerge(
                                        "custom-list-item cursor-pointer py-2 px-2 text-black ",
                                        index != 0
                                            ? "mt-1 border-t border-blue-100"
                                            : "mt-0 border-t-0"
                                    )}
                                    onClick={() =>
                                        handleSuggestionClick(place_id, structured_formatting)
                                    }>
                                    <p className="line-clamp-1 text-sm">{description}</p>
                                </li>
                            );
                        }
                    )}
                </ul>
            )}
        </div>
    );
}
