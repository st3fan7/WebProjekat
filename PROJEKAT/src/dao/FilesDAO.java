package dao;

import java.io.FileReader;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.Admin;
import beans.Amenities;
import beans.Apartment;
import beans.Comment;
import beans.Guest;
import beans.Host;
import beans.Location;
import beans.Reservation;

public class FilesDAO {

	private static Gson gson = new Gson();
	
	public static AppData loadFiles(){
		
		AppData app = new AppData();
		
		try {			
			app.setGuestList(gson.fromJson(new FileReader("./files/guests.json"), new TypeToken<ArrayList<Guest>>(){}.getType()));
			app.setHostList(gson.fromJson(new FileReader("./files/hosts.json"), new TypeToken<ArrayList<Host>>(){}.getType()));
			app.setAdminList(gson.fromJson(new FileReader("./files/admins.json"), new TypeToken<ArrayList<Admin>>(){}.getType()));
			app.setApartmentList(gson.fromJson(new FileReader("./files/apartments.json"), new TypeToken<ArrayList<Apartment>>(){}.getType()));
			app.setAmenitiesList(gson.fromJson(new FileReader("./files/amenities.json"), new TypeToken<ArrayList<Amenities>>(){}.getType()));
			app.setCommentList(gson.fromJson(new FileReader("./files/comments.json"), new TypeToken<ArrayList<Comment>>(){}.getType()));
			app.setLocationList(gson.fromJson(new FileReader("./files/locations.json"), new TypeToken<ArrayList<Location>>(){}.getType()));
			app.setResrvationList(gson.fromJson(new FileReader("./files/reservations.json"), new TypeToken<ArrayList<Reservation>>(){}.getType()));
			
			
		} catch (Exception e) {
			System.out.println("Error on loading .json files");
		}
		
		return app;
	}
	
	
}
