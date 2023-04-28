package com.server.nuster.controller;

import com.server.nuster.model.PostLikes;
import com.server.nuster.repository.PostLikesRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class PostLikeController {

  @Autowired
  private PostLikesRepository postLikesRepository;

  @PostMapping("/like")
  @CrossOrigin(origins = "http://127.0.0.1:5500")
  public ResponseEntity<PostLikes> addLike(@RequestBody PostLikes addLike) {
    Optional<PostLikes> existingLike = postLikesRepository.findById(
      addLike.getId()
    );
    if (existingLike.isPresent()) {
      PostLikes updateLike = existingLike.get();
      if (addLike.getSupport() != 0) {
        updateLike.setSupport(addLike.getSupport());
      }
      if (addLike.getOppose() != 0) {
        updateLike.setOppose(addLike.getOppose());
      }
      PostLikes savedLike = postLikesRepository.save(updateLike);
      return ResponseEntity.ok(savedLike);
    } else {
      PostLikes savedLike = postLikesRepository.save(addLike);
      return ResponseEntity.ok(savedLike);
    }
  }

  @GetMapping("/likes")
  @CrossOrigin(origins = "http://127.0.0.1:5500")
  public ResponseEntity<List<PostLikes>> getlikes() {
    List<PostLikes> likeList = postLikesRepository.findAll();
    return ResponseEntity.ok(likeList);
  }
}
