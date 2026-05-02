package com.ridemumbai.ridemumbai_api;

import com.ridemumbai.model.User;
import com.ridemumbai.model.enums.Role;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class RidemumbaiApiApplicationTests {

	@Test
	void testUserAuthorities() {
		// A slightly better test: checking if the User model correctly maps roles to authorities
		User user = new User();
		user.setRole(Role.ROLE_ADMIN);
		
		Collection<? extends GrantedAuthority> authorities = user.getAuthorities();
		
		assertNotNull(authorities, "Authorities should not be null");
		assertEquals(1, authorities.size(), "Should have exactly 1 authority");
		assertEquals("ROLE_ADMIN", authorities.iterator().next().getAuthority(), "Authority should match the role name");
	}

}
