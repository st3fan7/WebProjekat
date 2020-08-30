package services;


import static spark.Spark.get;
import static spark.Spark.post;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.stream.Collectors;

import com.google.gson.Gson;

import beans.Admin;
import beans.Guest;
import beans.Host;
import beans.User;
import dao.AdminDAO;
import dao.GuestDAO;
import dao.HostDAO;
import enums.Gender;
import spark.Session;

public class UserService {
	
	private static Gson g = new Gson();
	HostDAO hostDAO = new HostDAO();
	AdminDAO adminDAO = new AdminDAO();
	GuestDAO guestDAO = new GuestDAO();
	ArrayList<User> allUsers = new ArrayList<User>();
	
	public UserService(){
	 loginUsers();	
	 logoutUser();
	 register();
	 changeProfile();
	 getAllUsers();
	 searchAdminUsersByRoleAndGender();
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
			String payload = req.body();
			String username = req.queryMap("username").value();
			String role = req.queryMap("role").value();		
		
			if(role.equals("admin")){
				Admin a = g.fromJson(payload, Admin.class);
				adminDAO.editAdmin(a, username);
				AdminDAO.writeAdminInFile(adminDAO.getAdminList());
				ss.attribute("user", adminDAO.getAdminsMap().get(a.getUsername()));
				res.status(200);
				return ("OK");
			}else if(role.equals("domacin")){
				Host h = g.fromJson(payload, Host.class);
				hostDAO.editHost(h, username);
				HostDAO.writeHostInFile(hostDAO.getHostList());
				ss.attribute("user", hostDAO.getHostsMap().get(h.getUsername()));
				res.status(200);
				return ("OK");
			}else if(role.equals("gost")){
				Guest guest = g.fromJson(payload, Guest.class);
				guestDAO.editGuest(guest, username);
				GuestDAO.writeGuestInFile(guestDAO.getGuestList());
				ss.attribute("user", guestDAO.getGuestsMap().get(guest.getUsername()));
				res.status(200);
				return ("OK");
			}else{
				res.status(400);
				return ("400 Bad Request");
			}
		
	
			/*
			User u = g.fromJson(payload, User.class);

			if(u.getRole().toString() == "admin") {
				adminDAO.editAdmin((Admin)u, username);
				AdminDAO.writeAdminInFile(adminDAO.getAdminList());
				ss.attribute("user", adminDAO.getAdminsMap().get(u.getUsername()));
				res.status(200);
				return ("OK");
			} else if(u.getRole().toString() == "domacin") {
				System.out.println("USAAO2");
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
			*/
			

		});
	}
	
	public void getAllUsers(){
		
		get("services/users/getAllUsers", (req,res) -> {
			Session ss = req.session(true);			
			
			allUsers = new ArrayList<User>();
			
			for(Guest guest : guestDAO.getGuestList()){
				allUsers.add(guest);
			}
			
			for(Host h : hostDAO.getHostList()){
				allUsers.add(h);
			}
			
			for(Admin a : adminDAO.getAdminList()){
				allUsers.add(a);
			}
			
			return g.toJson(allUsers);
		});
		
	}
	
	public void searchAdminUsersByRoleAndGender(){
	
		get("services/users/searchAdminUsersByRoleAndGender", (req,res) -> {
			String role = req.queryMap("role").value();
			String gender = req.queryMap("gender").value();
			ArrayList<User> searchedUsers = new ArrayList<User>();
			
			/*
			for(User user : allUsers){
				if(user.getRole().toString().equals(role)){
					searchedUsers.add(user);
				}							
			}
		
			for(User user : allUsers){;			
				if(user.getGender().toString().equals(gender)){
					searchedUsers.add(user);
				}
			}
			
			Collection<User> finalList = searchedUsers.stream().collect(Collectors.toSet());
		
			
			
			
			
			
			if(finalList.isEmpty()){
				res.status(204);
				return g.toJson(allUsers);
			}
								
			res.status(200);
			return g.toJson(finalList);
			*/
			
			if(role.equals("uloga") && gender.equals("pol")){
				res.status(200);
				return g.toJson(allUsers);	
				
			}else if(!(role.equals("uloga")) && gender.equals("pol")){
				for(User user : allUsers){
					if(user.getRole().toString().equals(role)){
						searchedUsers.add(user);
					}							
				}
				
				res.status(200);
				return g.toJson(searchedUsers);
				
			}else if(role.equals("uloga") && !(gender.equals("pol"))){
				for(User user : allUsers){		
					if(user.getGender().toString().equals(gender)){
						searchedUsers.add(user);
					}
				}
				
				res.status(200);
				return g.toJson(searchedUsers);
				
			}else if(!(role.equals("uloga")) && !(gender.equals("pol"))){
				
				for(User user : allUsers){		
					if(user.getGender().toString().equals(gender) && user.getRole().toString().equals(role) ){
						searchedUsers.add(user);
					}
				}
				
				res.status(200);
				return g.toJson(searchedUsers);
			}
			
			res.status(204);
			return g.toJson(allUsers);
			
			
			
		});
		
		/*
		get("services/users/searchAdminUsersByGender", (req,res) -> {
			String gender = req.queryMap("gender").value();
			ArrayList<User> searchedByGender = new ArrayList<User>();
			for(User user : allUsers){;			
				if(user.getGender().toString().equals(gender)){
					searchedByGender.add(user);
				}
			}
			
			if(searchedByGender.isEmpty()){
				res.status(204);
				return g.toJson(allUsers);
			}
								
			res.status(200);
			return g.toJson(searchedByGender);
			
		});
		*/
		
		
		
		
	}
	
	
	
	
}

