package dao;

import java.util.ArrayList;
import java.util.HashMap;


import beans.Admin;
import beans.Amenities;
import beans.Apartment;
import beans.Comment;
import beans.Guest;
import beans.Host;
import beans.Location;
import beans.Reservation;

public class AppData {

	private HashMap<String, Guest> guestsMap = new HashMap<>();
	private ArrayList<Guest> guestList = new ArrayList<>();	
	private HashMap<String, Admin> adminsMap = new HashMap<>();
	private ArrayList<Admin> adminList = new ArrayList<>();	
	private HashMap<String, Host> hostsMap = new HashMap<>();
	private ArrayList<Host> hostList = new ArrayList<>();	
	//private HashMap<String, Address> addressMap = new HashMap<>();
	//private ArrayList<Address> addressList = new ArrayList<>();	
	private HashMap<String, Apartment> apartmentsMap = new HashMap<>();
	private ArrayList<Apartment> apartmentList = new ArrayList<>();	
	private HashMap<Integer, Amenities> amenitiesMap = new HashMap<>();
	private ArrayList<Amenities> amenitiesList = new ArrayList<>();	
	private HashMap<String, Comment> commentMap = new HashMap<>();
	private ArrayList<Comment> commentList = new ArrayList<>();	
	private HashMap<String, Location> locationMap = new HashMap<>();
	private ArrayList<Location> locationList = new ArrayList<>();	
	private HashMap<String, Reservation> resrvationsMap = new HashMap<>();
	private ArrayList<Reservation> resrvationList = new ArrayList<>();
	
	public AppData() {
		super();
	}
	
	public void fillMaps() {
		
		//guest
		if(guestList != null){
			for (int i = 0; i < guestList.size(); i++) {
				guestsMap.put(guestList.get(i).getUsername(), guestList.get(i));
			}
		}
		else{
			guestList = new ArrayList<Guest>();
		}
		
		
		//admin
		if(adminList != null){
			for (int i = 0; i < adminList.size(); i++) {
				adminsMap.put(adminList.get(i).getUsername(), adminList.get(i));
			}
		}
		else{
			adminList = new ArrayList<Admin>();
		}
		
		
		//host
		if(hostList != null){
			for (int i = 0; i < hostList.size(); i++) {
				hostsMap.put(hostList.get(i).getUsername(), hostList.get(i));
			}
		}
		else{
			hostList = new ArrayList<Host>();
		}
		
		/*
		//address
		if(addressList != null){
			for (int i = 0; i < addressList.size(); i++) {
				addressMap.put(addressList.get(i).(), addressList.get(i));
			}
		}
		else{
			addressList = new ArrayList<Address>();
		}
		
		*/
		
		
		//apartment
		if(apartmentList != null){
			for (int i = 0; i < apartmentList.size(); i++) {
				apartmentsMap.put(apartmentList.get(i).getId(), apartmentList.get(i));
			}
		}
		else{
			apartmentList = new ArrayList<Apartment>();
		}
		
		/*
		//amenities
		if(amenitiesList != null){
			for (int i = 0; i < amenitiesList.size(); i++) {
				amenitiesMap.put(amenitiesList.get(i).getId(), amenitiesList.get(i));
			}
		}
		else{
			amenitiesList = new ArrayList<Amenities>();
		}
		
		*/
		
		//comment
		if(commentList != null){
			for (int i = 0; i < commentList.size(); i++) {
				commentMap.put(commentList.get(i).getId(), commentList.get(i));
			}
		}
		else{
			commentList = new ArrayList<Comment>();
		}
		
		//location
		if(locationList != null){
			for (int i = 0; i < locationList.size(); i++) {
				locationMap.put(locationList.get(i).getLatitude() + ", " + locationList.get(i).getLongitude(), locationList.get(i));
			}
		}
		else{
			locationList = new ArrayList<Location>();
		}
		
		//reservation
		if(resrvationList != null){
			for (int i = 0; i < resrvationList.size(); i++) {
				resrvationsMap.put(resrvationList.get(i).getId(), resrvationList.get(i));
			}
		}
		else{
			resrvationList = new ArrayList<Reservation>();
		}
		
		
	}
	
	

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

	public HashMap<String, Admin> getAdminsMap() {
		return adminsMap;
	}

	public void setAdminsMap(HashMap<String, Admin> adminsMap) {
		this.adminsMap = adminsMap;
	}

	public ArrayList<Admin> getAdminList() {
		return adminList;
	}

	public void setAdminList(ArrayList<Admin> adminList) {
		this.adminList = adminList;
	}

	public HashMap<String, Host> getHostsMap() {
		return hostsMap;
	}

	public void setHostsMap(HashMap<String, Host> hostsMap) {
		this.hostsMap = hostsMap;
	}

	public ArrayList<Host> getHostList() {
		return hostList;
	}

	public void setHostList(ArrayList<Host> hostList) {
		this.hostList = hostList;
	}

	public HashMap<String, Apartment> getApartmentsMap() {
		return apartmentsMap;
	}

	public void setApartmentsMap(HashMap<String, Apartment> apartmentsMap) {
		this.apartmentsMap = apartmentsMap;
	}

	public ArrayList<Apartment> getApartmentList() {
		return apartmentList;
	}

	public void setApartmentList(ArrayList<Apartment> apartmentList) {
		this.apartmentList = apartmentList;
	}

	public HashMap<Integer, Amenities> getAmenitiesMap() {
		return amenitiesMap;
	}

	public void setAmenitiesMap(HashMap<Integer, Amenities> amenitiesMap) {
		this.amenitiesMap = amenitiesMap;
	}

	public ArrayList<Amenities> getAmenitiesList() {
		return amenitiesList;
	}

	public void setAmenitiesList(ArrayList<Amenities> amenitiesList) {
		this.amenitiesList = amenitiesList;
	}

	public HashMap<String, Comment> getCommentMap() {
		return commentMap;
	}

	public void setCommentMap(HashMap<String, Comment> commentMap) {
		this.commentMap = commentMap;
	}

	public ArrayList<Comment> getCommentList() {
		return commentList;
	}

	public void setCommentList(ArrayList<Comment> commentList) {
		this.commentList = commentList;
	}

	public HashMap<String, Location> getLocationMap() {
		return locationMap;
	}

	public void setLocationMap(HashMap<String, Location> locationMap) {
		this.locationMap = locationMap;
	}

	public ArrayList<Location> getLocationList() {
		return locationList;
	}

	public void setLocationList(ArrayList<Location> locationList) {
		this.locationList = locationList;
	}

	public HashMap<String, Reservation> getResrvationsMap() {
		return resrvationsMap;
	}

	public void setResrvationsMap(HashMap<String, Reservation> resrvationsMap) {
		this.resrvationsMap = resrvationsMap;
	}

	public ArrayList<Reservation> getResrvationList() {
		return resrvationList;
	}

	public void setResrvationList(ArrayList<Reservation> resrvationList) {
		this.resrvationList = resrvationList;
	}
	
	
		
	
}
