package beans;

import java.util.ArrayList;

import enums.Role;

public class Guest extends User {

	private ArrayList<String> rentApartments;
	private ArrayList<String> reservations;
	
	public Guest() {
		super();
		this.setName("");
		this.setSurname("");
		this.setUsername("");
		this.setPassword("");
		this.setGender(null);
		this.setRole(Role.gost);
		this.rentApartments = new ArrayList<String>();
		this.reservations = new ArrayList<String>();
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

	public ArrayList<String> getRentApartments() {
		return rentApartments;
	}

	public void setRentApartments(ArrayList<String> rentApartments) {
		this.rentApartments = rentApartments;
	}

	public ArrayList<String> getReservations() {
		return reservations;
	}

	public void setReservations(ArrayList<String> reservations) {
		this.reservations = reservations;
	}
	
	
}
