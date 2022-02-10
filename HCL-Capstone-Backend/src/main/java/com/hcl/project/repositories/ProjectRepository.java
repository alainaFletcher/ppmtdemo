package com.hcl.project.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hcl.project.domain.Project;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long>{
	Project findByProjectIdentifier(String projectId);
	
	@Override
	Iterable<Project> findAll();
	
	Iterable<Project> findByProjectLeader(String projectLeader);
}