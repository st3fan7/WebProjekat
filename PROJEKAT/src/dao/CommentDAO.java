package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.Comment;

public class CommentDAO {
	private static Gson gson = new Gson();
	private HashMap<String, Comment> commentsMap = new HashMap<>();
	private ArrayList<Comment> commentsList = new ArrayList<>();
	
	public CommentDAO() {
		loadComments();
		fillMapWithComments();
	}

	private void loadComments() {
		try {
			setCommentsList(gson.fromJson(new BufferedReader(new InputStreamReader(new FileInputStream("./files/comments.json"), StandardCharsets.UTF_8 )), new TypeToken<ArrayList<Comment>>(){}.getType()));
		} catch (Exception e) {
			System.out.println("Error on loading comments.json files");
		}
		
	}

	public void fillMapWithComments() {
		if(commentsList != null) {
			for(int i = 0; i < commentsList.size(); i++) {
				commentsMap.put(commentsList.get(i).getId(), commentsList.get(i));
			}
		} else {
			commentsList = new ArrayList<Comment>();
		}
		
	}

	public static void writeCommentsInFile(ArrayList<Comment> comments) {
		try (BufferedWriter writer = Files.newBufferedWriter(Paths.get("./files/comments.json"), StandardCharsets.UTF_8)) {
			gson = new GsonBuilder().setPrettyPrinting().create();
			gson.toJson(comments, writer);
		} catch (Exception e) {
			System.out.println("Error in writing comments in files!");
		}
	}
	
	public Comment getCommentID(String id) {
		return commentsMap.get(id);
	}
	
	// getter and setter
	
	public HashMap<String, Comment> getCommentsMap() {
		return commentsMap;
	}

	public void setCommentsMap(HashMap<String, Comment> commentsMap) {
		this.commentsMap = commentsMap;
	}

	public ArrayList<Comment> getCommentsList() {
		return commentsList;
	}

	public void setCommentsList(ArrayList<Comment> commentsList) {
		this.commentsList = commentsList;
	}
	
	
}
