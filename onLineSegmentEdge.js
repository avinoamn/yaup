const X = 0;
const Y = 1;
const LINE_START_POINT = 0;
const LINE_END_POINT = 1;

// Check if a point is equal to one of the line segment's edges
function onLineSegemntEdge(point, line) {
    return (point[X] === line[LINE_START_POINT][X] && point[Y] === line[LINE_START_POINT][Y]) ||
        (point[X] === line[LINE_END_POINT][X] && point[Y] === line[LINE_END_POINT][Y]);
}

export default onLineSegemntEdge;