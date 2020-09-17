package services;

import static spark.Spark.get;
import static spark.Spark.post;

import java.util.ArrayList;
import java.util.Date;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.text.SimpleDateFormat;

import beans.Apartment;
import beans.Comment;
import beans.Guest;
import beans.Host;
import beans.PeriodOfRent;
import beans.Reservation;
import dao.AdminDAO;
import dao.ApartmentDAO;
import dao.GuestDAO;
import dao.HostDAO;
import dao.ReservationDAO;
import dto.ApartmentDTO;
import dto.ReservationDTO;
import enums.StatusOfApartment;
import enums.StatusOfReservation;
import spark.Session;

public class ReservationService {
	
	private static Gson g = new Gson();
	HostDAO hostDAO = new HostDAO();
	AdminDAO adminDAO = new AdminDAO();
	GuestDAO guestDAO = new GuestDAO();
	ReservationDAO reservationDAO = new ReservationDAO();
	
	public ReservationService() {
		getAllReservationsByHostAndGuest();
		getAllReservations();
		saveChangedReservations();
		filterByStatus();
		checkGuestReservationsForChosenApartment();
		createReservation();
		getReservationID();
		getReservationForApartment();
	}
	
	private void checkGuestReservationsForChosenApartment() {
		get("services/reservations/checkGuestReservationsForChosenApartment", (req, res) -> {
			res.type("application/json");
			String apartment = req.queryMap("apartmentID").value();
			String wantedGuest = req.queryParams("guest");
			GuestDAO guestDAO = new GuestDAO();
			ReservationDAO reservationDAO = new ReservationDAO();
			
			Guest guest = null;
			for(Guest g : guestDAO.getGuestList()) {
				if(g.getUsername().equals(wantedGuest)) {
					guest = g;
					break;
				}
			}
			
			
			
			for(String guestsReservation : guest.getReservations()) {
				
					if(reservationDAO.getReservationsMap().get(guestsReservation.toLowerCase()).getApartment().equals(apartment) &&
							(reservationDAO.getReservationsMap().get(guestsReservation.toLowerCase()).getStatus().toString().equals("Odbijena") ||
									reservationDAO.getReservationsMap().get(guestsReservation.toLowerCase()).getStatus().toString().equals("Zavrsena"))) {
						res.status(200);
						return "ok";
					}	
			}

			
			res.status(204);
			return "No content";	
		});
	}

	private void getAllReservationsByHostAndGuest() {
		
		get("services/reservations/getAllReservationsForHost", (req, res) -> {
            Session ss = req.session(true);
            Host host = ss.attribute("user");
            ArrayList<Reservation> reservations = new ArrayList<>();
            ReservationDAO reservationDAO = new ReservationDAO();
            ApartmentDAO apartmentDAO = new ApartmentDAO();
            
            for(Reservation r : reservationDAO.getReservationsList() ) {
                for(String apartment : host.getApartmentsForRent()) {
                    if(r.getApartment().equals(apartment)) {
                    	for(Apartment a : apartmentDAO.getApartmentsList()) {
                    		if(a.getId().equals(apartment) && a.getDeleted() == 0) {
                    			reservations.add(r);
                    		}
                    	}
                    	
                    	
                        
                    }
                }
            }

            if(reservations.isEmpty()) {
                res.status(204);
                return ("No content");
            }
          

            res.status(200);
            return g.toJson(reservations);
        });
		
		
		get("services/reservations/getAllReservationsForGuest", (req, res) -> {
            Session ss = req.session(true);
            Guest guest = ss.attribute("user");
            ArrayList<Reservation> reservations = new ArrayList<>();
            ReservationDAO reservationDAO = new ReservationDAO();
            GuestDAO guestDAO = new GuestDAO();
            ApartmentDAO apartmentDAO = new ApartmentDAO();
            
            for(Guest guestOne : guestDAO.getGuestList()){
            	if(guestOne.getUsername().equals(guest.getUsername())){
            		guest = guestOne;
            	}
            }
            
            
            for(Reservation r : reservationDAO.getReservationsList()){
            	for(String rg : guest.getReservations()){
            		if(r.getId().equals(rg)){
            			for(Apartment a : apartmentDAO.getApartmentsList()) {
            				if(a.getId().equals(r.getApartment()) && a.getDeleted() == 0) {
            					reservations.add(r);
            				}
            			}
            		}
            	}
            }

            if(reservations.isEmpty()) {
                res.status(204);
                return ("No content");
            }
          

            res.status(200);
            return g.toJson(reservations);
        });


    }
	
	private void getAllReservations() {
		
		get("services/reservations/getAllReservations", (req, res) -> {
            ReservationDAO reservationDAO = new ReservationDAO();
            ApartmentDAO apartmentDAO = new ApartmentDAO();
            ArrayList<Reservation> reservations = new ArrayList<>();
            
			if(reservationDAO.getReservationsList().isEmpty()) {
                res.status(204);
                return ("No content");
            }
			
			
			for(Reservation r : reservationDAO.getReservationsList()) {
				for(Apartment a : apartmentDAO.getApartmentsList()) {
					if(r.getApartment().equals(a.getId()) && a.getDeleted() == 0) {
						reservations.add(r);
					}
				}
			}
			
			if(reservations.isEmpty()) {
                res.status(204);
                return ("No content");
            }
			

            res.status(200);
            return g.toJson(reservations );
        });


    }
	
	private void saveChangedReservations() {
		post("services/reservation/saveChangedReservations", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			ArrayList<Reservation> reservations = null; 
			ArrayList<Reservation> allReservations = reservationDAO.getReservationsList(); 
			ArrayList<Reservation> allReservationsEmpty = new ArrayList<Reservation>();
			ReservationDAO reservationDAO = new ReservationDAO();
			
			try {
				Type listType = new TypeToken<ArrayList<Reservation>>(){}.getType(); 
				reservations = g.fromJson(payload, listType);	
			}
			catch(Exception e) {
				res.status(400);
				return g.toJson("Bad request");
			}
			
			
			for(Reservation r1 : allReservations){ 
				for(Reservation r2 : reservations){ 
					if(r1.getId().equals(r2.getId())){
						allReservationsEmpty.add(r1); 
					}
				}
			}

			
			allReservations.removeAll(allReservationsEmpty);		
			allReservations.addAll(reservations);
			
			reservationDAO.setReservationsList(allReservations);
			ReservationDAO.writeReservationsInFile(reservationDAO.getReservationsList());
			reservationDAO.fillMapWithReservations();
			
			res.status(200);
			return g.toJson("ok");

		});
	
	}
	
	public void filterByStatus() {
		post("services/reservation/filterByStatus", (req, res) -> {
			res.type("application/json");
			
			String checkedStatus = req.queryParams("checkedStatus");
			String[] partsOfCheckedStatus = checkedStatus.split(","); 
			ArrayList<Reservation> filterReservation = new ArrayList<>();
			
			String payload = req.body();			
			ArrayList<Reservation> reservations = null;
			
			try {
				Type listType = new TypeToken<ArrayList<Reservation>>(){}.getType(); 
				reservations = g.fromJson(payload, listType);	
			}
			catch(Exception e) {
				res.status(400);
				return g.toJson("Bad request");
			}
			
			for(int i = 0; i < partsOfCheckedStatus.length; i++) {
				for(Reservation r : reservations) {
					if(r.getStatus().toString().equals(partsOfCheckedStatus[i])) {
						filterReservation.add(r);
					}
				}
			}
			
			if(filterReservation.isEmpty()) {
				res.status(204);
				return "No content";
			}
			
            res.status(200);
            return g.toJson(filterReservation);
		});
	}
	
	public void createReservation() {
		post("services/reservation/createReservation", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			Session ss = req.session(true);
			Guest guest = ss.attribute("user");
			ReservationDTO reservationDTO;
			Reservation reservation = new Reservation();
			GuestDAO guestDAO = new GuestDAO();
			ReservationDAO reservationDAO = new ReservationDAO();
			//System.out.println(payload);
			
			try {
				reservationDTO = g.fromJson(payload, ReservationDTO.class);
			}
			catch(Exception e) {
				res.status(400);
				return g.toJson("Bad request");
			}
			
			Date startDateOfRes = null;
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
			startDateOfRes = sdf.parse(reservationDTO.getStartDate());
			
			try {
				reservation.setId(reservationDTO.getId());
				reservation.setApartment(reservationDTO.getApartment());
				reservation.setNumberOfNight(reservationDTO.getNumberOfNight());
				reservation.setTotalCost(reservationDTO.getTotalCost());
				reservation.setMessageForReservation(reservationDTO.getMessageForReservation());
				reservation.setGuest(reservationDTO.getGuest());
				reservation.setStartDate(startDateOfRes);
				reservation.setStatus(StatusOfReservation.Kreirana);
			
				
			} catch (Exception e) {
				System.out.println("Greska pri kreiranju rezervacije");
			}
			
			
			Date endDateOfRes  = new Date(reservation.getStartDate().getTime() + reservation.getNumberOfNight()*24L*60*60*1000);
			
		
			
			//ovde proveravam da li je dobro zakazao rezervaciju na osnovu vec postojecih rezervacija
			boolean flag = true;
			
			ApartmentDAO apartmentdao = new ApartmentDAO();
			//ovde proveravam da li je dobro zakazao rezervaciju na osnovu datuma vazenja apartmana koji zadaje domacin
			
			for(Apartment a : apartmentdao.getApartmentsList()){ //kroz sve apartmane, daj mi taj apartman da je aktivan i nije obrisan
				if(a.getId().equals(reservation.getApartment()) && (a.getStatusOfApartment().equals(StatusOfApartment.Aktivan)) && (a.getDeleted() == 0)){
					for(PeriodOfRent p : a.getReleaseDates()){
						
						/*
						if(startDateOfRes.compareTo(p.getStartDate()) < 0 && endDateOfRes.compareTo(p.getEndDate()) > 0){ 
							//ap vazi od 15.9 do 20.9
							//uneo sam   14.9 do 21.9
							flag = false;
						}else if(startDateOfRes.compareTo(p.getStartDate()) > 0 && endDateOfRes.compareTo(p.getEndDate()) > 0){
							flag = false;
							//ap vazi od 15.9 do 20.9
							//uneo sam    17.9. do 23.9
						}*/
						
						if(startDateOfRes.compareTo(p.getStartDate()) >= 0 && endDateOfRes.compareTo(p.getEndDate()) <= 0){
							flag = true;
							break;
						}else {
							flag = false;
						}
						
					}
					
				}				
			}
			
			
			for(Reservation r : reservationDAO.getReservationsList()){
				if(r.getApartment().equals(reservation.getApartment()) &&  
						(r.getStatus().equals(StatusOfReservation.Kreirana) || r.getStatus().equals(StatusOfReservation.Prihvacena))){
					
					Date endDateTemp = new Date(r.getStartDate().getTime() + r.getNumberOfNight()*24L*60*60*1000);			
					
					if(startDateOfRes.compareTo(r.getStartDate()) >= 0 && (endDateOfRes.compareTo(endDateTemp) <= 0)){ //ne sme: unutar postojeceg
						flag = false;
					}else if(startDateOfRes.compareTo(r.getStartDate()) <= 0 && (endDateOfRes.compareTo(endDateTemp) <= 0) && 
							(endDateOfRes.compareTo(r.getStartDate()) > 0)){ //ne sme: pocetni je ok ali krajnji je unutar
						flag = false;
					}else if(startDateOfRes.compareTo(r.getStartDate()) >= 0 && (startDateOfRes.compareTo(endDateTemp) < 0) &&
							(endDateOfRes.compareTo(endDateTemp) >= 0)){ //ne sme: pocetni je unutar ali krajnji je van  
						flag = false;
					}else if(startDateOfRes.compareTo(r.getStartDate()) <= 0 && ((endDateOfRes.compareTo(r.getStartDate()) > 0)
							|| endDateOfRes.compareTo(endDateTemp) >= 0)){
							//moja 29.9                postoji 30.9              moja 29.10              postoji15.10      moja njpoc njegrakj mojkraj
						flag = false;
					}
				}
			}
			
			
			
			
			
			
			
			
			if(flag == true){
			ArrayList<Reservation> resevations = reservationDAO.getReservationsList(); 
			resevations.add(reservation);		
			reservationDAO.setReservationsList(resevations);
			ReservationDAO.writeReservationsInFile(reservationDAO.getReservationsList());
			reservationDAO.fillMapWithReservations();
			
			
			for(Guest guest1 : guestDAO.getGuestList()){
				if(guest1.getUsername().equals(guest.getUsername())){
					guest1.getReservations().add(reservation.getId());
					guest1.getRentApartments().add(reservation.getApartment());
				}
			}
			
			guestDAO.setGuestList(guestDAO.getGuestList());
			GuestDAO.writeGuestInFile(guestDAO.getGuestList());
			guestDAO.fillMapWithGuests();
			
			
			ApartmentDAO apartmentDAO = new ApartmentDAO();
			for(Apartment a : apartmentDAO.getApartmentsList()){
				if(a.getId().equals(reservation.getApartment())){
					a.getReservations().add(reservation.getId());
				}
			}
			
			apartmentDAO.setApartmentsList(apartmentDAO.getApartmentsList());
			ApartmentDAO.writeApartmentsInFile(apartmentDAO.getApartmentsList());
			apartmentDAO.fillMapWithApartments();
			
			res.status(200);
			return g.toJson("Ok");
			}
			else{
				res.status(201);
				return g.toJson("Greska pri unosu datuma");
			}

		});
	}
	
	private void getReservationID() {
		get("services/reservations/getReservationID", (req, res) -> {
			int maxID = 0;
			Reservation reservation = new Reservation();
			
			
			for(int i = 0; i < reservationDAO.getReservationsList().size(); i++) {
				
					String iNumberParts = reservationDAO.getReservationsList().get(i).getId().substring(1);
					
					if(Integer.parseInt(iNumberParts) > maxID) {
						maxID = Integer.parseInt(iNumberParts);
					} 
			}

			maxID++;
			
            res.status(200);
            return g.toJson(maxID);
			
		});
	}
	
	private void getReservationForApartment() {
		get("services/reservations/getReservationForApartment", (req, res) -> {
			
			String aprtmentId = req.queryMap("id").value();
			ArrayList<Reservation> reservations = new ArrayList<Reservation>();
			ReservationDAO reservationDAO = new ReservationDAO();
			
			for(Reservation r : reservationDAO.getReservationsList()){
				if(r.getApartment().equals(aprtmentId)){
					reservations.add(r);
				}
			}
			
			if(reservations.isEmpty()){
				res.status(204);
				return "No content";
			}
			
			
			res.status(200);
			return g.toJson(reservations);
			
		});
	}
	
	

}
