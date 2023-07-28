package com.points.coordinatesystem.PointController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.points.coordinatesystem.controller.PointController;
import com.points.coordinatesystem.model.Point;
import com.points.coordinatesystem.service.PointServiceImplementation;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.*;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static net.bytebuddy.matcher.ElementMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(value= PointController.class)
public class Test {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private PointServiceImplementation pointService;

    //Unit test for PointController to set Point to Database
    @org.junit.Test
    public void testCreatePoint() throws Exception{
        Point mockPoint = new Point();
        mockPoint.setId(1);
        mockPoint.setxAxis(1);
        mockPoint.setyAxis(1);

        String inputInJson = this.maptoJson(mockPoint);

        String URI = "/point/add";

        Mockito.when(pointService.savePoint(Mockito.any(Point.class))).thenReturn(mockPoint);
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post(URI)
                .accept(MediaType.APPLICATION_JSON).content(inputInJson)
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse response = result.getResponse();

        String outputInJson = response.getContentAsString();

        assertEquals(inputInJson, outputInJson);

    }

    @org.junit.jupiter.api.Test
    public void getPointsTest() throws Exception {
            Point mockPoint = new Point();
            mockPoint.setId(1);
            mockPoint.setxAxis(1);
            mockPoint.setyAxis(1);
            Point mockPoint1 = new Point();
        mockPoint1.setId(2);
        mockPoint1.setxAxis(2);
        mockPoint1.setyAxis(2);
            Point mockPoint2 = new Point();
        mockPoint2.setId(3);
        mockPoint2.setxAxis(3);
        mockPoint2.setyAxis(4);

            List<Point> points = new ArrayList<>(Arrays.asList(mockPoint, mockPoint1, mockPoint2));


        Mockito.when(pointService.getAllPoints()).thenReturn(points);
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/point/getAll")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect( jsonPath("$[1].xAxis").value("2.0"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(3)))
                .andExpect( jsonPath("$[1].xAxis").value(("2.0")));
    }

    private String maptoJson(Object object) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(object);
    }
}
