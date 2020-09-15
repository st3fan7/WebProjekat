package beans;

import java.util.ArrayList;
import java.util.Date;

import enums.StatusOfApartment;
import enums.TypeOfApartment;

public class Apartment {
	private String id;
	private TypeOfApartment typeOfApartment;
	private int numberOfRooms;
	private int numberOfGuests;
	private Location location;
	private ArrayList<PeriodOfRent> releaseDates;
	private ArrayList<Date> freeDates;
	private String host;
	private ArrayList<Comment> comments;
	private ArrayList<String> pictures;
	private int pricePerNight;
	private String checkInTime; //inicijalno 2 PM
	private String checkOutTime; //inicijalno 10 AM
	private StatusOfApartment statusOfApartment;
	private ArrayList<Amenities> amenities;
	private ArrayList<String> reservations;
	private int deleted;
	
	public Apartment() {
		super();
		deleted = 0;
	}

	public Apartment(String id, TypeOfApartment typeOfApartment, int numberOfRooms, int numberOfGuests, Location location,
			String host, int pricePerNight, String checkInTime,
			String checkOutTime, StatusOfApartment statusOfApartment, int deleted) {
		super();
		this.id = id;
		this.typeOfApartment = typeOfApartment;
		this.numberOfRooms = numberOfRooms;
		this.numberOfGuests = numberOfGuests;
		this.location = location;
		this.host = host;	
		this.pricePerNight = pricePerNight;
		this.checkInTime = checkInTime;
		this.checkOutTime = checkOutTime;
		this.statusOfApartment = statusOfApartment;
		this.pictures = new ArrayList<String>();
		this.releaseDates = new ArrayList<PeriodOfRent>();
		this.freeDates = new ArrayList<Date>();
		this.comments = new ArrayList<Comment>();
		this.amenities = new ArrayList<Amenities>();
		this.reservations = new ArrayList<String>();
		this.deleted = deleted;
	}

	public TypeOfApartment getTypeOfApartment() {
		return typeOfApartment;
	}

	public void setTypeOfApartment(TypeOfApartment typeOfApartment) {
		this.typeOfApartment = typeOfApartment;
	}

	public int getNumberOfRooms() {
		return numberOfRooms;
	}

	public void setNumberOfRooms(int numberOfRooms) {
		this.numberOfRooms = numberOfRooms;
	}

	public int getNumberOfGuests() {
		return numberOfGuests;
	}

	public void setNumberOfGuests(int numberOfGuests) {
		this.numberOfGuests = numberOfGuests;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public ArrayList<PeriodOfRent> getReleaseDates() {
		return releaseDates;
	}

	public void setReleaseDates(ArrayList<PeriodOfRent> releaseDates) {
		this.releaseDates = releaseDates;
	}

	public ArrayList<Date> getFreeDates() {
		return freeDates;
	}

	public void setFreeDates(ArrayList<Date> freeDates) {
		this.freeDates = freeDates;
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public ArrayList<Comment> getComments() {
		return comments;
	}

	public void setComments(ArrayList<Comment> comments) {
		this.comments = comments;
	}

	public ArrayList<String> getPictures() {
		return pictures;
	}

	public void setPictures(ArrayList<String> pictures) {
		this.pictures = pictures;
	}

	public int getPricePerNight() {
		return pricePerNight;
	}

	public void setPricePerNight(int pricePerNight) {
		this.pricePerNight = pricePerNight;
	}

	public String getCheckInTime() {
		return checkInTime;
	}

	public void setCheckInTime(String checkInTime) {
		this.checkInTime = checkInTime;
	}

	public String getCheckOutTime() {
		return checkOutTime;
	}

	public void setCheckOutTime(String checkOutTime) {
		this.checkOutTime = checkOutTime;
	}

	public StatusOfApartment getStatusOfApartment() {
		return statusOfApartment;
	}

	public void setStatusOfApartment(StatusOfApartment statusOfApartment) {
		this.statusOfApartment = statusOfApartment;
	}

	public ArrayList<Amenities> getAmenities() {
		return amenities;
	}

	public void setAmenities(ArrayList<Amenities> amenities) {
		this.amenities = amenities;
	}

	public ArrayList<String> getReservations() {
		return reservations;
	}

	public void setReservations(ArrayList<String> reservations) {
		this.reservations = reservations;
	}
	

	public int getDeleted() {
		return deleted;
	}

	public void setDeleted(int deleted) {
		this.deleted = deleted;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}


		
}
