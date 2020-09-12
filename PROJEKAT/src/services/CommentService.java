package services;

import static spark.Spark.get;
import static spark.Spark.post;

import java.lang.reflect.Type;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Apartment;
import beans.Comment;
import beans.Host;
import dao.CommentDAO;
import spark.Session;
import dao.ApartmentDAO;

public class CommentService {
	private static Gson g = new Gson();
	CommentDAO commentDAO = new CommentDAO();
	ApartmentDAO apartmentDAO = new ApartmentDAO();
	
	public CommentService() {
		getVisibleComments();
		getCommentID();
		addNewCommet();
		saveChangedComments();
		getAllCommentsForHost();
		getAllComments();
	}
	
	//URADJENO
	private void getVisibleComments() {
		post("services/comments/getVisibleComments", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			ArrayList<Comment> comments = null; 
			ArrayList<Comment> visibleComments = new ArrayList<>(); 
			
			
			try {
				Type listType = new TypeToken<ArrayList<Comment>>(){}.getType(); 
				comments = g.fromJson(payload, listType);	
			}
			catch(Exception e) {
				res.status(400);
				return g.toJson("Bad request");
			}
			
			for(Comment comment : comments) {
				if(comment.getVisibility().toString().equals("Vidljiv")) {
					visibleComments.add(comment);
				}
			}
			
			if(visibleComments.isEmpty()) {
	            res.status(204);
	            return "No content";
			}
			

            res.status(200);
            return g.toJson(visibleComments);
			
		});
	}
	
	//URADJENO
	private void getCommentID() {
		get("services/comments/getCommentID", (req, res) -> {
			int maxID = 0;
			
			
			/*
			for(int i = 0; i < commentDAO.getCommentsList().size(); i++) {
				
					String[] iNumberParts = commentDAO.getCommentsList().get(i).getId().split(" ");
					
					if(Integer.parseInt(iNumberParts[1]) > maxID) {
						maxID = Integer.parseInt(iNumberParts[1]);
					} 
			}
			
			*/
			
			for(Apartment a : apartmentDAO.getApartmentsList()){
				for(Comment c : a.getComments()){
					String[] iNumberParts = c.getId().split(" ");

					if(Integer.parseInt(iNumberParts[1]) > maxID) {
						maxID = Integer.parseInt(iNumberParts[1]);
					}
				}
			}
			

			maxID++;
			
            res.status(200);
            return g.toJson(maxID);
			
		});
	}
	
	//URADJENO
	private void addNewCommet() {
		post("services/comments/addNewCommet", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			
			Comment comment = null;
			
			
			try {
				comment = g.fromJson(payload, Comment.class);	
			}
			catch(Exception e) {
				res.status(400);
				return g.toJson("Bad request");
			}
			// treba da se upise i u apartman
			/*
			commentDAO.getCommentsList().add(comment);
			CommentDAO.writeCommentsInFile(commentDAO.getCommentsList());
			commentDAO.fillMapWithComments();
			*/
			
			
			for(Apartment a : apartmentDAO.getApartmentsList()){
				if(a.getId().equals(comment.getApartment())){
					a.getComments().add(comment);
				}
			}
			
			apartmentDAO.setApartmentsList(apartmentDAO.getApartmentsList());
			ApartmentDAO.writeApartmentsInFile(apartmentDAO.getApartmentsList());
			apartmentDAO.fillMapWithApartments();
			
			
			
			res.status(200);
			return "OK";
		}) ;
		
	}
	
	//URADJENO
	private void saveChangedComments() {
		post("services/comments/saveChangedComments", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			ArrayList<Comment> comments = null; 
			ArrayList<Comment> allComments = new ArrayList<Comment>();
			ArrayList<Comment> allCommentsEmpty = new ArrayList<Comment>();
			
			try {
				Type listType = new TypeToken<ArrayList<Comment>>(){}.getType(); 
				comments = g.fromJson(payload, listType);	
			}
			catch(Exception e) {
				res.status(400);
				return g.toJson("Bad request");
			}
			
			ArrayList<Apartment> newApList = apartmentDAO.getApartmentsList();
			for(Apartment a : newApList){
				for(Comment c : a.getComments()){
					for(Comment commentSent : comments){
						if(c.getId().equals(commentSent.getId())){
							c.setVisibility(commentSent.getVisibility());
						}
					}
				}
			}
			
			apartmentDAO.setApartmentsList(newApList);
			ApartmentDAO.writeApartmentsInFile(apartmentDAO.getApartmentsList());
			apartmentDAO.fillMapWithApartments();
			
			res.status(200);
			return g.toJson("ok");

		});
	
	}
	//URADJENO
	private void getAllCommentsForHost() {
		
		get("services/comments/getAllCommentsForHost", (req, res) -> {
            Session ss = req.session(true);
            Host host = ss.attribute("user");
            ArrayList<Comment> comments = new ArrayList<>();
            
            for(Apartment a : apartmentDAO.getApartmentsList()){
            	for(String aHost : host.getApartmentsForRent()){
            		if(a.getId().equals(aHost)){
            			comments.addAll(a.getComments());
            		}
            	}
            }
            
            /*
            for(Comment c : commentDAO.getCommentsList()){
            	for(String apartment : host.getApartmentsForRent()){
            		if(c.getApartment().equals(apartment)){
            			comments.add(c);
            		}
            	}
            }
            
            */

            if(comments.isEmpty()) {
                res.status(204);
                return ("No content");
            }
          

            res.status(200);
            return g.toJson(comments);
        });
	}
	
	//Uradjeno
	public void getAllComments() {
		get("services/comments/getAllComments", (req, res) -> {
			ArrayList<Comment> comments = new ArrayList<>();
			

			for(Apartment a : apartmentDAO.getApartmentsList()){
				for(Comment c : a.getComments()){
					comments.add(c);
				}
			}
			
			
			if(comments.isEmpty()) {
				res.status(204);
				return ("No content");
			}
			
			res.status(200);
			return g.toJson(comments);
			
		});
	}

}
