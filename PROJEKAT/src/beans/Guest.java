package beans;

import java.util.ArrayList;

import enums.Role;

public class Guest extends User {

	private ArrayList<Apartment> rentApartments;
	private ArrayList<Reservation> reservations;
	
	public Guest() {
		super();
		this.setName("");
		this.setSurname("");
		this.setUsername("");
		this.setPassword("");
		this.setGender(null);
		this.setRole(Role.Guest);
		this.rentApartments = new ArrayList<Apartment>();
		this.reservations = new ArrayList<Reservation>();
	}
	
	public Guest(Guest guest) {
		this.setName(guest.getName());
		this.setSurname(guest.getSurname());
		this.setUsername(guest.getUsername());
		this.setPassword(guest.getPassword());
		this.setGender(guest.getGender());
		this.setRole(guest.getRole());
		this.rentApartments = guest.rentApartments;
		this.reservations = guest.reservations;
	}

	public ArrayList<Apartment> getRentApartments() {
		return rentApartments;
	}

	public void setRentApartments(ArrayList<Apartment> rentApartments) {
		this.rentApartments = rentApartments;
	}

	public ArrayList<Reservation> getReservations() {
		return reservations;
	}

	public void setReservations(ArrayList<Reservation> reservations) {
		this.reservations = reservations;
	}
	
	
}
