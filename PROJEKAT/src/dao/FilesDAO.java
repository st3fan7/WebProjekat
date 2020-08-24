package dao;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
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
	
	public static void writeAdminInFile(ArrayList<Admin> admins)
	{
		try (Writer writer = new FileWriter("./files/admins.json")) {
		    gson = new GsonBuilder().setPrettyPrinting().create();
		    gson.toJson(admins, writer);
		
		} catch (IOException e) {
			System.out.println("Error in writing admins in files!");
		}
	}
	
	public static void writeHostInFile(ArrayList<Host> hosts)
	{
		try (Writer writer = new FileWriter("./files/hosts.json")) {
		    gson = new GsonBuilder().setPrettyPrinting().create();
		    gson.toJson(hosts, writer);
		
		} catch (IOException e) {
			System.out.println("Error in writing hosts in files!");
		}
	}
	
	public static void writeGuestsInFile(ArrayList<Guest> guests)
	{
		try (Writer writer = new FileWriter("./files/guests.json")) {
		    gson = new GsonBuilder().setPrettyPrinting().create();
		    gson.toJson(guests, writer);
		
		} catch (IOException e) {
			System.out.println("Error in writing guests in files!");
		}
	}
	
	public static void writeAmenitiesInFile(ArrayList<Amenities> amenities)
	{
		try (Writer writer = new FileWriter("./files/amenities.json")) {
		    gson = new GsonBuilder().setPrettyPrinting().create();
		    gson.toJson(amenities, writer);
		
		} catch (IOException e) {
			System.out.println("Error in writing amenities in files!");
		}
	}
	
	public static void writeApartmentsInFile(ArrayList<Apartment> apartments)
	{
		try (Writer writer = new FileWriter("./files/apartments.json")) {
		    gson = new GsonBuilder().setPrettyPrinting().create();
		    gson.toJson(apartments, writer);
		
		} catch (IOException e) {
			System.out.println("Error in writing apartments in files!");
		}
	}
	
	public static void writeCommentsInFile(ArrayList<Comment> comments)
	{
		try (Writer writer = new FileWriter("./files/comments.json")) {
		    gson = new GsonBuilder().setPrettyPrinting().create();
		    gson.toJson(comments, writer);
		
		} catch (IOException e) {
			System.out.println("Error in writing comments in files!");
		}
	}
	
	public static void writeLocationsInFile(ArrayList<Location> locations)
	{
		try (Writer writer = new FileWriter("./files/locations.json")) {
		    gson = new GsonBuilder().setPrettyPrinting().create();
		    gson.toJson(locations, writer);
		
		} catch (IOException e) {
			System.out.println("Error in writing locations in files!");
		}
	}
	
	public static void writeReservationsInFile(ArrayList<Reservation> reservations)
	{
		try (Writer writer = new FileWriter("./files/reservations.json")) {
		    gson = new GsonBuilder().setPrettyPrinting().create();
		    gson.toJson(reservations, writer);
		
		} catch (IOException e) {
			System.out.println("Error in writing reservations in files!");
		}
	}
	
	
}
