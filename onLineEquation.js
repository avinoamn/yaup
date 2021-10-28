const X = 0;
const Y = 1;

// Check if a point is on the line equation
function onLineEquation(point, lineEquation) {
    return point[Y] === point[X] * lineEquation.m + lineEquation.n;
}

export default onLineEquation;