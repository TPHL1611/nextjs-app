import { commonUrl } from "@/data/constant";
import { createApi } from "unsplash-js";

export const fetchWeatherLatLng = async ({ latitude, longitude }) => {
    const res = await fetch(
        `${commonUrl}/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY}`
    );
    const dataWeatherPosition = await res.json();
    return dataWeatherPosition;
};
export const fetchForecast = async ({ latitude, longitude }) => {
    const res = await fetch(
        `${commonUrl}/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY}`
    );
    const dataWeatherForecast = await res.json();
    return dataWeatherForecast;
};
export const unSplashApi = createApi({
    accessKey: process.env.NEXT_PUBLIC_ACCESS_KEY_UNSPLASH,
});
export const reverseGeocoding = async ({ latitude, longitude }) => {
    const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=administrative_area_level_2&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY_GEOCODING}`
    );
    const address = await res.json();
    return address;
};
export const fetchImageCity = (query) => {
    return new Promise((resolve, reject) => {
        unSplashApi.search
            .getPhotos({
                query: query,
                orientation: "portrait",
            })
            .then((result) => {
                const photosList = result.response.results;
                let photoLikeHighest = photosList[0];
                photosList.forEach((photo) => {
                    if (photo.likes > photoLikeHighest.likes) {
                        photoLikeHighest = photo;
                    }
                });
                resolve(photoLikeHighest.urls.full);
            })
            .catch((error) => {
                console.log("something went wrong!", error);
                reject(error);
            });
    });
};
