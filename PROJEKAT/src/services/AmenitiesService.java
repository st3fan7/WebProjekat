package services;

import static spark.Spark.get;
import static spark.Spark.post;

import java.util.ArrayList;

import com.google.gson.Gson;

import beans.Amenities;
import dao.AmenitiesDAO;


public class AmenitiesService {
	
	private static Gson g = new Gson();
	AmenitiesDAO amenitiesDAO = new AmenitiesDAO();
	
	public AmenitiesService() {
		getAllAmenities();
		changeAmenity();
		addAmenity();
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
	
	public void changeAmenity() {
		post("services/amenities/changeAmenity", (req, res) -> {
			String payload = req.body();
			String oldAmenity = req.queryMap("oldAmenity").value();
			Amenities amenities = g.fromJson(payload, Amenities.class);
			
			if (amenities == null) {
				res.status(400);
				return ("400 Bad Request");
			}
			
			if (!amenitiesDAO.getAmenitiesMap().containsKey(oldAmenity)) {
				res.status(400);
				return ("400 Bad Request");
			}
			
			amenitiesDAO.editAmenity(amenities.getContent(), oldAmenity);
			AmenitiesDAO.writeAmenitiesInFile(amenitiesDAO.getAmenitiesList());
			
			res.status(200);
			return g.toJson(amenitiesDAO.getAmenitiesList());

		});
	}
	
	public void addAmenity() {
		post("services/amenities/addAmenity", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			Amenities amenities = g.fromJson(payload, Amenities.class);
			
			if(amenities == null) {
				res.status(400);
				return ("400 Bad Request");
			}
			
			if(amenitiesDAO.getAmenitiesMap().containsKey(amenities.getContent().toLowerCase())) {
				res.status(200);
				return ("200 OK");
			}
			
			ArrayList<Amenities> amenitiesList = amenitiesDAO.getAmenitiesList();
			amenitiesList.add(amenities);
			amenitiesDAO.setAmenitiesList(amenitiesList);
			AmenitiesDAO.writeAmenitiesInFile(amenitiesDAO.getAmenitiesList());
			amenitiesDAO.fillMapWithAmenities();
			
			res.status(201);
			return g.toJson(amenitiesDAO.getAmenitiesList());
		});
	}

}
