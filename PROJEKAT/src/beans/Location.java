package beans;

public class Location {
	private double latitude;
	private double longitude;
	private Address address;
	
	public Location() {
		super();
	}

	public Location(double latitude, double longitude, Address address) {
		super();
		this.latitude = latitude;
		this.longitude = longitude;
		this.address = address;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	@Override
	public String toString() {
		return "Location [latitude=" + latitude + ", longitude=" + longitude + ", address=" + address + "]";
	}
	
	
}
