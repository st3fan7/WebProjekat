package services;

import static spark.Spark.get;
import static spark.Spark.post;

import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;

import beans.Guest;
import beans.Host;
import beans.Reservation;
import dao.AdminDAO;
import dao.GuestDAO;
import dao.HostDAO;
import dao.ReservationDAO;
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
	}
	
	private void checkGuestReservationsForChosenApartment() {
		get("services/reservations/checkGuestReservationsForChosenApartment", (req, res) -> {
			res.type("application/json");
			String apartment = req.queryMap("apartmentID").value();
			String wantedGuest = req.queryParams("guest");
			
			Guest guest = null;
			for(Guest g : guestDAO.getGuestList()) {
				if(g.getUsername().equals(wantedGuest)) {
					guest = g;
					break;
				}
			}

			for(String guestsReservation : guest.getReservations()) {
					if(reservationDAO.getReservationsMap().get(guestsReservation).getApartment().equals(apartment) &&
							(reservationDAO.getReservationsMap().get(guestsReservation).getStatus().toString().equals("Odbijena") ||
									reservationDAO.getReservationsMap().get(guestsReservation).getStatus().toString().equals("Zavrsena"))) {
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

            for(Reservation r : reservationDAO.getReservationsList() ) {
                for(String apartment : host.getApartmentsForRent()) {
                    if(r.getApartment().equals(apartment)) {
                        reservations.add(r);
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

            for(Reservation r : reservationDAO.getReservationsList()){
            	for(String rg : guest.getReservations()){
            		if(r.getId().equals(rg)){
            			reservations.add(r);
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
            
			if(reservationDAO.getReservationsList().isEmpty()) {
                res.status(204);
                return ("No content");
            }

            res.status(200);
            return g.toJson(reservationDAO.getReservationsList() );
        });


    }
	
	private void saveChangedReservations() {
		post("services/reservation/saveChangedReservations", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			ArrayList<Reservation> reservations = null; 
			ArrayList<Reservation> allReservations = reservationDAO.getReservationsList(); 
			ArrayList<Reservation> allReservationsEmpty = new ArrayList<Reservation>();
			
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
	
	

}
