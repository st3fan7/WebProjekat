package enums;

import com.google.gson.annotations.SerializedName;

public enum Role {
	@SerializedName("admin")Admin, 
	@SerializedName("host")Host, 
	@SerializedName("guest")Guest
}
