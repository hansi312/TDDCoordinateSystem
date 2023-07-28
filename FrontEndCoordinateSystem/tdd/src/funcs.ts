import Point from "./pointObject";

function changePoint(point: Point, valueX: number = 0, valueY: number = 0): Point {
    point.xAxisChange(valueX)
    point.yAxisChange(valueY)
    return point;
}

export { changePoint }