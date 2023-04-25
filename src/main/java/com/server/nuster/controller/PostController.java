package com.server.nuster.controller;

import com.server.nuster.model.Post;
import com.server.nuster.repository.PostRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class PostController {

  @Autowired
  private PostRepository postRepository;

  @PostMapping("/add/post")
  @CrossOrigin(origins = "http://127.0.0.1:5500")
  public ResponseEntity<Post> newPost(@RequestBody Post newPost) {
    Post savePost = postRepository.save(newPost);
    return ResponseEntity.ok().body(savePost);
  }

  @GetMapping("/posts")
  @CrossOrigin(origins = "http://127.0.0.1:5500")
  public ResponseEntity<List<Post>> getPost() {
    List<Post> posts = postRepository.findAll();
    return ResponseEntity.ok().body(posts);
  }
}
