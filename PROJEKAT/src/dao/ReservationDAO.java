package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.Reservation;

public class ReservationDAO {
	private static Gson gson = new Gson();
	private HashMap<String, Reservation> reservationsMap = new HashMap<>();
	private ArrayList<Reservation> reservationsList = new ArrayList<>();
	
	public ReservationDAO() {
		loadReservations();
		fillMapWithReservations();
	}

	private void loadReservations() {
		try {
			//setHostList(gson.fromJson(new FileReader("./files/reservations.json"), new TypeToken<ArrayList<Host>>(){}.getType())); // NE CITA UTF-8
			setReservationsList(gson.fromJson(new BufferedReader(new InputStreamReader(new FileInputStream("./files/reservations.json"), StandardCharsets.UTF_8)), new TypeToken<ArrayList<Reservation>>(){}.getType()));
		} catch (Exception e) {
			System.out.println("Error on loading .json files");
		}
	}

	public void fillMapWithReservations() {
		if(reservationsList != null){
			for (int i = 0; i < reservationsList.size(); i++) {
				reservationsMap.put(reservationsList.get(i).getId(), reservationsList.get(i));
			}
		}
		else{
			reservationsList = new ArrayList<Reservation>();
		}
		
	}

	public static void writeReservationsInFile(ArrayList<Reservation> reservations)
	{
		try (BufferedWriter writer = Files.newBufferedWriter(Paths.get("./files/reservations.json"), 
                StandardCharsets.UTF_8)) {
			//Writer writer = new FileWriter("./files/reservations.json")
		    gson = new GsonBuilder().setPrettyPrinting().create();
		    gson.toJson(reservations, writer);
		    
		} catch (IOException e) {
			System.out.println("Error in writing reservations in files!");
		}
	}
	
	public Reservation getHostID(String id) {
		return reservationsMap.get(id);
	}
	
	// getter and setter
	public HashMap<String, Reservation> getReservationsMap() {
		return reservationsMap;
	}

	public void setReservationsMap(HashMap<String, Reservation> reservationsMap) {
		this.reservationsMap = reservationsMap;
	}

	public ArrayList<Reservation> getReservationsList() {
		return reservationsList;
	}

	public void setReservationsList(ArrayList<Reservation> reservationsList) {
		this.reservationsList = reservationsList;
	}
	
	
}
