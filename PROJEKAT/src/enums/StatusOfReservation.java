package enums;

import com.google.gson.annotations.SerializedName;

public enum StatusOfReservation {
	@SerializedName("create")Create, 
	@SerializedName("rejected")Rejected, 
	@SerializedName("withdrawal")Withdrawal,
	@SerializedName("accepted")Accepted,
	@SerializedName("completed")Completed
}
