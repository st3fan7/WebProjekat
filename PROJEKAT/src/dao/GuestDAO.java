package dao;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.Writer;
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
			setGuestList(gson.fromJson(new FileReader("./files/guests.json"), new TypeToken<ArrayList<Guest>>(){}.getType()));
			//setGuestList(gson.fromJson(new BufferedReader(new InputStreamReader(new FileInputStream("./files/guests.json"), StandardCharsets.UTF_8)), new TypeToken<ArrayList<Host>>(){}.getType()));
		} catch (Exception e) {
			System.out.println("Error on loading .json files");
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
		try (Writer writer = new FileWriter("./files/guests.json")){
			gson = new GsonBuilder().setPrettyPrinting().create();
			gson.toJson(guests, writer);
			
		} catch (Exception e) {
			System.out.println("Error in writing guests in files!");
		}
	}

	public void editGuest(Guest g, String username)
	{

//		int index = -1;
//		for (int i = 0; i < adminList.size(); i++) {
//			if(adminList.get(i).getUsername().equals(username))
//			{
//				index = i;
//				break;
//			}
//		}
//		
//		adminList.get(index).setUsername(a.getUsername());
//		adminList.get(index).setName(a.getName());
//		adminList.get(index).setSurname(a.getSurname());
//		adminList.get(index).setPassword(a.getPassword());
//		adminList.get(index).setGender(a.getGender());
//		
//		adminsMap.remove(username);
//		adminsMap.put(a.getUsername(), adminList.get(index));
		
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
