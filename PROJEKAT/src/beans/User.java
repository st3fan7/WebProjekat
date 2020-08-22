package beans;

import java.util.ArrayList;

import enums.Gender;
import enums.Role;

public class User {
	private String username;
	private String password;
	private String name;
	private String surname;
	private Gender gender;
	private Role role;
	private ArrayList<Apartment> apartments;
	private ArrayList<Reservation> reservations;
	
	public User() {
		super();
	}

	public User(String username, String password, String name, String surname, Gender gender, Role role) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.role = role;
		this.apartments = new ArrayList<Apartment>();
		this.reservations =  new ArrayList<Reservation>();
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public ArrayList<Apartment> getApartments() {
		return apartments;
	}

	public void setApartments(ArrayList<Apartment> apartments) {
		this.apartments = apartments;
	}

	public ArrayList<Reservation> getReservations() {
		return reservations;
	}

	public void setReservations(ArrayList<Reservation> reservations) {
		this.reservations = reservations;
	}

	@Override
	public String toString() {
		return "User [username=" + username + ", password=" + password + ", name=" + name + ", surname=" + surname
				+ ", gender=" + gender + ", role=" + role + ", apartments=" + apartments + ", reservations="
				+ reservations + "]";
	}
	
	
	
	
}
