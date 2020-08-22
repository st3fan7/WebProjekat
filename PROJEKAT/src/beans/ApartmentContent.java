package beans;

public class ApartmentContent {
	
	private int id;
	private String content;
	
	public ApartmentContent(int id, String content) {
		super();
		this.id = id;
		this.content = content;
	}

	public ApartmentContent() {
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
