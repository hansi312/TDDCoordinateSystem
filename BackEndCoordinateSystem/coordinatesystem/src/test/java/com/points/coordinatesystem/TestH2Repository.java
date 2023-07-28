package com.points.coordinatesystem;

import com.points.coordinatesystem.model.Point;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestH2Repository extends JpaRepository<Point, Integer> {
}
