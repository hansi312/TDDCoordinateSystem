import Point from "./pointObject";
import { changePoint } from "./funcs";
import PointList from "./pointList";
import { describe, expect, test } from '@jest/globals';




describe('changePoint', () => {
    test('point 1 + valuex = 1 === p2', () => {
        let p1 = new Point(2, 3);
        let p2 = new Point(3, 3);
        expect(changePoint(p1, 1)).toStrictEqual(p2);
    });
});

describe('measure distance between two points', () => {
    test('distance between p1 und p2 === √((p2x - p1x)² + (p2y - p1y)²)=== 1', () => {
        let p1 = new Point(2, 3);
        let p2 = new Point(3, 3);
        expect(p1.distance(p2)).toEqual(1)
    })
})

describe('PointList Class', () => {
    test('load Multiple Points to list', () => {
        const pL = new PointList()
        let p1 = new Point(2, 3);
        let p2 = new Point(3, 3);
        let p3 = new Point(3, 4);
        let p4 = new Point(2, 4);
        let pointList: Point[] = [p1, p2, p3, p4]
        pL.addPoints([p1, p2, p3, p4])
        expect(pL.points).toStrictEqual(pointList)
    })
})

describe('Reomve point from List', () => {
    test('Remove p1 from List', () => {
        const pL = new PointList()
        let p1 = new Point(2, 3);
        let p2 = new Point(3, 3);
        let p3 = new Point(3, 4);
        let p4 = new Point(2, 4);
        pL.addPoints([p1, p2, p3, p4])
        let pointList: Point[] = [p2, p3, p4]
        pL.removePoint(p1);
        expect(pL.points).toStrictEqual(pointList);
    })
})

describe('Get Circumference', () => {
    test('get Circumference of a PointList', () => {
        const pL = new PointList()
        let p1 = new Point(2, 3);
        let p2 = new Point(3, 3);
        let p3 = new Point(3, 4);
        let p4 = new Point(2, 4);
        pL.addPoints([p1, p2, p3, p4])
        expect(pL.circumference()).toBe(4)
    })
})

describe('Print', () => {
    test('Print the Points of the list', () => {
        const pL = new PointList()
        let p1 = new Point(2, 3);
        let p2 = new Point(3, 3);
        let p3 = new Point(3, 4);
        let p4 = new Point(2, 4);
        pL.addPoints([p1, p2, p3, p4])
        expect(pL.print()).toBe('Punkt 1: (2|3)\nPunkt 2: (3|3)\nPunkt 3: (3|4)\nPunkt 4: (2|4)\n');
    })
})

