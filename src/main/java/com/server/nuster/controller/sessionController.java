package com.server.nuster.controller;

import com.server.nuster.model.Session;
import com.server.nuster.repository.SessionRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class sessionController {

  @Autowired
  private SessionRepository sessionRepository;

  @PostMapping("/add/session")
  @CrossOrigin(origins = "http://127.0.0.1:5500")
  public ResponseEntity<Session> newSession(@RequestBody Session newSession) {
    Session saveSession = sessionRepository.save(newSession);
    return ResponseEntity.ok(saveSession);
  }

  @GetMapping("/session")
  @CrossOrigin(origins = "http://127.0.0.1:5500")
  public ResponseEntity<List<Session>> getSession() {
    List<Session> sessionList = sessionRepository.findAll();
    return ResponseEntity.ok(sessionList);
  }
}
