package com.points.coordinatesystem.controller;

import com.points.coordinatesystem.model.Point;
import com.points.coordinatesystem.service.PointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.List;

@RestController
@RequestMapping("/point")
@CrossOrigin
public class PointController {
    @Autowired
    private PointService pointService;


    @PostMapping("/add")
    public ResponseEntity<Point> add(@RequestBody Point point){
        Point savedPoint = pointService.savePoint(point);
        return ResponseEntity.ok(savedPoint);
    }
    @GetMapping ("/getAll")
    public List<Point> getAllPoints(){
        return pointService.getAllPoints();
    }

    @DeleteMapping("/deletePoint/{id}")
    public String deletePoint(@PathVariable("id") int id){
        pointService.deletePoint(id);
        return String.format("Punkt %s wurde gelöscht",id);
    }
    @DeleteMapping("/deleteAll")
    public void deleteAll(){
        pointService.deleteAll();
    }

}
