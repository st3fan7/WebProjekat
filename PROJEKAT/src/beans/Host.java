package beans;

import java.util.ArrayList;

import enums.Role;

public class Host extends User {
	private ArrayList<Apartment> apartmentsForRent;
	
	public Host() {
		super();
		this.setName("");
		this.setSurname("");
		this.setUsername("");
		this.setPassword("");
		this.setGender(null);
		this.setRole(Role.Host);
		this.apartmentsForRent = new ArrayList<Apartment>();
	}
	
	public Host(Host host) {
		this.setName(host.getName());
		this.setSurname(host.getSurname());
		this.setUsername(host.getUsername());
		this.setPassword(host.getPassword());
		this.setGender(host.getGender());
		this.setRole(host.getRole());
		this.apartmentsForRent = host.apartmentsForRent;
	}

	public ArrayList<Apartment> getApartmentsForRent() {
		return apartmentsForRent;
	}

	public void setApartmentsForRent(ArrayList<Apartment> apartmentsForRent) {
		this.apartmentsForRent = apartmentsForRent;
	}
	
}
