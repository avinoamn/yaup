function maxDiff(arr) {
    return arr.reduce((acc, curr, index) => (
        ((curr < arr[acc.lowestIndex]) && ({ ...acc, lowestIndex: index })) ||
        ((curr - arr[acc.lowestIndex] > acc.maxDiff) && ({ ...acc, maxDiff: curr - arr[acc.lowestIndex]})) ||
        (acc)
    ), {lowestIndex: 0, maxDiff: 0}).maxDiff;
}