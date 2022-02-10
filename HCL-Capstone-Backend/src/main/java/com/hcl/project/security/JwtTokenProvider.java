package com.hcl.project.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.hcl.project.domain.User;

import io.jsonwebtoken.*;

@Component
public class JwtTokenProvider {
	public String generateToken(Authentication authentication) {
		User user =(User) authentication.getPrincipal();
		Date genDate = new Date(System.currentTimeMillis());
		
		Date expireDate = new Date(genDate.getTime() + SecurityConstants.EXPIRATION_TIME);
		
		String userId = Long.toString(user.getId());	
		Map<String, Object> claims = new HashMap<>();
		claims.put("id", user.getId());
		claims.put("username", user.getUsername());
		claims.put("fullName", user.getFullName());
		
		return Jwts.builder()
				.setSubject(userId)
				.setClaims(claims)
				.setIssuedAt(genDate)
				.setExpiration(expireDate)
				.signWith(SignatureAlgorithm.HS512, SecurityConstants.SECRET)
				.compact();
				
	}
	
	public boolean validateToken(String token) {
		try {
			Jwts.parser().setSigningKey(SecurityConstants.SECRET).parseClaimsJws(token);
			return true;	
		} catch (SignatureException ex) {
			System.out.println("Invalid JWT Signature");
		}catch (MalformedJwtException ex) {
		 System.out.println("Invalid JWT Token");
		}catch (ExpiredJwtException ex) {
			System.out.println("Expired JWT Token");
		}catch (UnsupportedJwtException e) {
			System.out.println("Unsupported JWT Token");
		}catch (IllegalArgumentException e) {
			System.out.println("JWT Claims String is Empty");
		}
		return false;
	}
	
	public Long getUserIdFromJWT(String token) {
		Claims claims = Jwts.parser().setSigningKey(SecurityConstants.SECRET).parseClaimsJws(token).getBody();
		String id = claims.get("id").toString();
		System.out.println(id);
		return Long.parseLong(id);
	}
}
