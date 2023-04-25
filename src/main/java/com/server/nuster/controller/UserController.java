package com.server.nuster.controller;

import com.server.nuster.model.User;
import com.server.nuster.repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class UserController {

  @Autowired
  private UserRepository userRepository;

  @PostMapping("/add/user")
  @CrossOrigin(origins = "http://127.0.0.1:5500")
  public ResponseEntity<User> newUser(@RequestBody User newUser) {
    User savedUser = userRepository.save(newUser);
    return ResponseEntity.ok(savedUser);
  }

  @GetMapping("/users")
  @CrossOrigin(origins = "http://127.0.0.1:5500")
  public ResponseEntity<List<User>> getUsers() {
    List<User> userList = userRepository.findAll();
    return ResponseEntity.ok(userList);
  }
}
