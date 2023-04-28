package com.server.nuster.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class PostLikes {

  @Id
  @Column(name = "id", nullable = false)
  private Long id;

  @Column(name = "support", nullable = false)
  private int support;

  @Column(name = "oppose", nullable = false)
  private int oppose;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public int getSupport() {
    return support;
  }

  public void setSupport(int support) {
    this.support = support;
  }

  public int getOppose() {
    return oppose;
  }

  public void setOppose(int oppose) {
    this.oppose = oppose;
  }
}
