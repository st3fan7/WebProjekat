package enums;

import com.google.gson.annotations.SerializedName;

public enum StatusOfReservation {
	@SerializedName("Kreirana")Create, 
	@SerializedName("Odbijena")Rejected, 
	@SerializedName("Odustanak")Withdrawal,
	@SerializedName("Prihvaćena")Accepted,
	@SerializedName("Završena")Completed
}
