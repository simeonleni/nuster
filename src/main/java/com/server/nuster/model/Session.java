package com.server.nuster.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Session {

  @Id
  @Column(name = "session", nullable = false)
  private String session;

  @Column(name = "user", nullable = false)
  private String user;

  public String getSession() {
    return session;
  }

  public void setSession(String session) {
    this.session = session;
  }

  public String getUser() {
    return user;
  }

  public void setUser(String user) {
    this.user = user;
  }
}
