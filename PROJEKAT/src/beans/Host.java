package beans;

import java.util.ArrayList;

import enums.Role;

public class Host extends User {
	private ArrayList<String> apartmentsForRent;
	
	public Host() {
		super();
		this.setName("");
		this.setSurname("");
		this.setUsername("");
		this.setPassword("");
		this.setGender(null);
		this.setBlocked(false);
		this.setRole(Role.domacin);
		this.apartmentsForRent = new ArrayList<String>();
	}
	
	public Host(Host host) {
		this.setName(host.getName());
		this.setSurname(host.getSurname());
		this.setUsername(host.getUsername());
		this.setPassword(host.getPassword());
		this.setGender(host.getGender());
		this.setRole(host.getRole());
		this.setBlocked(host.getBlocked());
		this.apartmentsForRent = host.apartmentsForRent;
	}

	public ArrayList<String> getApartmentsForRent() {
		return apartmentsForRent;
	}

	public void setApartmentsForRent(ArrayList<String> apartmentsForRent) {
		this.apartmentsForRent = apartmentsForRent;
	}
	
}
