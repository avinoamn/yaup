import onLineEquation from './onLineEquation';

const X = 0;
const Y = 1;
const LINE_START_POINT = 0;
const LINE_END_POINT = 1;

// Check if a point is on the line segment
function onLineSegment(point, line, lineEquation) {
    if (!onLineEquation(point, lineEquation)) {
        return false;
    }

    const point1 = line[LINE_START_POINT], point2 = line[LINE_END_POINT];
    if (m > 0) {
        return point1[Y] < point2[Y] ?
            point[X] >= point1[X] && point[X] <= point2[X] && point[Y] >= point1[Y] && point[Y] <= point2[Y] :
            point[X] <= point1[X] && point[X] >= point2[X] && point[Y] <= point1[Y] && point[Y] >= point2[Y];
    } else {
        return point1[Y] < point2[Y] ?
            point[X] <= point1[X] && point[X] >= point2[X] && point[Y] >= point1[Y] && point[Y] <= point2[Y] :
            point[X] >= point1[X] && point[X] <= point2[X] && point[Y] <= point1[Y] && point[Y] >= point2[Y];
    }
}

export default onLineSegment;