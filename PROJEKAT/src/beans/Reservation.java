package beans;

import java.util.Date;

import enums.StatusOfReservation;

public class Reservation {
	
	private Apartment apartment;
	private Date startDate;
	private int numberOfNight = 1;
	private double totalCost;
	private String messageForReservation;
	private User guest;
	private StatusOfReservation status;
	
	
	public Reservation(Apartment apartment, Date startDate, int numberOfNight, double totalCost,
			String messageForReservation, User guest, StatusOfReservation status) {
		super();
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
		this.apartment = new Apartment();
		this.startDate = new Date();
		this.numberOfNight = 1;
		this.totalCost = 0;
		this.messageForReservation = "";
		this.guest = new User();
		
	}


	public Apartment getApartment() {
		return apartment;
	}


	public void setApartment(Apartment apartment) {
		this.apartment = apartment;
	}


	public Date getStartDate() {
		return startDate;
	}


	public void setStartDate(Date startDate) {
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


	public User getGuest() {
		return guest;
	}


	public void setGuest(User guest) {
		this.guest = guest;
	}


	public StatusOfReservation getStatus() {
		return status;
	}


	public void setStatus(StatusOfReservation status) {
		this.status = status;
	}
	
	
	
	
	
	
	
}
