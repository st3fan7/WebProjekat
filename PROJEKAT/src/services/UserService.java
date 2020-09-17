package services;


import static spark.Spark.get;
import static spark.Spark.post;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Admin;
import beans.Apartment;
import beans.Comment;
import beans.Guest;
import beans.Host;
import beans.Reservation;
import beans.User;
import dao.AdminDAO;
import dao.ApartmentDAO;
import dao.GuestDAO;
import dao.HostDAO;
import dao.ReservationDAO;
import enums.Role;
import spark.Session;
import spark.Request;

public class UserService {
	
	private static Gson g = new Gson();
	HostDAO hostDAO = new HostDAO();
	AdminDAO adminDAO = new AdminDAO();
	GuestDAO guestDAO = new GuestDAO();
	ReservationDAO reservationDAO = new ReservationDAO();
	ArrayList<User> allUsers = new ArrayList<User>();
	
	public UserService(){
		blockUser();
		 loginUsers();	
		 logoutUser();
		 register();
		 changeProfile();
		 getAllUsers();
		 getHostUsers();
		 searchAdminUsersByRoleAndGender();
		 checkForbiddenUser();
		 addNewHost();
	}
	
	private void blockUser() {
		post("services/users/blockUser", (req, res) -> {
			res.type("application/json");
			HostDAO hostDAO = new HostDAO();
			AdminDAO adminDAO = new AdminDAO();
			GuestDAO guestDAO = new GuestDAO();
			
			String id = req.body();
			
			if(hostDAO.getHostsMap().get(id) != null) {
				for(Host h : hostDAO.getHostList()) {
					if(h.getUsername().equals(id)) {
						if(h.getBlocked() == true) {
							h.setBlocked(false);
						} else {
							h.setBlocked(true);
						}
						
					}
				}
				for(Host h : hostDAO.getHostList()) {
					System.out.println(h.getBlocked() + " " + h.getUsername());
				}
				
				hostDAO.setHostList(hostDAO.getHostList());
				HostDAO.writeHostInFile(hostDAO.getHostList());
				hostDAO.fillMapWithHosts();
				System.out.println("--------------");
				for(Host h : hostDAO.getHostList()) {
					System.out.println(h.getBlocked() + " " + h.getUsername());
				}
				
				ArrayList<User> allUsers = new ArrayList<User>();
				
				for(Guest guest : guestDAO.getGuestList()){
					allUsers.add(guest);
				}
				
				for(Host h : hostDAO.getHostList()){
					allUsers.add(h);
				}
				
				for(Admin a : adminDAO.getAdminList()){
					allUsers.add(a);
				}
				
				res.status(200);
				return g.toJson(allUsers);

			}
			
			if(guestDAO.getGuestsMap().get(id) != null) {
				for(Guest g : guestDAO.getGuestList()) {
					if(g.getUsername().equals(id)) {
						if(g.getBlocked() == true) {
							g.setBlocked(false);
						} else {
							g.setBlocked(true);
						}
						
					}
				}
				
				guestDAO.setGuestList(guestDAO.getGuestList());
				GuestDAO.writeGuestInFile(guestDAO.getGuestList());
				guestDAO.fillMapWithGuests();
				
				ArrayList<User> allUsers = new ArrayList<User>();
				
				for(Guest guest : guestDAO.getGuestList()){
					allUsers.add(guest);
				}
				
				for(Host h : hostDAO.getHostList()){
					allUsers.add(h);
				}
				
				for(Admin a : adminDAO.getAdminList()){
					allUsers.add(a);
				}
				
				res.status(200);
				return g.toJson(allUsers);
			}
			
			res.status(204);
			return g.toJson("No content");
		});
	
	}
	
	public void loginUsers(){//FUNKCIJA 
		
		get("services/users/getUserByUsername", (req, res) -> {
			res.type("application/json");
			HostDAO hostDAO = new HostDAO();
			AdminDAO adminDAO = new AdminDAO();
			GuestDAO guestDAO = new GuestDAO();
			
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
					if(u.getBlocked().equals(true)) {
						return ("Vaš nalog je blokiran!");
					}
					Session ss = req.session(true);
					ss.attribute("user", u);
					return ("200");
				} else {
					return ("Pogrešna lozinka!");
				}
			}
								
		});
		
		get("services/users/getActiveUser", (req, res) -> {
			res.type("application/json");
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
			res.type("application/json");
			GuestDAO guestDAO = new GuestDAO();
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
			HostDAO hostDAO = new HostDAO();
			AdminDAO adminDAO = new AdminDAO();
			GuestDAO guestDAO = new GuestDAO();
		
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


		});
	}
	
	public void getAllUsers(){
		
		get("services/users/getAllUsers", (req,res) -> {	
			HostDAO hostDAO = new HostDAO();
			AdminDAO adminDAO = new AdminDAO();
			GuestDAO guestDAO = new GuestDAO();
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
	
	public void getHostUsers() {
		get("services/users/getHostUsers", (req,res) -> {	
			Session ss = req.session(true);
			Host host = ss.attribute("user");
			allUsers = new ArrayList<User>();
			ArrayList<Guest> guests = new ArrayList<>();
			ReservationDAO reservationDAO = new ReservationDAO();
			GuestDAO guestDAO = new GuestDAO();
			
			for(Guest guest : guestDAO.getGuestList()){
				guests.add(guest);
			}
			
			for(String apartment : host.getApartmentsForRent()) {
				for(Guest g : guests) {
					for(String r1 : g.getReservations()) {
						for(Reservation r2 : reservationDAO.getReservationsList()) {
							if(r1.equals(r2.getId()) && (r2.getApartment().equals(apartment))) {
								allUsers.add(g);
							}
						}
					}
				}
			}
			
			if(allUsers.isEmpty()) {
				res.status(204);
				return g.toJson(allUsers);
			}
			
			res.status(200);
			return g.toJson(allUsers);
		});
	}
	
	public void searchAdminUsersByRoleAndGender(){
	
		get("services/users/searchAdminUsersByRoleAndGender", (req,res) -> {
			String role = req.queryMap("role").value();
			String gender = req.queryMap("gender").value();
			ArrayList<User> searchedUsers = new ArrayList<User>();
			
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

	}
	
	public void addNewHost() {
		post("services/users/addNewHostByAdmin", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			Host host = null;
			HostDAO hostDAO = new HostDAO();
			
			try {
				host = g.fromJson(payload, Host.class);
			}
			catch(Exception e) {
			
				res.status(400);	
				return g.toJson("Bad request");
			}
			
			if(hostDAO.getHostID(host.getUsername()) != null){
				res.status(201);
				return g.toJson("Vec postoji!");				
			}
			
			ArrayList<Host> hosts = hostDAO.getHostList();
			hosts.add(host);
			hostDAO.setHostList(hosts);
			HostDAO.writeHostInFile(hostDAO.getHostList());
			hostDAO.fillMapWithHosts();
			res.status(200);
			return g.toJson("Ok");

		});
	}
	
	
	
	public void checkForbiddenUser() {
		post("services/users/forbiddenUser", (req, res) -> {
			
			String payload = req.body();
			HashMap<String, String> page = g.fromJson(payload, new TypeToken<HashMap<String, String>>() {
			}.getType());
			
			
			if (checkForbidden(page, req)) {
				res.status(200);
				return ("OK");
			}
			
			res.status(403);
			return ("Access forbidden");


		});
	}
	
	
	public static boolean checkForbidden(HashMap<String, String> page, Request req){
		Session ss = req.session(true);
		User u = ss.attribute("user");
		
		//za domacina
		if (page.get("page").equals("addNewApartment") || page.get("page").equals("reviewInActiveApartments") ) {
			if (u == null) {
			
				return false;
			}

			if (u.getRole().equals(Role.domacin)) {
				
				return true;
			} else {
				
				return false;
			}
			
			
		//za domacina i admina	
		}else if(page.get("page").equals("adminUsers") || page.get("page").equals("comments") ||  page.get("page").equals("reviewApartments") ){
			
			if (u == null) {			
				return false;
			}
			
			if (u.getRole().equals(Role.gost)) {				
					return false;
			} else {				
				return true;
			}			
			
			
		//za admina	
		}else if(page.get("page").equals("amenitiesChange") || page.get("page").equals("addNewHost") ){
			
			if (u == null) {			
				return false;
			}
			
			if (u.getRole().equals(Role.admin)) {				
					return true;
			} else {				
				return false;
			}
			
		//svi
		}else if(page.get("page").equals("changeProfile") || page.get("page").equals("reservations")){
			if (u == null) {			
				return false;
			}else{
				return true;
			}
			
			
		//neulogovan	
		}else if(page.get("page").equals("login") || page.get("page").equals("registration") ){
			if(u == null){
				return true;
			}else{
				return false;
			}
		}
		
		
		
		

		return true;
	}
	
}

