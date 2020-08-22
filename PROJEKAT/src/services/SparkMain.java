package services;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import java.io.File;
import java.io.IOException;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import spark.Request;
import spark.Route;
import spark.Session;

public class SparkMain {

	public static void main(String[] args) throws IOException{
		
		port(8088);
		
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		
		get("/", (reg, res) -> {
			return "Proba";
		});
		
		get("/login", (reg, res) -> {
			return "Proba";
		});


	}

	
}
