package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.Amenities;

public class AmenitiesDAO {
	
	private static Gson gson = new Gson();
	private HashMap<String, Amenities> amenitiesMap = new HashMap<>();
	private ArrayList<Amenities> amenitiesList = new ArrayList<>();
	
	public AmenitiesDAO() {
		loadAmenities();
		fillMapWithAmenities();
	}

	private void loadAmenities() {
		try {
			setAmenitiesList(gson.fromJson(new BufferedReader(new InputStreamReader(new FileInputStream("./files/amenities.json"),  StandardCharsets.UTF_8)), new TypeToken<ArrayList<Amenities>>(){}.getType()));
		} catch (Exception e) {
			System.out.println("Error on loading amenities.json files");
		}
		
	}
	
	public void fillMapWithAmenities() {
		if(amenitiesList != null) {
			for(int i = 0; i < amenitiesList.size(); i++) {
				amenitiesMap.put(amenitiesList.get(i).getContent().toLowerCase(), amenitiesList.get(i));
			}
		} else {
			amenitiesList = new ArrayList<Amenities>();
		}
		
	}
	
	public static void writeAmenitiesInFile(ArrayList<Amenities> amenities) {
		try(BufferedWriter writer = Files.newBufferedWriter(Paths.get("./files/amenities.json"), StandardCharsets.UTF_8)) {
			gson = new GsonBuilder().setPrettyPrinting().create();
			gson.toJson(amenities, writer);
		} catch (Exception e) {
			System.out.println("Error in writing amenities in files!");
		}
	}
	
	public Amenities getAmenitiesID(String id) {
		return amenitiesMap.get(id);
	}
	
	
	public void editAmenity(String content, String oldAmenity)
	{

		int index = -1;
		for (int i = 0; i < amenitiesList.size(); i++) {
			if(amenitiesList.get(i).getContent().equals(oldAmenity))
			{
				index = i;
				break;
			}
		}
		
		amenitiesList.get(index).setContent(content);
		
		amenitiesMap.remove(oldAmenity);
		amenitiesMap.put(content.toLowerCase(), amenitiesList.get(index));
		
	}
	
	// getter and setter
	
	public HashMap<String, Amenities> getAmenitiesMap() {
		return amenitiesMap;
	}

	public void setAmenitiesMap(HashMap<String, Amenities> amenitiesMap) {
		this.amenitiesMap = amenitiesMap;
	}

	public ArrayList<Amenities> getAmenitiesList() {
		return amenitiesList;
	}

	public void setAmenitiesList(ArrayList<Amenities> amenitiesList) {
		this.amenitiesList = amenitiesList;
	}
	

	

}
