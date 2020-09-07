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
		changeApartment();
		deleteApartment();
	}

	public void addNewApartment() {
		post("services/apartments/addNewApartment", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			Apartment apartment;
			
			
			try {
				apartment = g.fromJson(payload, Apartment.class); //uneo sva polja i dobio novi app
			}
			catch(Exception e) {
				res.status(400);
				return g.toJson("Bad request");
			}
			
			if (apartmentDAO.getApartmetnID(apartment.getId().toLowerCase()) != null) {
				
				if(apartmentDAO.getApartmentsMap().get(apartment.getId().toLowerCase()).getDeleted() == 1){ 
					//apartmentDAO.getApartmentsMap().remove(apartment.getId().toLowerCase()); 
					apartmentDAO.getApartmentsList().remove(apartmentDAO.getApartmentsMap().get(apartment.getId().toLowerCase()));
				}else{
					res.status(201);
					return "Apartman sa tim imenom veæ postoji!";
				}		
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
				if(a.getHost().equals(h.getUsername()) && (a.getStatusOfApartment().equals(StatusOfApartment.Aktivan)) && a.getDeleted() == 0){
					apratments.add(a);
				}
				
			}	
			
			
			if(apratments.isEmpty()){
				res.status(204);
				return g.toJson(apratments);
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
				if(a.getHost().equals(h.getUsername()) && (a.getStatusOfApartment().equals(StatusOfApartment.Neaktivan)) && a.getDeleted() == 0){
					apratments.add(a);
				}
				
			}
			
			if(apratments.isEmpty()){
				res.status(204);
				return g.toJson(apratments);
			}
			
			
			res.status(200);
			return g.toJson(apratments);
			
		});
		
	}
	
	public void changeApartment(){
		post("services/apartments/changeApartment", (req, res) -> {
			res.type("application/json");
			
			String payload = req.body();
			String oldId = req.queryMap("oldId").value(); //Apartman1 stari

			Apartment a = null;
			a = g.fromJson(payload, Apartment.class); //Apartman1 nije menjao //soba1
			
			if(a == null){
				res.status(204);
				return "Apartment is null";
			}

			
			ArrayList<Apartment> newListOfAp = apartmentDAO.getApartmentsList();
			
			
			//Radi dobro za neobrisane apartmane
			for(Apartment apartment : newListOfAp){ 
				
				if(apartment.getId().equalsIgnoreCase(a.getId()) && apartment.getDeleted() == 0){ 
					if(!(apartment.getId().equalsIgnoreCase(oldId))){
						res.status(202);
						return "Apartment with that ID already exists and it is not deleted";
					}
				}
				
			}
			
			
			for(Apartment apartment : newListOfAp){ 				
				if(apartment.getId().equalsIgnoreCase(a.getId()) && apartment.getDeleted() != 0){ 
					if(!(apartment.getId().equalsIgnoreCase(oldId))){
						apartmentDAO.getApartmentsList().remove(apartment);
						break;
						
					}
				}
				
			}

			
			
			apartmentDAO.editApartment(a, oldId);
			ApartmentDAO.writeApartmentsInFile(apartmentDAO.getApartmentsList());
			apartmentDAO.fillMapWithApartments();
			
			res.status(200);					
			return "Ok";

		});
	}
	
	
	public void deleteApartment(){
		post("services/apartments/deleteApartment", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			
			ArrayList<Apartment> apartments = apartmentDAO.getApartmentsList();
		
			
			for(Apartment a : apartmentDAO.getApartmentsList()){
				if(a.getId().equals(payload)){
					a.setDeleted(1);
					break;
				}
			}
			
			ApartmentDAO.writeApartmentsInFile(apartmentDAO.getApartmentsList());
			apartmentDAO.fillMapWithApartments();
			
			res.status(200);	
			return "ok";
			
		});
	}
	
	
	
	
	
	
}
