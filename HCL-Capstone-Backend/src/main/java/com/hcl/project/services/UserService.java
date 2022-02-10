package com.hcl.project.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.hcl.project.domain.User;
import com.hcl.project.exceptions.DuplicateUsernameException;
import com.hcl.project.repositories.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	public User saveUser(User newUser) {
		try {
			newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
			newUser.setConfirmPassword("");
			return userRepository.save(newUser);
		}catch(Exception E) {
			throw new DuplicateUsernameException("Username '" + newUser.getUsername() +"' already exists");
		}
	}
}