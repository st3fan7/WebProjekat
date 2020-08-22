package beans;

public class Address {
	private String street;
	private int houseNumber;
	private String populatedPlace;
	private String zipCode;
	
	public Address() {
		super();
	}

	public Address(String street, int houseNumber, String populatedPlace, String zipCode) {
		super();
		this.street = street;
		this.houseNumber = houseNumber;
		this.populatedPlace = populatedPlace;
		this.zipCode = zipCode;
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

	@Override
	public String toString() {
		return "Address [street=" + street + ", houseNumber=" + houseNumber + ", populatedPlace=" + populatedPlace
				+ ", zipCode=" + zipCode + "]";
	}
	
	
}
