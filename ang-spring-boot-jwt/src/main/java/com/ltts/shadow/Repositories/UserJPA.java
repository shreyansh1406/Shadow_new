package com.ltts.shadow.Repositories;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ltts.shadow.model.UsersLog;



public interface UserJPA extends JpaRepository<UsersLog, Integer>
{


	UsersLog findByUsername(String username);
	
}
