package services;

import static spark.Spark.get;
import static spark.Spark.post;

import java.util.ArrayList;

import com.google.gson.Gson;

import beans.Amenities;
import beans.Apartment;
import dao.AmenitiesDAO;
import dao.ApartmentDAO;


public class AmenitiesService {
	
	private static Gson g = new Gson();
	AmenitiesDAO amenitiesDAO = new AmenitiesDAO();
	
	public AmenitiesService() {
		getAllAmenities();
		changeAmenity();
		addAmenity();
		deleteAmenity();
	}

	public void getAllAmenities() {	
		get("services/amenities/getAllAmenities", (req, res) -> {
			AmenitiesDAO amenitiesDAO = new AmenitiesDAO();
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
			Amenities amenities;
			ApartmentDAO apartmentDAO = new ApartmentDAO();
			AmenitiesDAO amenitiesDAO = new AmenitiesDAO();
			
			try {
				amenities = g.fromJson(payload, Amenities.class);
			} catch(Exception e) {
				res.status(400);
				return ("400 Bad Request");
			}
			
			if (!amenitiesDAO.getAmenitiesMap().containsKey(oldAmenity.toLowerCase())) {
				res.status(400);
				return ("400 Bad Request");
			}
			
			amenitiesDAO.editAmenity(amenities.getContent(), oldAmenity);
			AmenitiesDAO.writeAmenitiesInFile(amenitiesDAO.getAmenitiesList());
			amenitiesDAO.fillMapWithAmenities();
			
			// upis u apartmanu
			for(Apartment a : apartmentDAO.getApartmentsList()) {
				for(Amenities amenityForAp : a.getAmenities()) {
					if(amenityForAp.getContent().equals(oldAmenity)) {
						amenityForAp.setContent(amenities.getContent());
					}
				}
			}
			
			apartmentDAO.setApartmentsList(apartmentDAO.getApartmentsList());
			ApartmentDAO.writeApartmentsInFile(apartmentDAO.getApartmentsList());
			apartmentDAO.fillMapWithApartments();
			
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
			Amenities amenities;
			int check = 0;
			AmenitiesDAO amenitiesDAO = new AmenitiesDAO();
			
			try {
				amenities = g.fromJson(payload, Amenities.class);
			} catch(Exception e) {
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
	
	public void deleteAmenity(){
		post("services/amenities/deleteAmenity", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			AmenitiesDAO amenitiesDAO = new AmenitiesDAO();
			ApartmentDAO apartmentDAO = new ApartmentDAO();

			for(Amenities a : amenitiesDAO.getAmenitiesList()){
				if(a.getContent().equalsIgnoreCase(payload)){
					a.setDeleted(1);
					break;
				}
			}
			
			for(Apartment a : apartmentDAO.getApartmentsList()) {
				for(Amenities amenity : a.getAmenities()) {
					if(amenity.getContent().equalsIgnoreCase(payload)) {
						amenity.setDeleted(1);
						break;
					}
				}
			}
			
			apartmentDAO.setApartmentsList(apartmentDAO.getApartmentsList());
			ApartmentDAO.writeApartmentsInFile(apartmentDAO.getApartmentsList());
			apartmentDAO.fillMapWithApartments();
			
			amenitiesDAO.setAmenitiesList(amenitiesDAO.getAmenitiesList());
			AmenitiesDAO.writeAmenitiesInFile(amenitiesDAO.getAmenitiesList());
			amenitiesDAO.fillMapWithAmenities();
			
			res.status(200);	
			return "ok";
			
		});
	}

}
