package com.points.coordinatesystem;

import com.points.coordinatesystem.model.Point;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.web.client.RestTemplate;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class CoordinatesystemApplicationTests {
	@LocalServerPort
	private int port;

	private String baseURL = "http://localhost";
	private static RestTemplate restTemplate;

	@Autowired
	private TestH2Repository h2Repository;


	@BeforeAll
	public static void init(){
		restTemplate = new RestTemplate();
	}

	@BeforeEach
	public void setUp(){
		baseURL = baseURL.concat(":").concat(port+"").concat("/point/add");
	}
	@Test
	void contextLoads() {
	}
	@Test
	public void testAddPoint(){
		Point point = new Point();
		point.setyAxis(1);
		point.setxAxis(1);
		point.setId(1);

		Point response = restTemplate.postForObject(baseURL, point, Point.class);
		assertEquals(1,response.getId());
		assertEquals(1, h2Repository.findAll().size());
	}

}
