package com.server.nuster.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class User {

  @Id
  @Column(name = "id", nullable = false)
  private String username;

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "surname", nullable = false)
  private String surname;

  @Column(name = "password", nullable = false)
  private String password;

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getSurname() {
    return surname;
  }

  public void setSurname(String surname) {
    this.surname = surname;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}
