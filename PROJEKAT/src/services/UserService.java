package services;


import static spark.Spark.get;
import static spark.Spark.post;

import java.util.ArrayList;

import com.google.gson.Gson;

import beans.Admin;
import beans.Guest;
import beans.Host;
import beans.User;
import dao.AdminDAO;
import dao.GuestDAO;
import dao.HostDAO;
import spark.Session;

public class UserService {
	
	private static Gson g = new Gson();
	HostDAO hostDAO = new HostDAO();
	AdminDAO adminDAO = new AdminDAO();
	GuestDAO guestDAO = new GuestDAO();
	
	public UserService(){
	 loginUsers();	
	 logoutUser();
	 register();
	 changeProfile();
	}
	
	public void loginUsers(){//FUNKCIJA 
		
		get("services/users/getUserByUsername", (req, res) -> {
			res.type("guestDAOlication/json");
			
			User u = null;
			Host h = hostDAO.getHostID(req.queryMap("username").value());
			
			if(h == null) {
				Admin a = adminDAO.getAdminID(req.queryMap("username").value());
				
				if(a == null) {
					Guest g = guestDAO.getGuestID(req.queryMap("username").value());
					
					if(g != null) {
						u = g;
					}
					
				} else {
					u = a;
				}
			} else {
				u = h;
			}

			String password = req.queryMap("password").value();
			
			if (password.equals("")) {
				return ("204");
			}
			
			if(u == null){
				return ("Korisnik : " + req.queryMap().value("username") + " ne postoji!");
				
			}else{
				
				if (u.getPassword().equals(password)) {
					Session ss = req.session(true);
					ss.attribute("user", u);
					return ("200");
				} else {
					return ("Pogrešna lozinka!");
				}
			}
								
		});
		
		get("services/users/getActiveUser", (req, res) -> {
			res.type("guestDAOlication/json");
			Session ss = req.session(true);			
			User u = ss.attribute("user");

			return g.toJson(u);
		});
		
	}
	
	public void logoutUser() {
		get("services/users/logout", (req, res) -> {
			Session ss = req.session(false);
			ss.invalidate();
			res.status(200);
			return "OK";

		});
	}
	
	
	public void register() {
		post("services/users/register", (req, res) -> {
			res.type("guestDAOlication/json");
			String payload = req.body();
			Guest guest;
			
			try {
				guest = g.fromJson(payload, Guest.class);
			}
			catch(Exception e) {
				res.status(400);
				return g.toJson("Bad request");
			}
			
			if (guestDAO.getGuestID(guest.getUsername()) != null) {
				res.status(201);
				return g.toJson("Vec postoji!");

			}
			
			
			ArrayList<Guest> guests = guestDAO.getGuestList();
			guests.add(guest);
			guestDAO.setGuestList(guests);
			GuestDAO.writeGuestInFile(guestDAO.getGuestList());
			guestDAO.fillMapWithGuests();
			res.status(200);
			Session ss = req.session(true);
			ss.attribute("user", guest);
			return g.toJson("Ok");

		});
	}
	
	public void changeProfile() {
		post("services/users/changeProfile", (req, res) -> {
			Session ss = req.session(true);
			System.out.println("usao");
			String payload = req.body();
			String username = req.queryMap("username").value();
			User u = g.fromJson(payload, User.class);


			if(u.getRole().toString() == "admin") {
				adminDAO.editAdmin((Admin)u, username);
				AdminDAO.writeAdminInFile(adminDAO.getAdminList());
				ss.attribute("user", adminDAO.getAdminsMap().get(u.getUsername()));
				res.status(200);
				return ("OK");
			} else if(u.getRole().toString() == "domacin") {
				hostDAO.editHost((Host)u, username);
				HostDAO.writeHostInFile(hostDAO.getHostList());
				ss.attribute("user", hostDAO.getHostsMap().get(u.getUsername()));
				res.status(200);
				return ("OK");
			} else if(u.getRole().toString() == "gost") {
				guestDAO.editGuest((Guest)u, username);
				GuestDAO.writeGuestInFile(guestDAO.getGuestList());
				ss.attribute("user", guestDAO.getGuestsMap().get(u.getUsername()));
				res.status(200);
				return ("OK");
			} else {
				res.status(400);
				return ("400 Bad Request");
			}

		});
	}
}

