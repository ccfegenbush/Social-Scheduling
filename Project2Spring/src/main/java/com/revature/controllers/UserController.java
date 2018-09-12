package com.revature.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.model.AppUser;
import com.revature.services.UserServices;

@RestController
@RequestMapping("users")
public class UserController {

	@Autowired
	private UserServices us;

	@GetMapping
	public List<AppUser> findAll() {
		System.out.println("finding all users");
		List<AppUser> users = new ArrayList<>();
//		users.add(new AppUser(1, "DAN", "pass", "admin", "DAN", "DAN", "DAN");
//		return users;
		return us.findAll();
	}

//	@GetMapping("{id}")
//	public AppUser findById(@PathVariable int id) {
//		return new AppUser(1, "DAN", "pass", "admin", "DAN", "DAN",3, "DAN");
//	}

	@PostMapping
	public ResponseEntity<AppUser> save(@RequestBody AppUser u) {
		u.setId(1);
		ResponseEntity<AppUser> RE = new ResponseEntity<AppUser>(u, HttpStatus.CREATED);

		return RE;
	}
}
