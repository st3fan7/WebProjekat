package beans;

import enums.CommentVisibility;

public class Comment {

	private String guest;
	private String apartment;
	private String text;
	private String grade;
	private String id;
	private CommentVisibility visibility;
	
	
	public Comment(String id, String guest, String apartment, String text, String grade, CommentVisibility visibility) {
		super();
		this.id = id;
		this.guest = guest;
		this.apartment = apartment;
		this.text = text;
		this.grade = grade;
		this.visibility = visibility;
	}

	
	public Comment(){
		super();
		this.id = "";
		this.guest = "";
		this.apartment = "";
		this.text = "";
		this.grade = "";
	}


	public CommentVisibility getVisibility() {
		return visibility;
	}


	public void setVisibility(CommentVisibility visibility) {
		this.visibility = visibility;
	}


	public String getGuest() {
		return guest;
	}


	public void setGuest(String guest) {
		this.guest = guest;
	}


	public String getApartment() {
		return apartment;
	}


	public void setApartment(String apartment) {
		this.apartment = apartment;
	}


	public String getText() {
		return text;
	}


	public void setText(String text) {
		this.text = text;
	}


	public String getGrade() {
		return grade;
	}


	public void setGrade(String grade) {
		this.grade = grade;
	}
	
	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}
	
	
	
	
	
}
