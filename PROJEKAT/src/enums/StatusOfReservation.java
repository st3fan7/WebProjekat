package enums;

import com.google.gson.annotations.SerializedName;

public enum StatusOfReservation {
	@SerializedName("Kreirana")Kreirana, 
	@SerializedName("Odbijena")Odbijena, 
	@SerializedName("Odustanak")Odustanak,
	@SerializedName("Prihvacena")Prihvacena,
	@SerializedName("Zavrsena")Zavrsena
}
