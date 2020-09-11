package services;

import static spark.Spark.post;
import static spark.Spark.get;

import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Amenities;
import beans.Apartment;
import beans.Host;
import dao.AdminDAO;
import dao.ApartmentDAO;
import dao.GuestDAO;
import dao.HostDAO;
import dto.ApartmentDTO;
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
		getAllApartments();
		filterByAmenities();
	}

	public void getAllApartments() {
		get("services/apartments/getAllApartments", (req, res) -> {
			ArrayList<Apartment> apratments = new ArrayList<>();
					
			for(Apartment a : apartmentDAO.getApartmentsList()){
				if(a.getDeleted() == 0){
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


	public void addNewApartment() {
		post("services/apartments/addNewApartment", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			ApartmentDTO apartmentDTO;
			Apartment apartment = new Apartment();
			
			
			try {
				apartmentDTO = g.fromJson(payload, ApartmentDTO.class); //uneo sva polja i dobio novi app
			}
			catch(Exception e) {
				System.out.println("ovde");
				res.status(400);
				return g.toJson("Bad request");
			}
			
			Date startDate = null;
			Date endDate = null;
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
			
			for(int i = 0; i < apartmentDTO.getReleaseDates().size(); i++){
				startDate = sdf.parse(apartmentDTO.getReleaseDates().get(0));
				endDate = sdf.parse(apartmentDTO.getReleaseDates().get(1));
			}
			
			ArrayList<Date> releaseDates = new ArrayList<>();
			releaseDates.add(startDate);
			releaseDates.add(endDate);
			
			
			try {
				apartment.setId(apartmentDTO.getId());
				apartment.setTypeOfApartment(apartmentDTO.getTypeOfApartment());
				apartment.setNumberOfRooms(apartmentDTO.getNumberOfRooms());
				apartment.setNumberOfGuests(apartmentDTO.getNumberOfGuests());
				apartment.setLocation(apartmentDTO.getLocation());
				apartment.setReleaseDates(releaseDates);
				apartment.setFreeDates(new ArrayList<Date>());
				apartment.setHost(apartmentDTO.getHost());
				apartment.setComments(apartmentDTO.getComments());
				apartment.setPictures(apartmentDTO.getPictures());
				apartment.setPricePerNight(apartmentDTO.getPricePerNight());
				apartment.setCheckInTime(apartmentDTO.getCheckInTime());
				apartment.setCheckOutTime(apartmentDTO.getCheckOutTime());
				apartment.setStatusOfApartment(apartmentDTO.getStatusOfApartment());
				apartment.setAmenities(apartmentDTO.getAmenities());
				apartment.setReservations(apartmentDTO.getReservations());
				apartment.setDeleted(apartmentDTO.getDeleted());
			
				
			} catch (Exception e) {
				System.out.println("Greska pri pravljenju apartmana");
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
			String oldId = req.queryMap("oldId").value();

			ApartmentDTO apartmentDTO;
			Apartment a = new Apartment();
			
			
			try {
				apartmentDTO = g.fromJson(payload, ApartmentDTO.class); //uneo sva polja i dobio novi app
			}
			catch(Exception e) {
				System.out.println("ovde");
				res.status(400);
				return g.toJson("Bad request");
			}
			
			Date startDate = null;
			Date endDate = null;
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
			
			for(int i = 0; i < apartmentDTO.getReleaseDates().size(); i++){
				startDate = sdf.parse(apartmentDTO.getReleaseDates().get(0));
				endDate = sdf.parse(apartmentDTO.getReleaseDates().get(1));
			}
			
			ArrayList<Date> releaseDates = new ArrayList<>();
			releaseDates.add(startDate);
			releaseDates.add(endDate);
			
			
			try {
				a.setId(apartmentDTO.getId());
				a.setTypeOfApartment(apartmentDTO.getTypeOfApartment());
				a.setNumberOfRooms(apartmentDTO.getNumberOfRooms());
				a.setNumberOfGuests(apartmentDTO.getNumberOfGuests());
				a.setLocation(apartmentDTO.getLocation());
				a.setReleaseDates(releaseDates);
				a.setFreeDates(new ArrayList<Date>());
				a.setHost(apartmentDTO.getHost());
				a.setComments(apartmentDTO.getComments());
				a.setPictures(apartmentDTO.getPictures());
				a.setPricePerNight(apartmentDTO.getPricePerNight());
				a.setCheckInTime(apartmentDTO.getCheckInTime());
				a.setCheckOutTime(apartmentDTO.getCheckOutTime());
				a.setStatusOfApartment(apartmentDTO.getStatusOfApartment());
				a.setAmenities(apartmentDTO.getAmenities());
				a.setReservations(apartmentDTO.getReservations());
				a.setDeleted(apartmentDTO.getDeleted());
			
				
			} catch (Exception e) {
				System.out.println("Greska pri pravljenju apartmana");
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
	
	public void filterByAmenities() {
		post("services/apartments/filterByAmenities", (req, res) -> {
			res.type("application/json");
			
			String checkedAmenities = req.queryMap("checkedAmenities").value();
			String[] partsOfCheckedAmenities = checkedAmenities.split(","); 
			ArrayList<Apartment> filterApartments = new ArrayList<>();
			
			String payload = req.body();			
			ArrayList<Apartment> apartments = null;

			
			try {
				Type listType = new TypeToken<ArrayList<Apartment>>(){}.getType(); 
				apartments = g.fromJson(payload, listType);	
			}
			catch(Exception e) {
				res.status(400);
				return g.toJson("Bad request");
			}

			
			int count = 0;			
			for(Apartment a : apartments){
				count = 0;
				for(Amenities amenities : a.getAmenities()){
					for(int i = 0; i < partsOfCheckedAmenities.length; i++){
						if(amenities.getContent().equals(partsOfCheckedAmenities[i])){
							count++;
						}																	
			       }
					
				}
				if(partsOfCheckedAmenities.length == count){
					filterApartments.add(a);
				}
			}
			
			
		
			
			
			
			if(filterApartments.isEmpty()) {
				res.status(204);
				return "No content";
			}
			
            res.status(200);
            return g.toJson(filterApartments);
		});
	}
	
	
	
	
}
