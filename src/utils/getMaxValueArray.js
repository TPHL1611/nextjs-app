export const getMaxValueArray = (array) => {
    if (array.length == 0) {
        return;
    }
    let maxValue = array[0];
    array.forEach((item) => {
        if (item > maxValue) {
            maxValue = item;
        }
    });
    return maxValue;
};
