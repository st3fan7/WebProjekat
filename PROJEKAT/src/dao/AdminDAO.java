package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
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
			//setAdminList(gson.fromJson(new FileReader("./files/admins.json"), new TypeToken<ArrayList<Admin>>(){}.getType()));
			//setAdminList(gson.fromJson(new BufferedReader(new InputStreamReader(new FileInputStream("./files/admins.json"), StandardCharsets.UTF_8)), new TypeToken<ArrayList<Admin>>(){}.getType()));
			setAdminList(gson.fromJson(new BufferedReader(new InputStreamReader(new FileInputStream("./files/admins.json"), StandardCharsets.UTF_8)), new TypeToken<ArrayList<Admin>>(){}.getType()));
		} catch (Exception e) {
			System.out.println("Error on loading admins.json files");
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
		try (BufferedWriter writer = Files.newBufferedWriter(Paths.get("./files/admins.json"), 
                StandardCharsets.UTF_8)) {
			//Writer writer = new FileWriter("./files/admins.json")
		    gson = new GsonBuilder().setPrettyPrinting().create();
		    gson.toJson(admins, writer);
		
		} catch (IOException e) {
			System.out.println("Error in writing admins in files!");
		}
	}
	
	public void editAdmin(Admin a, String username)
	{

		int index = -1;
		for (int i = 0; i < adminList.size(); i++) {
			if(adminList.get(i).getUsername().equals(username))
			{
				index = i;
				break;
			}
		}
		
		adminList.get(index).setUsername(a.getUsername());
		adminList.get(index).setName(a.getName());
		adminList.get(index).setSurname(a.getSurname());
		adminList.get(index).setPassword(a.getPassword());
		adminList.get(index).setGender(a.getGender());
		
		adminsMap.remove(username);
		adminsMap.put(a.getUsername(), adminList.get(index));
		
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
