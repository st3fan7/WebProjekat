package beans;

public class Amenities {
	
	private String content;
	private int deleted;
	
	public Amenities(String content, int deleted) {
		super();
		this.content = content;
		this.deleted = deleted;
	}

	public Amenities() {
		super();
		content = "";
		deleted = 0;
	}

	public int getDeleted() {
		return deleted;
	}

	public void setDeleted(int deleted) {
		this.deleted = deleted;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
	
	
	
}
