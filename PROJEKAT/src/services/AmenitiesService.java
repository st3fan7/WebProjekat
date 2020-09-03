package services;

import static spark.Spark.post;
import static spark.Spark.get;

import java.util.ArrayList;

import com.google.gson.Gson;

import beans.Amenities;
import dao.AmenitiesDAO;



public class AmenitiesService {
	
	private static Gson g = new Gson();
	AmenitiesDAO amenitiesDAO = new AmenitiesDAO();
	
	public AmenitiesService() {
		getAllAmenities();
	}

	public void getAllAmenities() {	
		get("services/amenities/getAllAmenities", (req, res) -> {
		
			if(amenitiesDAO.getAmenitiesList().isEmpty()){
				res.status(204);
				return "No content";
			}
			
			res.status(200);
			return g.toJson(amenitiesDAO.getAmenitiesList());
			
		  });
	}

}
