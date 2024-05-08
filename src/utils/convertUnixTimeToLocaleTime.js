import { leadingZeroNumber } from "./leadingZeroNumber";

export function convertUnixTimeToLocaleTime(unixTimestamp) {
    const dateConvert = new Date(unixTimestamp * 1000);
    return `${leadingZeroNumber(dateConvert.getHours())}:${leadingZeroNumber(
        dateConvert.getMinutes()
    )}`;
}
