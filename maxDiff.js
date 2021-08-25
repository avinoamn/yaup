function maxDiff(arr) {
    return arr.reduce((acc, curr, index) => (
        ((curr < arr[acc.lowestIndex]) && ({ ...acc, lowestIndex: index })) ||
        ((curr - arr[acc.lowestIndex] > arr[acc.highestDiffIndex] - arr[acc.lowestDiffIndex]) && ({
            ...acc,
            lowestDiffIndex: acc.lowestIndex,
            highestDiffIndex: index
        })) || acc
    ), {lowestIndex: 0, lowestDiffIndex: 0, highestDiffIndex: 0});
}