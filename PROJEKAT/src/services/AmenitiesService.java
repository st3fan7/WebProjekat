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
		
			ArrayList<Amenities> allAmenities = amenitiesDAO.getAmenitiesList();
			ArrayList<Amenities> allAmenitiesNotDeleted = new ArrayList<>();

			for(Amenities a : allAmenities) {
				if(a.getDeleted() == 0) {
					allAmenitiesNotDeleted.add(a);
				}
			}
			
			if(allAmenitiesNotDeleted.isEmpty()){
				res.status(204);
				return "No content";
			}
			
			res.status(200);
			return g.toJson(allAmenitiesNotDeleted);
			
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
			
			if (!amenitiesDAO.getAmenitiesMap().containsKey(oldAmenity.toLowerCase())) {
				System.out.println("usao");
				res.status(400);
				return ("400 Bad Request");
			}
			
			amenitiesDAO.editAmenity(amenities.getContent(), oldAmenity);
			AmenitiesDAO.writeAmenitiesInFile(amenitiesDAO.getAmenitiesList());
			
			ArrayList<Amenities> amenitiesNotDeleted = new ArrayList<>();
			ArrayList<Amenities> amenitiesList = amenitiesDAO.getAmenitiesList();
			
			
			for(Amenities a : amenitiesList) {
				if(a.getDeleted() == 0) {
					amenitiesNotDeleted.add(a);
				}
			}			
		
			res.status(200);
			return g.toJson(amenitiesNotDeleted);

		});
	}
	
	public void addAmenity() {
		post("services/amenities/addAmenity", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			Amenities amenities = g.fromJson(payload, Amenities.class);
			int check = 0;
			
			if(amenities == null) {
				res.status(400);
				return ("400 Bad Request");
			}
			
			
			
			if(amenitiesDAO.getAmenitiesMap().containsKey(amenities.getContent().toLowerCase())) { // sto 1 ; sto 0
				if(amenitiesDAO.getAmenitiesMap().get(amenities.getContent().toLowerCase()).getDeleted() == 1) {
					amenitiesDAO.getAmenitiesMap().get(amenities.getContent().toLowerCase()).setDeleted(0);
					check = 1;
				} else {
					res.status(200);
					return ("200 OK");
				}
			}

			ArrayList<Amenities> amenitiesList = amenitiesDAO.getAmenitiesList();
			
			if(check != 1) {
				amenitiesList.add(amenities);
			}
			
			amenitiesDAO.setAmenitiesList(amenitiesList);
			AmenitiesDAO.writeAmenitiesInFile(amenitiesDAO.getAmenitiesList());
			amenitiesDAO.fillMapWithAmenities();
			
			ArrayList<Amenities> amenitiesNotDeleted = new ArrayList<>();
			for(Amenities a : amenitiesList) {
				if(a.getDeleted() == 0) {
					amenitiesNotDeleted.add(a);
				}
			}
			
			res.status(201);
			return g.toJson(amenitiesNotDeleted);
		});
	}

}
