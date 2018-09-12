package com.revature.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.revature.model.AppUser;

@Service
public class UserServices {
	public List<AppUser> findAll() {
		List<AppUser> users = new ArrayList<>();
		users.add(new AppUser(1, "DAN", "pass", "admin", "DAN", "DAN", "DAN"));
		return users;
	}
}
