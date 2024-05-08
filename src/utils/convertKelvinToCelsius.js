export default function convertKelvinToCelsius(kelvinTemp) {
    const diff = 273.15;
    return Math.ceil(kelvinTemp - diff);
}
