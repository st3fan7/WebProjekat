package services;

import static spark.Spark.get;
import static spark.Spark.post;

import java.lang.reflect.Type;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import dao.CommentDAO;
import spark.Session;
import beans.Comment;
import beans.Host;

public class CommentService {
	private static Gson g = new Gson();
	CommentDAO commentDAO = new CommentDAO();
	
	public CommentService() {
		saveChangedComments();
		getAllComments();
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
	
	private void getAllComments() {
		
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

}
