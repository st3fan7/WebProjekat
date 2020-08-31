package services;

import static spark.Spark.get;

import java.util.ArrayList;

import com.google.gson.Gson;

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
}
