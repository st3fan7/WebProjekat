package services;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;
import java.io.IOException;

import com.google.gson.Gson;

import dao.AppData;
import dao.FilesDAO;

public class SparkMain {

	private static Gson gson = new Gson();
	private static AppData app;
	
	public static void main(String[] args) throws IOException{
		
		port(8088);
		
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		//app = FilesDAO.loadFiles();
		//app.fillMaps();
		
		new UserService();
		
		
		/*
		get("/login", (reg, res) -> {
			return "Proba";
		});
		
		*/


	}

	
}
