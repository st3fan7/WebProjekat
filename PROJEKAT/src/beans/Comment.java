package beans;

public class Comment {

	private User guest;
	private Apartment apartment;
	private String text;
	private int grade;
	
	
	public Comment(User guest, Apartment apartment, String text, int grade) {
		super();
		this.guest = guest;
		this.apartment = apartment;
		this.text = text;
		this.grade = grade;
	}

	
	public Comment(){
		super();
		this.guest = new User();
		this.apartment = new Apartment();
		this.text = "";
		this.grade = 0;
	}


	public User getGuest() {
		return guest;
	}


	public void setGuest(User guest) {
		this.guest = guest;
	}


	public Apartment getApartment() {
		return apartment;
	}


	public void setApartment(Apartment apartment) {
		this.apartment = apartment;
	}


	public String getText() {
		return text;
	}


	public void setText(String text) {
		this.text = text;
	}


	public int getGrade() {
		return grade;
	}


	public void setGrade(int grade) {
		this.grade = grade;
	}
	
	
	
	
}
