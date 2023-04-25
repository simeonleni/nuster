package com.server.nuster.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Post {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "Post_title", nullable = false)
  private String title;

  @Column(name = "creator", nullable = false)
  private String creator;

  @Column(name = "post_image", nullable = true, columnDefinition = "TEXT")
  private String postImage;

  @Column(name = "descriptions", nullable = false)
  private String descriptions;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getCreator() {
    return creator;
  }

  public void setCreator(String creator) {
    this.creator = creator;
  }

  public String getPostImage() {
    return postImage;
  }

  public void setPostImage(String postImage) {
    this.postImage = postImage;
  }

  public String getDescriptions() {
    return descriptions;
  }

  public void setDescriptions(String descriptions) {
    this.descriptions = descriptions;
  }
}
