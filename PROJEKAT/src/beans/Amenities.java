package beans;

public class Amenities {
	
	private int id;
	private String content;
	
	public Amenities(int id, String content) {
		super();
		this.id = id;
		this.content = content;
	}

	public Amenities() {
		super();
		id = 0;
		content = "";
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
	
	
	
}
