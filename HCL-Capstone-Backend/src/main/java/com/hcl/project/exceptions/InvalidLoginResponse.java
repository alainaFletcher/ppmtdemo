package com.hcl.project.exceptions;

import lombok.*;


public class InvalidLoginResponse {
	@Getter @Setter private String username;
	@Getter @Setter private String password;
	
	public InvalidLoginResponse() {
		this.username = "Invalid Username";
		this.password = "Invalid Password";
	}
}