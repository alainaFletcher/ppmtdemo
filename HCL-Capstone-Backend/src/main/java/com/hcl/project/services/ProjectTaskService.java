package com.hcl.project.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hcl.project.domain.Backlog;
import com.hcl.project.domain.Project;
import com.hcl.project.domain.ProjectTask;
import com.hcl.project.exceptions.ProjectIdException;
import com.hcl.project.exceptions.ProjectNotFoundException;
import com.hcl.project.exceptions.ProjectSequenceUpdateException;
import com.hcl.project.repositories.BacklogRepository;
import com.hcl.project.repositories.ProjectRepository;
import com.hcl.project.repositories.ProjectTaskRepository;

@Service
public class ProjectTaskService {

	@Autowired
	private BacklogRepository backlogRepository;
	
	@Autowired
	private ProjectTaskRepository projectTaskRepository;
	
	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private ProjectService projectService;
	
	public ProjectTask addProjectTask(String projectIdentifier, ProjectTask pt, String username) {
			//Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
			Backlog backlog = projectService.findProjectByIdentifier(projectIdentifier, username).getBacklog();
			
			pt.setBacklog(backlog);
			int btSeq = backlog.getPTSequence() + 1;
			
			backlog.setPTSequence(btSeq);
			
			pt.setProjectSequence(projectIdentifier + "-" + btSeq);
			pt.setProjectIdentifier(projectIdentifier);
				
			if(pt.getPriority()==0) {
				pt.setPriority(3);
			}
				
			if(pt.getStatus()=="" || pt.getStatus()==null) {
				pt.setStatus("TO_DO");
			}
			
			
			return projectTaskRepository.save(pt);
	}

	public Iterable<ProjectTask> findBacklogById(String id, String username) {
		// TODO Auto-generated method stub
		
		Project project = projectRepository.findByProjectIdentifier(id);
		
		if(project==null) {
			throw new ProjectNotFoundException("Project with ID: '" + id + "' Not Found");
		}
		
		if(!project.getProjectLeader().equals(username)) {
			throw new ProjectIdException("You Do Not Have Access to Project With ID: '" + project.getProjectIdentifier().toUpperCase() + "'!");
		}
		
		return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
	}
	 
	public ProjectTask findPTbyProjectSequence(String backlog_id, String pt_id, String username) {
		ProjectTask pt = projectTaskRepository.findByProjectSequence(pt_id);
		
		if(pt == null) {
			throw new ProjectNotFoundException("Project Task With ID: '" + pt_id+"' Not Found");
		}
		
		String owner = pt.getBacklog().getProject().getProjectLeader();
		
		if(!owner.equals(username)) {
			throw new ProjectIdException("You Do Not Have Access to Project With ID: '" + pt.getProjectIdentifier().toUpperCase() + "'!");
		}
		
		if(!pt.getProjectIdentifier().equals(backlog_id)) {
			throw new ProjectNotFoundException("Invalid Project ID: '" + backlog_id);
		}
		
		return pt;
	}
	
	public ProjectTask updateProjectTask(ProjectTask updatedTask, String pt_id, String backlog_id, String username) {
		ProjectTask pt = findPTbyProjectSequence(backlog_id, pt_id, username);
		if(!updatedTask.getProjectSequence().equals(pt_id)) {
			throw new ProjectSequenceUpdateException("You are not allowed to change the project sequence!");
		}
		pt = updatedTask;
		return projectTaskRepository.save(pt);
	}
	
	public void deleteProjectTask(String backlog_id, String pt_id, String username) {
		ProjectTask pt = findPTbyProjectSequence(backlog_id, pt_id, username);
		projectTaskRepository.delete(pt);
	}
}
