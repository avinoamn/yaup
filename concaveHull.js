import linesSegmentsIntersection from './linesSegmentsIntersection';
import onLineSegmentEdge from './onLineSegmentEdge';

function concaveHull(linearRing, currPointIndex=0) {
    // If index of last line in linearRing, return the linearRing
    if (linearRing.length - 2 === currPointIndex) {
        return linearRing;
    } else {
        // `currLine` is used to find intersection points with the rest of the lines
        const currLine = [linearRing[currPointIndex], linearRing[currPointIndex + 1]];
        
        // `trailingLine` is used as the initial `validPoints` in the reduce because it don't intersect with `currLine`
        const trailingLine = [linearRing[currPointIndex + 1], linearRing[currPointIndex + 2]];

        // `linearRingHead` is the points array of the already fixed lines
        const linearRingHead = linearRing.slice(0, currPointIndex + 1);

        // `linearRingTail` is the points array of the lines that we didn't fix yet
        const linearRingTail = linearRing.slice(currPointIndex + 2);

        const fixedLinearRing = linearRingHead.concat(linearRingTail.reduce((validPoints, _, testPointIndex) => {
            // If `testPointIndex` is the last index (meaning there are no lines left to check), return `validPoints`
            if (linearRingTail[testPointIndex + 1]) {
                // `intersectTestLine` is the line that we check if it intersects with `currLine`
                const intersectTestLine = [linearRingTail[testPointIndex], linearRingTail[testPointIndex + 1]];
                
                // The value of `intersectionPoint` should be `null` if there is no
                // intersection. Else, its value will be the intersection point
                const intersectionPoint = linesSegmentsIntersection(currLine, intersectTestLine);

                // If there is an intersection point, we warp the reversed array of `validPoints`
                // with the intersection point from both sides, and add the end point of `intersectTestLine` at the end
                // Else, we add to `validPoints` the end point of `intersectTestLine`
                return intersectionPoint &&
                    !onLineSegmentEdge(intersectionPoint, intersectTestLine) &&
                    !onLineSegmentEdge(intersectionPoint, currLine) ?
                        [intersectionPoint, ...validPoints.reverse(), intersectionPoint, linearRingTail[testPointIndex + 1]] :
                        validPoints.concat([linearRingTail[testPointIndex + 1]]);
            } else {
                return validPoints;
            }
        }, trailingLine));
        
        return concaveHull(fixedLinearRing, currPointIndex + 1);
    }
}

export default concaveHull;