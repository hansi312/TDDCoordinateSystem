package com.points.coordinatesystem.service;

import com.points.coordinatesystem.model.Point;

import java.util.List;

public interface PointService {
    public Point savePoint(Point point);
    public List<Point> getAllPoints();
    public void deletePoint(int id);
    public void deleteAll();
//    public List<Point> findAll();
}
