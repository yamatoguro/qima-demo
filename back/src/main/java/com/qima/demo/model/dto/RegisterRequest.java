package com.qima.demo.model.dto;

import java.util.Set;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

	private String name;
	private String username;
	private String password;
	private Set<String> roles; // ["ADMIN", "MANAGER", "EMPLOYEE"]
}
