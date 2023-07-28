package com.points.coordinatesystem.service;

import com.points.coordinatesystem.model.Point;
import com.points.coordinatesystem.repository.PointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PointServiceImplementation implements PointService{
    @Autowired
    private PointRepository pointRepository;
    @Override
    public Point savePoint(Point point) {
        return pointRepository.save(point);
    }

    @Override
    public List<Point> getAllPoints() {
        return pointRepository.findAll();
    }

    @Override
    public void deletePoint(int id) {
        pointRepository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        pointRepository.deleteAll();
    }
}
