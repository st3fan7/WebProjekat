package beans;

import enums.Role;

public class Admin extends User {
	
	public Admin() {
		super();
		this.setName("");
		this.setSurname("");
		this.setUsername("");
		this.setPassword("");
		this.setBlocked(false);
		this.setGender(null);
		this.setRole(Role.admin);
	}
	
	public Admin(Admin admin) {
		this.setName(admin.getName());
		this.setSurname(admin.getSurname());
		this.setUsername(admin.getUsername());
		this.setPassword(admin.getPassword());
		this.setGender(admin.getGender());
		this.setRole(admin.getRole());
		this.setBlocked(admin.getBlocked());
	}
}
