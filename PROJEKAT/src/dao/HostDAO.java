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
			setHostList(gson.fromJson(new FileReader("./files/hosts.json"), new TypeToken<ArrayList<Host>>(){}.getType()));
		} catch (Exception e) {
			System.out.println("Error on loading .json files");
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
		try (Writer writer = new FileWriter("./files/hosts.json")) {
		    gson = new GsonBuilder().setPrettyPrinting().create();
		    gson.toJson(hosts, writer);
		
		} catch (IOException e) {
			System.out.println("Error in writing hosts in files!");
		}
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
