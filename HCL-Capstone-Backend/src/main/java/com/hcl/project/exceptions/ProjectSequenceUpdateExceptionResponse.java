package com.hcl.project.exceptions;

public class ProjectSequenceUpdateExceptionResponse {
	private String projectSequence;

	public ProjectSequenceUpdateExceptionResponse(String projectSequence) {
		this.projectSequence = projectSequence;
	}

	public String getProjectSequence() {
		return projectSequence;
	}

	public void setProjectSequence(String projectSequence) {
		this.projectSequence = projectSequence;
	}
}
