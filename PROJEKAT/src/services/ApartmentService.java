package services;

import static spark.Spark.post;
import static spark.Spark.get;

import java.util.ArrayList;

import com.google.gson.Gson;

import beans.Apartment;
import beans.Host;
import dao.AdminDAO;
import dao.ApartmentDAO;
import dao.GuestDAO;
import dao.HostDAO;
import enums.StatusOfApartment;
import javaxt.http.Request;
import spark.Session;

public class ApartmentService {
	private static Gson g = new Gson();
	HostDAO hostDAO = new HostDAO();
	AdminDAO adminDAO = new AdminDAO();
	GuestDAO guestDAO = new GuestDAO();
	ApartmentDAO apartmentDAO = new ApartmentDAO();
	
	public ApartmentService() {
		addNewApartment();
		getActiveApratmentsForHost();
		getInActiveApratmentsForHost();
	}

	public void addNewApartment() {
		post("services/apartments/addNewApartment", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			Apartment apartment;
			
			try {
				apartment = g.fromJson(payload, Apartment.class);
			}
			catch(Exception e) {
				res.status(400);
				return g.toJson("Bad request");
			}
			
			if (apartmentDAO.getApartmetnID(apartment.getId()) != null) {
				res.status(201);
				return g.toJson("Apartman sa tim imenom veæ postoji!");

			}
			
			
			ArrayList<Apartment> apartmetns = apartmentDAO.getApartmentsList();
			apartmetns.add(apartment);
			apartmentDAO.setApartmentsList(apartmetns);
			ApartmentDAO.writeApartmentsInFile(apartmentDAO.getApartmentsList());
			apartmentDAO.fillMapWithApartments();
			
			res.status(200);
			return g.toJson("Ok");

		});
		
	}
	
	public void getActiveApratmentsForHost(){
		get("services/apartments/getActiveApratmentsForHost", (req, res) -> {
			Session ss = req.session(true);
			Host h = ss.attribute("user");
			ArrayList<Apartment> apratments = new ArrayList<>();
			
			for(Apartment a : apartmentDAO.getApartmentsList()){
				if(a.getHost().equals(h.getUsername()) && (a.getStatusOfApartment().equals(StatusOfApartment.Aktivan))){
					apratments.add(a);
				}
				
			}
			
			if(apratments.isEmpty()){
				res.status(204);
				return "No content";
			}
			
			
			res.status(200);
			return g.toJson(apratments);
			
		});
		
	}
	
	public void getInActiveApratmentsForHost(){
		get("services/apartments/getInActiveApratmentsForHost", (req, res) -> {
			Session ss = req.session(true);
			Host h = ss.attribute("user");
			ArrayList<Apartment> apratments = new ArrayList<>();
			
			for(Apartment a : apartmentDAO.getApartmentsList()){
				if(a.getHost().equals(h.getUsername()) && (a.getStatusOfApartment().equals(StatusOfApartment.Neaktivan))){
					apratments.add(a);
				}
				
			}
			
			if(apratments.isEmpty()){
				res.status(204);
				return "No content";
			}
			
			
			res.status(200);
			return g.toJson(apratments);
			
		});
		
	}
	
}
