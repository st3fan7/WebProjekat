package services;

import static spark.Spark.get;
import static spark.Spark.post;

import java.lang.reflect.Type;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Comment;
import beans.Host;
import dao.CommentDAO;
import spark.Session;

public class CommentService {
	private static Gson g = new Gson();
	CommentDAO commentDAO = new CommentDAO();
	
	public CommentService() {
		getVisibleComments();
		getCommentID();
		addNewCommet();
		saveChangedComments();
		getAllCommentsForHost();
		getAllComments();
	}
	
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
	
	private void getCommentID() {
		get("services/comments/getCommentID", (req, res) -> {
			int maxID = 1;
			
			for(int i = 0; i < commentDAO.getCommentsList().size(); i++) {
				
					String[] iNumberParts = commentDAO.getCommentsList().get(i).getId().split(" ");
					
					if(Integer.parseInt(iNumberParts[1]) > maxID) {
						maxID = Integer.parseInt(iNumberParts[1]);
					} 
			}

			maxID++;
			
            res.status(200);
            return g.toJson(maxID);
			
		});
	}
	
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
			
			commentDAO.getCommentsList().add(comment);
			CommentDAO.writeCommentsInFile(commentDAO.getCommentsList());
			commentDAO.fillMapWithComments();
			
			res.status(200);
			return "OK";
		}) ;
		
	}
	
	private void saveChangedComments() {
		post("services/comments/saveChangedComments", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			ArrayList<Comment> comments = null; 
			ArrayList<Comment> allComments = commentDAO.getCommentsList(); 
			ArrayList<Comment> allCommentsEmpty = new ArrayList<Comment>();
			
			try {
				Type listType = new TypeToken<ArrayList<Comment>>(){}.getType(); 
				comments = g.fromJson(payload, listType);	
			}
			catch(Exception e) {
				res.status(400);
				return g.toJson("Bad request");
			}
			
			for(Comment c1 : allComments){ 
				for(Comment c2 : comments){ 
					if(c1.getId().equals(c2.getId())){
						allCommentsEmpty.add(c1); 
					}
				}
			}
			
			allComments.removeAll(allCommentsEmpty);		
			allComments.addAll(comments);
			
			commentDAO.setCommentsList(allComments);
			CommentDAO.writeCommentsInFile(commentDAO.getCommentsList());
			commentDAO.fillMapWithComments();
			
			res.status(200);
			return g.toJson("ok");

		});
	
	}
	
	private void getAllCommentsForHost() {
		
		get("services/comments/getAllCommentsForHost", (req, res) -> {
            Session ss = req.session(true);
            Host host = ss.attribute("user");
            ArrayList<Comment> comments = new ArrayList<>();

            for(Comment c : commentDAO.getCommentsList()){
            	for(String apartment : host.getApartmentsForRent()){
            		if(c.getApartment().equals(apartment)){
            			comments.add(c);
            		}
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
	
	public void getAllComments() {
		get("services/comments/getAllComments", (req, res) -> {
			ArrayList<Comment> comments = commentDAO.getCommentsList();
			
			if(comments.isEmpty()) {
				res.status(204);
				return ("No content");
			}
			
			res.status(200);
			return g.toJson(comments);
			
		});
	}

}
