package dao;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.Admin;

public class AdminDAO {
	
	private static Gson gson = new Gson();
	private HashMap<String, Admin> adminsMap = new HashMap<>();
	private ArrayList<Admin> adminList = new ArrayList<>();	
	
	public AdminDAO() {
		loadAdmins();
		fillMapWithAdmins();
	}
	
	private void loadAdmins() {
		try {
			setAdminList(gson.fromJson(new FileReader("./files/admins.json"), new TypeToken<ArrayList<Admin>>(){}.getType()));
		} catch (Exception e) {
			System.out.println("Error on loading .json files");
		}
	}

	private void fillMapWithAdmins() {
		if(adminList != null){
			for (int i = 0; i < adminList.size(); i++) {
				adminsMap.put(adminList.get(i).getUsername(), adminList.get(i));
			}
		}
		else{
			adminList = new ArrayList<Admin>();
		}	
	}
	
	public static void writeAdminInFile(ArrayList<Admin> admins)
	{
		try (Writer writer = new FileWriter("./files/admins.json")) {
		    gson = new GsonBuilder().setPrettyPrinting().create();
		    gson.toJson(admins, writer);
		
		} catch (IOException e) {
			System.out.println("Error in writing admins in files!");
		}
	}
	
	public Admin getAdminID(String username) {
		return adminsMap.get(username);
	}
	
	// getter and setter

	public HashMap<String, Admin> getAdminsMap() {
		return adminsMap;
	}

	public void setAdminsMap(HashMap<String, Admin> adminsMap) {
		this.adminsMap = adminsMap;
	}

	public ArrayList<Admin> getAdminList() {
		return adminList;
	}

	public void setAdminList(ArrayList<Admin> adminList) {
		this.adminList = adminList;
	}


	
}
