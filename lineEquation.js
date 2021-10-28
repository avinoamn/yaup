const X = 0;
const Y = 1;
const LINE_START_POINT = 0;
const LINE_END_POINT = 1;

// y = mx + n
function lineEquation(line) {
    const point1 = line[LINE_START_POINT], point2 = line[LINE_END_POINT];
    const m = (point2[Y] - point1[Y]) / (point2[X] - point1[X]);
    const n = point1[Y] - (point1[X] * m);
    return {m, n};
}

export default lineEquation;