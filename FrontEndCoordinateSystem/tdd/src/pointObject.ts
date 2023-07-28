class Point {
    xAxis: number;
    yAxis: number;
    id: number;
    constructor(xAxis: number, yAxis: number, id: number = 0) {
        this.xAxis = xAxis;
        this.yAxis = yAxis;
        this.id = id;
    }


    xAxisChange(value: number) {
        this.xAxis += value;
    }
    yAxisChange(value: number) {
        this.yAxis += value
    }
    distance(point: Point): number {
        let result = Math.sqrt(Math.pow((point.xAxis - this.xAxis), 2) + Math.pow((point.yAxis - this.yAxis), 2))
        return result;
    }
    print(): string {
        let res = `(${this.xAxis}|${this.yAxis})`
        return res;
    }

}

export default Point;