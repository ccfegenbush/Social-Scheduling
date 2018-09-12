package com.revature.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.model.AppUser;
import com.revature.repos.UserRepo;

@Service
public class UserServices {
	
	@Autowired
	private UserRepo ur;
	
	
	public List<AppUser> findAll() {
//		List<AppUser> users = new ArrayList<>();
//		users.add(new AppUser(1, "DAN", "pass", "admin", "DAN", "DAN", "DAN"));
		return ur.findAll();
	}
	
	public Optional<AppUser> findById(){
		return ur.findById(1);
	}
}
