package com.qima.demo.model.dto;

import lombok.Getter;

@Getter
public class AuthResponse {

	private String message;

	private String token;

	public String getToken() {
		return token;
	}

	public String getMessage() {
		return message;
	}

	public AuthResponse(String message, String token) {
		super();
		this.message = message;
		this.token = token;
	}

}
