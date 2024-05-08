export const getMinValueArray = (array) => {
    if (array.length == 0) {
        return;
    }
    let minValue = array[0];
    array.forEach((item) => {
        if (item < minValue) {
            minValue = item;
        }
    });

    return minValue;
};
