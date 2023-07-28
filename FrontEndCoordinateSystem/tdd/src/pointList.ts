import Point from "./pointObject";

class PointList {
    points: Point[] = []

    addPoints(arg: Point | Point[]): void {
        if (Array.isArray(arg)) {
            this.points.push(...arg);
        } else {
            this.points.push(arg);
        }
    }

    removePoint(point: Point): void {
        this.points.splice(this.points.indexOf(point), 1)
    }
    circumference(): number {
        let result: number = 0;
        for (let i = 0; i < this.points.length; i++) {
            if (i === this.points.length - 1) {
                result += this.points[0].distance(this.points[i]);
            }
            else {
                result += this.points[i].distance(this.points[i + 1]);
            }
        }
        return result;
    }
    clearList(): void {
        this.points = [];
    }
    print(): string {
        let res = '';
        let counter = 1;
        this.points.forEach((point) => {
            res += `Punkt ${counter}: ${point.print()}\n`
            counter++;
        })
        console.log(res)
        return res;
    }
}

export default PointList