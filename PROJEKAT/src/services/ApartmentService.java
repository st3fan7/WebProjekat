package services;

import static spark.Spark.get;
import static spark.Spark.post;

import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashSet;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Amenities;
import beans.Apartment;
import beans.Host;
import beans.PeriodOfRent;
import beans.Reservation;
import dao.AdminDAO;
import dao.ApartmentDAO;
import dao.GuestDAO;
import dao.HostDAO;
import dao.ReservationDAO;
import dto.ApartmentDTO;
import enums.StatusOfApartment;
import enums.StatusOfReservation;
import spark.Session;

public class ApartmentService {
	private static Gson g = new Gson();
	HostDAO hostDAO = new HostDAO();
	AdminDAO adminDAO = new AdminDAO();
	GuestDAO guestDAO = new GuestDAO();
	ApartmentDAO apartmentDAO = new ApartmentDAO();
	
	public ApartmentService() {
		getAllActiveApartments();
		addNewApartment();
		getActiveApratmentsForHost();
		getInActiveApratmentsForHost();
		changeApartment();
		deleteApartment();
		getAllApartments();
		filterByAmenities();
		getSearchedApartments();
	}
	
	
	// uradi
	private void getSearchedApartments() {
		get("services/apartments/getSearchedApartments", (req, res) -> {
			res.type("application/json");
			ApartmentDAO apartmentDAO = new ApartmentDAO();
			String dateFrom = req.queryMap("dateFrom").value(); 
			String dateTo = req.queryMap("dateTo").value();
			String city = req.queryMap("city").value(); 
			String country = req.queryMap("country").value(); 
			String price = req.queryMap("price").value();
			String rooms = req.queryMap("rooms").value();
			String guests = req.queryMap("guests").value();
		
			
			Date startDate = null;
			Date endDate = null;
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			
			if(dateFrom != null) {
				startDate = sdf.parse(dateFrom);
			}
			if(dateTo != null) {
				endDate = sdf.parse(dateTo);
			}
			
			/*
			String city = "";
			String country = "";
			
			if(!location.equals("")) {
				if(location.contains(",")) {
					String[] locationParts = location.split(",");
					city = locationParts[0].trim();
					country = locationParts[1].trim();
				} else {
					city = location;
					country = location;
				}
				
			}
			
			*/
			
			int priceFrom = -1;
			int priceTo = -1;
			
			if(!price.equals("")) {
				String[] priceParts = price.split("-");
				priceFrom = Integer.parseInt(priceParts[0].trim());
				priceTo = Integer.parseInt(priceParts[1].trim());				
			}
			
			int roomsFrom = -1;
			int roomsTo = -1;
			
			if(!rooms.equals("")) {
				String[] roomsParts = rooms.split("-");
				roomsFrom = Integer.parseInt(roomsParts[0].trim());
				roomsTo = Integer.parseInt(roomsParts[1].trim());				
			}
			
			int numberOfGuests = -1;
			
			if(!guests.equals("")) {
				numberOfGuests = Integer.parseInt(guests);
			}
			
			 
			ArrayList<Apartment> searchedApartments = new ArrayList<>();
			
			searchedApartments.addAll(apartmentDAO.getApartmentsByDateRange(startDate, endDate));
			searchedApartments.addAll(apartmentDAO.getApartmentsByLocation(city, country));
			searchedApartments.addAll(apartmentDAO.getApartmentsByPrice(priceFrom, priceTo));
			searchedApartments.addAll(apartmentDAO.getApartmentsByNumberOfRooms(roomsFrom, roomsTo));
			searchedApartments.addAll(apartmentDAO.getApartmentsByNumberOfGuests(numberOfGuests));

			
			LinkedHashSet<Apartment> hashSet = new LinkedHashSet<>(searchedApartments);
			ArrayList<Apartment> apartmentsListWithoutDuplicates = new ArrayList<>(hashSet);
			
			ArrayList<Apartment> apartments = new ArrayList<>();

			for(Apartment a : apartmentsListWithoutDuplicates){
				if((a.getDeleted() == 0) && (a.getStatusOfApartment().equals(StatusOfApartment.Aktivan))){
					apartments.add(a);
				}
				
			}	
			
			ArrayList<Apartment> finalSearchedApartments = new ArrayList<>();
			
			for(Apartment a : apartments) {
				Boolean check = false;
				
				
//				if(dateFrom != null) {
//					if(a.getReleaseDates().get(0).compareTo(startDate) > 0) {
//						continue;
//					}
//				}
//				if(dateTo != null) {
//					if(a.getReleaseDates().get(1).compareTo(endDate) < 0) {
//						continue;
//					}
//				}
				
				
				if(dateFrom != null) {
					for(PeriodOfRent periodOfRent : a.getReleaseDates()) {
						if(periodOfRent.getStartDate().compareTo(startDate) > 0) {
							continue;
						}
					}
				}
				
				if(dateTo != null) {
					for(PeriodOfRent periodOfRent : a.getReleaseDates()) {
						if(periodOfRent.getEndDate().compareTo(endDate) < 0) {
							continue;
						}
					}
				}
				
				// grad   drzava   oba
				if(!city.equals("")) {
					if(!a.getLocation().getAddress().getPopulatedPlace().equals(city)) {
						continue;
					}
				}
				if(!country.equals("") && !check) {
					if(!a.getLocation().getAddress().getCountry().equals(country)) {
						continue;
					}
				}
				
				
				if(priceFrom != -1) {
					if(a.getPricePerNight() < priceFrom) {
						continue;
					}
				}
				if(priceTo != -1) {
					if(a.getPricePerNight() > priceTo) {
						continue;
					}
				}
				if(roomsFrom != -1) {
					if(a.getNumberOfRooms() < roomsFrom) {
						continue;
					}
				}
				if(roomsTo != -1) {
					if(a.getNumberOfRooms() > roomsTo) {
						continue;
					}
				}
				if(numberOfGuests != -1) {
					if(a.getNumberOfGuests() < numberOfGuests) {
						continue;
					}
				}

				finalSearchedApartments.add(a);
			}
			
			
			if(finalSearchedApartments.isEmpty()){
				res.status(204);
				return g.toJson(finalSearchedApartments);
			}
			
			res.status(200);
			return g.toJson(finalSearchedApartments);
			
		});
	}

	public void getAllActiveApartments() {
		get("services/apartments/getAllActiveApartments", (req, res) -> {
			ArrayList<Apartment> apratments = new ArrayList<>();
			ApartmentDAO apartmentDAO = new ApartmentDAO();
			for(Apartment a : apartmentDAO.getApartmentsList()){
				if((a.getDeleted() == 0) && (a.getStatusOfApartment().equals(StatusOfApartment.Aktivan))){
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
	
	public void getAllApartments() {
		get("services/apartments/getAllApartments", (req, res) -> {
			ArrayList<Apartment> apratments = new ArrayList<>();
			ApartmentDAO apartmentDAO = new ApartmentDAO();
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
			Session ss = req.session(true);
			Host host = ss.attribute("user");
			String payload = req.body();
			ApartmentDTO apartmentDTO;
			Apartment apartment = new Apartment();
			ApartmentDAO apartmentDAO = new ApartmentDAO();
			HostDAO hostDAO = new HostDAO();
			
			try {
				apartmentDTO = g.fromJson(payload, ApartmentDTO.class); //uneo sva polja i dobio novi app
			}
			catch(Exception e) {
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
			
//			ArrayList<Date> releaseDates = new ArrayList<>();
//			releaseDates.add(startDate);
//			releaseDates.add(endDate);
			
			PeriodOfRent periodOfRent = new PeriodOfRent();
			periodOfRent.setStartDate(startDate);
			periodOfRent.setEndDate(endDate);
			
			ArrayList<PeriodOfRent> newPeriodsOfRentList  = new ArrayList<>();
			newPeriodsOfRentList.add(periodOfRent);
			
			
			
			ArrayList<String> listForConvertImage = new ArrayList<String>();
			
			try {
				
				int i = 0;
				for(String img : apartmentDTO.getPictures()){
					String path = "/img/" + apartmentDTO.getId() + i + ".jpg";
					
					apartmentDAO.decodeImagesFromString(img, path);
				 
					String newPath = "./img/" + apartmentDTO.getId() + i + ".jpg";
				 
					listForConvertImage.add(newPath);
					
					i++;
				}
				
				
				
				apartment.setId(apartmentDTO.getId());
				apartment.setTypeOfApartment(apartmentDTO.getTypeOfApartment());
				apartment.setNumberOfRooms(apartmentDTO.getNumberOfRooms());
				apartment.setNumberOfGuests(apartmentDTO.getNumberOfGuests());
				apartment.setLocation(apartmentDTO.getLocation());
				apartment.setReleaseDates(newPeriodsOfRentList);
				apartment.setFreeDates(new ArrayList<Date>());
				apartment.setHost(apartmentDTO.getHost());
				apartment.setComments(apartmentDTO.getComments());
				apartment.setPictures(listForConvertImage);
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
			
			for(Host host1 : hostDAO.getHostList()){
				if(host1.getUsername().equals(host.getUsername())){
					host1.getApartmentsForRent().add(apartment.getId());
				}
			}
			
			hostDAO.setHostList(hostDAO.getHostList());
			HostDAO.writeHostInFile(hostDAO.getHostList());
			hostDAO.fillMapWithHosts();
			
			res.status(200);
			return g.toJson("Ok");

		});
		
	}
	
	public void getActiveApratmentsForHost(){
		get("services/apartments/getActiveApratmentsForHost", (req, res) -> {
			Session ss = req.session(true);
			Host h = ss.attribute("user");
			//apartmentDAO = new ApartmentDAO();
			ApartmentDAO apartmentDAO = new ApartmentDAO();
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
			ApartmentDAO apartmentDAO = new ApartmentDAO();
			
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
			ApartmentDAO apartmentDAO = new ApartmentDAO();
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
			
			if(apartmentDTO.getReleaseDates().get(0) != null && apartmentDTO.getReleaseDates().get(1) != null) {
				for(int i = 0; i < apartmentDTO.getReleaseDates().size(); i++){
					startDate = sdf.parse(apartmentDTO.getReleaseDates().get(0));
					endDate = sdf.parse(apartmentDTO.getReleaseDates().get(1));
				}
			}
			
			
//			ArrayList<Date> releaseDates = new ArrayList<>();
//			releaseDates.add(startDate);
//			releaseDates.add(endDate);
			
			PeriodOfRent periodOfRent = new PeriodOfRent();
			ArrayList<PeriodOfRent> oldPeriodsList = new ArrayList<>();
			Apartment apartmentForSet = null;
			
			for(Apartment oldAp : apartmentDAO.getApartmentsList()) {
				if(oldAp.getId().equals(oldId)) {
					apartmentForSet = oldAp;
				}
			}
			
			
			if(startDate != null || endDate != null) {
				periodOfRent.setStartDate(startDate);
				periodOfRent.setEndDate(endDate);
			
				for(Apartment ap : apartmentDAO.getApartmentsList()) {
					if(ap.getId().equals(oldId)) {
						for(PeriodOfRent p : ap.getReleaseDates()) {
							oldPeriodsList.add(p);
						}
					}
				}
				
				oldPeriodsList.add(periodOfRent);
			}

			/*
			ArrayList<String> listForConvertImage = apartmentForSet.getPictures();

			
			if(listForConvertImage.isEmpty()){
				listForConvertImage = new ArrayList<String>();
			}
		
			int i = 0;
			
			if(listForConvertImage.size() != 0){
				i = listForConvertImage.size();
			}
			*/
			
			ArrayList<String> listForConvertImage = new ArrayList<String>();
			int i = 0;
			
			if(apartmentDTO.getPictures().size() != 0){
				i = apartmentDTO.getPictures().size();
			}
			
			try {
				
				/*
				for(String img : apartmentDTO.getPictures()){
					String path = "/img/" + apartmentDTO.getId() + i + ".jpg";
					
					apartmentDAO.decodeImagesFromString(img, path);
				 
					String newPath = "./img/" + apartmentDTO.getId() + i + ".jpg";
				 
					listForConvertImage.add(newPath);
					
					i++;
				}
				
				*/
				
				for(String img : apartmentDTO.getPictures()){
					
					if(img.startsWith("data:image")){
						String path = "/img/" + apartmentDTO.getId() + i + ".jpg";
						apartmentDAO.decodeImagesFromString(img, path);
						String newPath = "./img/" + apartmentDTO.getId() + i + ".jpg";
						listForConvertImage.add(newPath);
						
					}else{
						listForConvertImage.add(img);
					}
					
					i++;
				}
				
				
				
				
				a.setId(apartmentDTO.getId());
				a.setTypeOfApartment(apartmentDTO.getTypeOfApartment());
				a.setNumberOfRooms(apartmentDTO.getNumberOfRooms());
				a.setNumberOfGuests(apartmentDTO.getNumberOfGuests());
				a.setLocation(apartmentDTO.getLocation());
				if(startDate != null || endDate != null) {
					a.setReleaseDates(oldPeriodsList);
				} else {
					a.setReleaseDates(apartmentForSet.getReleaseDates());
				}
				a.setFreeDates(new ArrayList<Date>());
				a.setHost(apartmentDTO.getHost());
				a.setComments(apartmentDTO.getComments());
				a.setPictures(listForConvertImage);
				a.setPricePerNight(apartmentDTO.getPricePerNight());
				a.setCheckInTime(apartmentDTO.getCheckInTime());
				a.setCheckOutTime(apartmentDTO.getCheckOutTime());
				a.setStatusOfApartment(apartmentDTO.getStatusOfApartment());
				a.setAmenities(apartmentDTO.getAmenities());
				a.setReservations(apartmentDTO.getReservations());
				a.setDeleted(apartmentDTO.getDeleted());
			
				
			} catch (Exception e) {
				System.out.println("Greska pri izmeni apartmana");
				res.status(404);
				return g.toJson("Greska pri izmeni apartmana");
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
			String payload = req.body(); // id apartmana
//			Session ss = req.session(true);
//			Host host = ss.attribute("user");
			//apartmentDAO = new ApartmentDAO();
			ApartmentDAO apartmentDAO = new ApartmentDAO();
			ArrayList<Apartment> apartments = apartmentDAO.getApartmentsList();
			
			for(Apartment a : apartments){
				if(a.getId().equals(payload)){
					a.setDeleted(1);
					break;
				}
			}
//			
//			for(Host host1 : hostDAO.getHostList()){
//				if(host1.getUsername().equals(host.getUsername())){
//					host1.getApartmentsForRent().remove(payload);
//				}
//			}
//			
			HostDAO hostDAO = new HostDAO();
			for(Host h : hostDAO.getHostList()) {
				for(int i = 0; i < h.getApartmentsForRent().size(); i++) {
					if(h.getApartmentsForRent().get(i).equals(payload)) {
						h.getApartmentsForRent().remove(i);
					}
				}
			}
			
			ReservationDAO reservationDAO = new ReservationDAO();
			for(Reservation r : reservationDAO.getReservationsList()) {
				if(r.getApartment().equals(payload) && !r.getStatus().equals(StatusOfReservation.Zavrsena ) && !r.getStatus().equals(StatusOfReservation.Odustanak )) {
					r.setStatus(StatusOfReservation.Odbijena);
				}
			}
		
			reservationDAO.setReservationsList(reservationDAO.getReservationsList());
			ReservationDAO.writeReservationsInFile(reservationDAO.getReservationsList());
			reservationDAO.fillMapWithReservations();
			
			apartmentDAO.setApartmentsList(apartments);
			ApartmentDAO.writeApartmentsInFile(apartmentDAO.getApartmentsList());
			apartmentDAO.fillMapWithApartments();
			
			hostDAO.setHostList(hostDAO.getHostList());
			HostDAO.writeHostInFile(hostDAO.getHostList());
			hostDAO.fillMapWithHosts();
			
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
