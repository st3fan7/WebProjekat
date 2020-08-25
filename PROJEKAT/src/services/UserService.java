package services;


import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import com.google.gson.Gson;

import beans.Host;
import dao.HostDAO;
import spark.Request;
import spark.Session;

public class UserService {
	
	private static Gson g = new Gson();
	HostDAO hostDAO = new HostDAO();
	
	public UserService(){
	 loginUsers();	
	 
	}
	
	public void loginUsers(){
		
		get("/services/users/getUserByUsername", (req, res) -> {
			res.type("application/json");
			Host h = hostDAO.getHostID(req.queryMap("username").value());
			String password = req.queryMap("password").value();
			
			if (password.equals("")) {
				return ("204");
			}
			
			if(h == null){
				return ("Korisnik : " + req.queryMap().value("username") + " ne postoji!");
				
			}else{
				
				if (h.getPassword().equals(password)) {
					Session ss = req.session(true);
					ss.attribute("host", h);
					return ("200");
				} else {
					return ("Pogrešna lozinka!");
				}
			}
								
		});
		
		get("services/users/getActiveUser", (req, res) -> {
			res.type("application/json");
			Session ss = req.session(true);
			Host h = ss.attribute("host");
			System.out.println("Uloga treba da je domacin: " + h.getRole()+ " a username je : " + h.getUsername());
			return g.toJson(h);
		});
		
	}
	
}

