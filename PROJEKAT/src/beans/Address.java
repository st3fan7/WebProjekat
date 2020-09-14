package beans;

public class Address {
	private String street;
	private int houseNumber;
	private String populatedPlace;
	private String zipCode;
	private String country;
	
	public Address() {
		super();
	}

	public Address(String street, int houseNumber, String populatedPlace, String zipCode,  String country) {
		super();
		this.street = street;
		this.houseNumber = houseNumber;
		this.populatedPlace = populatedPlace;
		this.zipCode = zipCode;
		this.country = country;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public int getHouseNumber() {
		return houseNumber;
	}

	public void setHouseNumber(int houseNumber) {
		this.houseNumber = houseNumber;
	}

	public String getPopulatedPlace() {
		return populatedPlace;
	}

	public void setPopulatedPlace(String populatedPlace) {
		this.populatedPlace = populatedPlace;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	
	
}
