package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileInputStream;
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
import beans.Host;

public class HostDAO {
	
	private static Gson gson = new Gson();
	private HashMap<String, Host> hostsMap = new HashMap<>();
	private ArrayList<Host> hostList = new ArrayList<>();
	
	public HostDAO(){
		loadHosts();
		fillMapWithHosts();
	}
	
	public void loadHosts(){
		try {
			//setHostList(gson.fromJson(new FileReader("./files/hosts.json"), new TypeToken<ArrayList<Host>>(){}.getType())); // NE CITA UTF-8
			setHostList(gson.fromJson(new BufferedReader(new InputStreamReader(new FileInputStream("./files/hosts.json"), StandardCharsets.UTF_8)), new TypeToken<ArrayList<Host>>(){}.getType()));
		} catch (Exception e) {
			System.out.println("Error on loading hosts.json files");
		}
	}
	
	public void fillMapWithHosts(){
		if(hostList != null){
			for (int i = 0; i < hostList.size(); i++) {
				hostsMap.put(hostList.get(i).getUsername(), hostList.get(i));
			}
		}
		else{
			hostList = new ArrayList<Host>();
		}
	}
	
	
	public static void writeHostInFile(ArrayList<Host> hosts)
	{
		try (BufferedWriter writer = Files.newBufferedWriter(Paths.get("./files/hosts.json"), 
                StandardCharsets.UTF_8)) {
			//Writer writer = new FileWriter("./files/hosts.json")
		    gson = new GsonBuilder().setPrettyPrinting().create();
		    gson.toJson(hosts, writer);
		    
		} catch (IOException e) {
			System.out.println("Error in writing hosts in files!");
		}
	}
	
	
	public void editHost(Host h, String username)
	{

		int index = -1;
		for (int i = 0; i < hostList.size(); i++) {
			if(hostList.get(i).getUsername().equals(username))
			{
				index = i;
				break;
			}
		}
		
		hostList.get(index).setUsername(h.getUsername());
		hostList.get(index).setName(h.getName());
		hostList.get(index).setSurname(h.getSurname());
		hostList.get(index).setPassword(h.getPassword());
		hostList.get(index).setGender(h.getGender());
		
		hostsMap.remove(username);
		hostsMap.put(h.getUsername(), hostList.get(index));
		
	}
	
	public Host getHostID(String username) {
		return hostsMap.get(username);
	}
	
	
	
	//get and set
	public HashMap<String, Host> getHostsMap() {
		return hostsMap;
	}

	public void setHostsMap(HashMap<String, Host> hostsMap) {
		this.hostsMap = hostsMap;
	}

	public ArrayList<Host> getHostList() {
		return hostList;
	}

	public void setHostList(ArrayList<Host> hostList) {
		this.hostList = hostList;
	}
	
	
	
	
	
	
}
