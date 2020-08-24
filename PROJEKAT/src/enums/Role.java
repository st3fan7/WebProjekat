package enums;

import com.google.gson.annotations.SerializedName;

public enum Role {
	@SerializedName("Admin")Admin, 
	@SerializedName("Domaćin")Host, 
	@SerializedName("Gost")Guest
}
