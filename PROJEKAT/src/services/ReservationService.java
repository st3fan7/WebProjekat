package services;

import static spark.Spark.get;
import static spark.Spark.post;

import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;

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
		getAllReservationsByHost();
		getAllReservations();
		saveChangedReservations();
	}

	private void getAllReservationsByHost() {
		
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


    }
	
	private void getAllReservations() {
		
		get("services/reservations/getAllReservations", (req, res) -> {
            
			if(reservationDAO.getReservationsList() .isEmpty()) {
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
			
			try {
				Type listType = new TypeToken<ArrayList<Reservation>>(){}.getType();
				reservations = g.fromJson(payload, listType);	
			}
			catch(Exception e) {
				res.status(400);
				return g.toJson("Bad request");
			}
			
			
			reservationDAO.setReservationsList(reservations);
			ReservationDAO.writeReservationsInFile(reservationDAO.getReservationsList());
			reservationDAO.fillMapWithReservations();
			
			res.status(200);
			return g.toJson("ok");

		});
	
	}

}
