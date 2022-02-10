package com.hcl.project.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

@Service
public class MapValidationErrorService {
	public ResponseEntity<?> MapValidationService(BindingResult result){
		if(result.hasErrors()) {
			Map<String, String> errMap = new HashMap<>();
			result.getFieldErrors().stream().forEach((e) -> errMap.put(e.getField(), e.getDefaultMessage()));

			return new ResponseEntity<Map<String, String>>(errMap, HttpStatus.BAD_REQUEST);
		}
		
		return null;
	}
}
