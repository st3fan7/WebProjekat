package services;

import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;
import java.io.IOException;

public class SparkMain {
	
	public static void main(String[] args) throws IOException{
		
		port(8088);
		
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		new UserService();
		new ReservationService();

	}

	
}
