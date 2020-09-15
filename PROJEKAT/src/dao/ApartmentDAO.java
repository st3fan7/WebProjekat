package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.Apartment;
import beans.PeriodOfRent;

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
				apartmentsMap.put(apartmentsList.get(i).getId().toLowerCase(), apartmentsList.get(i));
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
	
	
	public void editApartment(Apartment a, String id){
		
		int index = -1;
		for (int i = 0; i < apartmentsList.size(); i++) {
			if(apartmentsList.get(i).getId().equals(id))
			{
				index = i;
				break;
			}
		}
		
		apartmentsList.get(index).setId(a.getId());
		apartmentsList.get(index).setTypeOfApartment(a.getTypeOfApartment());;
		apartmentsList.get(index).setNumberOfRooms(a.getNumberOfRooms());
		apartmentsList.get(index).setNumberOfGuests(a.getNumberOfGuests());
		apartmentsList.get(index).setLocation(a.getLocation());
		apartmentsList.get(index).setReleaseDates(a.getReleaseDates());
		apartmentsList.get(index).setComments(a.getComments());
		apartmentsList.get(index).setHost(a.getHost());
		apartmentsList.get(index).setFreeDates(a.getFreeDates());
		apartmentsList.get(index).setPictures(a.getPictures());
		apartmentsList.get(index).setPricePerNight(a.getPricePerNight());
		apartmentsList.get(index).setCheckInTime(a.getCheckInTime());
		apartmentsList.get(index).setCheckOutTime(a.getCheckOutTime());
		apartmentsList.get(index).setStatusOfApartment(a.getStatusOfApartment());
		apartmentsList.get(index).setAmenities(a.getAmenities());
		apartmentsList.get(index).setReservations(a.getReservations());
		
		
		
		apartmentsMap.remove(id);
		apartmentsMap.put(a.getId(), apartmentsList.get(index));
		
		
		
		
	}
	
	
	public ArrayList<Apartment> getApartmentsByDateRange(Date startDate, Date endDate){
//		ArrayList<Apartment> apartments = new ArrayList<>();
//		if(startDate != null && endDate != null && startDate.compareTo(endDate) < 0) {
//			for(Apartment a : apartmentsList) {
//				for(int i = 0; i < a.getReleaseDates().size(); i++) {
//					if(startDate.compareTo(a.getReleaseDates().get(0)) >= 0 && endDate.compareTo(a.getReleaseDates().get(1)) <= 0) {
//						apartments.add(a);
//					}
//				}
//			}
//		} else if(startDate != null && endDate == null) {
//			for(Apartment a : apartmentsList) {
//				for(int i = 0; i < a.getReleaseDates().size(); i++) {
//					if(startDate.compareTo(a.getReleaseDates().get(0)) >= 0 && startDate.compareTo(a.getReleaseDates().get(1)) <= 0) {
//						apartments.add(a);
//					}
//				}
//			}
//		} else if(startDate == null && endDate != null) {
//			for(Apartment a : apartmentsList) {
//				for(int i = 0; i < a.getReleaseDates().size(); i++) {
//					if(endDate.compareTo(a.getReleaseDates().get(0)) >= 0 && endDate.compareTo(a.getReleaseDates().get(1)) <= 0) {
//						apartments.add(a);
//					}
//				}
//			}
//		} 
		
		ArrayList<Apartment> apartments = new ArrayList<>();
		if(startDate != null && endDate != null && startDate.compareTo(endDate) < 0) {
			for(Apartment a : apartmentsList) {
				for(PeriodOfRent periodOfRent : a.getReleaseDates()) {
						if(startDate.compareTo(periodOfRent.getStartDate()) >= 0 && endDate.compareTo(periodOfRent.getEndDate()) <= 0) {
							apartments.add(a);
						}
				}
			}
		} else if(startDate != null && endDate == null) {
			for(Apartment a : apartmentsList) {
				for(PeriodOfRent periodOfRent : a.getReleaseDates()) {
					if(startDate.compareTo(periodOfRent.getStartDate()) >= 0 && startDate.compareTo(periodOfRent.getEndDate()) <= 0) {
						apartments.add(a);
					}
				}
			}
		} else if(startDate == null && endDate != null) {
			for(Apartment a : apartmentsList) {
				for(PeriodOfRent periodOfRent : a.getReleaseDates()) {
					if(endDate.compareTo(periodOfRent.getStartDate()) >= 0 && endDate.compareTo(periodOfRent.getEndDate()) <= 0) {
						apartments.add(a);
					}
				}
			}
		} 
					
		return apartments;
	}
	
	
	public ArrayList<Apartment> getApartmentsByLocation(String city, String country) {
		ArrayList<Apartment> apartments = new ArrayList<>();
		
		for(Apartment a : apartmentsList) {
			if(country.equals("") && city.equals("")) {
				break;
			} else if(!country.equals("") && city.equals("")) {
				if(country.equals(a.getLocation().getAddress().getCountry())) {
					apartments.add(a);
				}
			} else if(country.equals("") && !city.equals("")) {
				if(city.equals(a.getLocation().getAddress().getPopulatedPlace())) {
					apartments.add(a);
				}
			} else {
				if(city.equals(country)) {
					if(country.equals(a.getLocation().getAddress().getCountry()) || city.equals(a.getLocation().getAddress().getPopulatedPlace())) {
						apartments.add(a);
						
					}
				} else {
					if(country.equals(a.getLocation().getAddress().getCountry()) && city.equals(a.getLocation().getAddress().getPopulatedPlace())) {
						apartments.add(a);
						
					}
				}
				
			}
		}
			
		return apartments;
	}
	
	public ArrayList<Apartment> getApartmentsByPrice(int priceFrom, int priceTo) {
		ArrayList<Apartment> apartments = new ArrayList<>();
		
		for(Apartment a : apartmentsList) {		
			if(priceFrom != -1 && priceTo != -1) {
				if(priceFrom <= a.getPricePerNight() && priceTo >= a.getPricePerNight()) {
					apartments.add(a);
				}
			}
		}
			
		return apartments;
	}
	
	public ArrayList<Apartment> getApartmentsByNumberOfRooms(int numberOfRoomsFrom, int numberOfRoomsTo) {
		ArrayList<Apartment> apartments = new ArrayList<>();
		
		for(Apartment a : apartmentsList) {
			if(numberOfRoomsFrom != -1 && numberOfRoomsTo != -1) {
				if(numberOfRoomsFrom <= a.getNumberOfRooms() && numberOfRoomsTo >= a.getNumberOfRooms()) {
					apartments.add(a);
				}
			}
			
		}
			
		return apartments;
	}
	
	public ArrayList<Apartment> getApartmentsByNumberOfGuests (int numberOfGuests) {
		ArrayList<Apartment> apartments = new ArrayList<>();
		
		if(numberOfGuests != -1) {
			for(Apartment a : apartmentsList) {				
					if(numberOfGuests <= a.getNumberOfGuests() ) {
						apartments.add(a);
					}						
			}
		}
	
		return apartments;
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
