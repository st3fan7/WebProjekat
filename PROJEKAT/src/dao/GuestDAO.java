package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.Admin;
import beans.Guest;

public class GuestDAO {
	
	private static Gson gson = new Gson();
	private HashMap<String, Guest> guestsMap = new HashMap<>();
	private ArrayList<Guest> guestList = new ArrayList<>();	
	
	public GuestDAO() {
		loadGuests();
		fillMapWithGuests();
	}

	private void loadGuests() {
		try {
			//setGuestList(gson.fromJson(new FileReader("./files/guests.json"), new TypeToken<ArrayList<Guest>>(){}.getType()));
			setGuestList(gson.fromJson(new BufferedReader(new InputStreamReader(new FileInputStream("./files/guests.json"), StandardCharsets.UTF_8)), new TypeToken<ArrayList<Guest>>(){}.getType()));
		} catch (Exception e) {
			System.out.println("Error on loading guests.json files");
		}
		
	}

	public void fillMapWithGuests() {
		if(guestList != null) {
			for (int i = 0; i < guestList.size(); i++) {
				guestsMap.put(guestList.get(i).getUsername(), guestList.get(i));
			}
		} else {
			guestList = new ArrayList<Guest>();
		}
		
	}
	
	public static void writeGuestInFile(ArrayList<Guest> guests) {
		try (BufferedWriter writer = Files.newBufferedWriter(Paths.get("./files/guests.json"), 
                StandardCharsets.UTF_8)){
			//Writer writer = Files.newBufferedWriter(path, StandardCharsets.UTF_8)
			gson = new GsonBuilder().setPrettyPrinting().create();
			gson.toJson(guests, writer);
			
		} catch (Exception e) {
			System.out.println("Error in writing guests in files!");
		}
	}

	public void editGuest(Guest g, String username)
	{

		int index = -1;
		for (int i = 0; i < guestList.size(); i++) {
			if(guestList.get(i).getUsername().equals(username))
			{
				index = i;
				break;
			}
		}
		
		guestList.get(index).setUsername(g.getUsername());
		guestList.get(index).setName(g.getName());
		guestList.get(index).setSurname(g.getSurname());
		guestList.get(index).setPassword(g.getPassword());
		guestList.get(index).setGender(g.getGender());
		
		guestsMap.remove(username);
		guestsMap.put(g.getUsername(), guestList.get(index));
		
	}
	
	public Guest getGuestID(String username) {
		return guestsMap.get(username);
	}
	
	// getter and setter
	public HashMap<String, Guest> getGuestsMap() {
		return guestsMap;
	}

	public void setGuestsMap(HashMap<String, Guest> guestsMap) {
		this.guestsMap = guestsMap;
	}

	public ArrayList<Guest> getGuestList() {
		return guestList;
	}

	public void setGuestList(ArrayList<Guest> guestList) {
		this.guestList = guestList;
	}
	
	
}
