package com.server.nuster.repository;

import com.server.nuster.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {}
