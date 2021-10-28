import lineEquation from './lineEquation';

function linesIntersection(line1, line2) {
    const line1Equation = lineEquation(line1);
    const line2Equation = lineEquation(line2);

    // If the slopes are equal then the lines don't intersect
    if (line1Equation.m - line2Equation.m === 0) {
        return null;
    }

    const x = (line2Equation.n - line1Equation.n) / (line1Equation.m - line2Equation.m);
    const y = x * line1Equation.m + line1Equation.n;
    return [x, y];
}

export default linesIntersection;