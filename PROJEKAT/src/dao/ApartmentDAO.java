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

import beans.Apartment;

public class ApartmentDAO {
	private static Gson gson = new Gson();
	private HashMap<String, Apartment> apartmentsMap = new HashMap<>();
	private ArrayList<Apartment> apartmentsList = new ArrayList<>();
	
	public ApartmentDAO() {
		loadApartments();
		fillMapWithApartments();
	}

	private void loadApartments() {
		try {
			setApartmentsList(gson.fromJson(new BufferedReader(new InputStreamReader(new FileInputStream("./files/apartments.json"),  StandardCharsets.UTF_8)), new TypeToken<ArrayList<Apartment>>(){}.getType()));
		} catch (Exception e) {
			System.out.println("Error on loading apartments.json files");
		}
		
	}
	
	public void fillMapWithApartments() {
		if(apartmentsList != null) {
			for(int i = 0; i < apartmentsList.size(); i++) {
				apartmentsMap.put(apartmentsList.get(i).getId(), apartmentsList.get(i));
			}
		} else {
			apartmentsList = new ArrayList<Apartment>();
		}
		
	}
	
	public static void writeApartmentsInFile(ArrayList<Apartment> apartments) {
		try(BufferedWriter writer = Files.newBufferedWriter(Paths.get("./files/apartments.json"), StandardCharsets.UTF_8)) {
			gson = new GsonBuilder().setPrettyPrinting().create();
			gson.toJson(apartments, writer);
		} catch (Exception e) {
			System.out.println("Error in writing apartments in files!");
		}
	}
	
	public Apartment getApartmetnID(String id) {
		return apartmentsMap.get(id);
	}
	
	// getter and setter

	public HashMap<String, Apartment> getApartmentsMap() {
		return apartmentsMap;
	}

	public void setApartmentsMap(HashMap<String, Apartment> apartmentsMap) {
		this.apartmentsMap = apartmentsMap;
	}

	public ArrayList<Apartment> getApartmentsList() {
		return apartmentsList;
	}

	public void setApartmentsList(ArrayList<Apartment> apartmentsList) {
		this.apartmentsList = apartmentsList;
	}


}
