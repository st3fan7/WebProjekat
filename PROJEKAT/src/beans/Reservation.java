package beans;

import enums.StatusOfReservation;

public class Reservation {
	
	private String apartment;
	private String startDate;
	private int numberOfNight = 1;
	private double totalCost;
	private String messageForReservation;
	private String guest;
	private StatusOfReservation status;
	private String id;
	
	
	public Reservation(String id, String apartment, String startDate, int numberOfNight, double totalCost,
			String messageForReservation, String guest, StatusOfReservation status) {
		super();
		this.id = id;
		this.apartment = apartment;
		this.startDate = startDate;
		this.numberOfNight = numberOfNight;
		this.totalCost = totalCost;
		this.messageForReservation = messageForReservation;
		this.guest = guest;
		this.status = status;
	}


	public Reservation() {
		super();
		this.apartment = "";
		this.startDate = "";
		this.numberOfNight = 1;
		this.totalCost = 0;
		this.messageForReservation = "";
		this.guest = "";
		this.id = "";
		
	}


	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public String getApartment() {
		return apartment;
	}


	public void setApartment(String apartment) {
		this.apartment = apartment;
	}


	public String getStartDate() {
		return startDate;
	}


	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}


	public int getNumberOfNight() {
		return numberOfNight;
	}


	public void setNumberOfNight(int numberOfNight) {
		this.numberOfNight = numberOfNight;
	}


	public double getTotalCost() {
		return totalCost;
	}


	public void setTotalCost(double totalCost) {
		this.totalCost = totalCost;
	}


	public String getMessageForReservation() {
		return messageForReservation;
	}


	public void setMessageForReservation(String messageForReservation) {
		this.messageForReservation = messageForReservation;
	}


	public String getGuest() {
		return guest;
	}


	public void setGuest(String guest) {
		this.guest = guest;
	}


	public StatusOfReservation getStatus() {
		return status;
	}


	public void setStatus(StatusOfReservation status) {
		this.status = status;
	}
	
}
