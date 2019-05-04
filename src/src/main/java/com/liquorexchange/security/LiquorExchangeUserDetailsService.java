package com.liquorexchange.security;

import com.liquorexchange.db.model.User;
import com.liquorexchange.db.model.UserSecurity;
import com.liquorexchange.db.repository.UserRepository;
import com.liquorexchange.db.repository.UserSecurityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LiquorExchangeUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserSecurityRepository userSecurityRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
            .orElseThrow(() ->
                new UsernameNotFoundException("User not found with email: " + username)
            );
        UserSecurity security = userSecurityRepository.findByUser(user).orElseThrow(() -> new UsernameNotFoundException("User credentials not found with email: " + username)
        );
        return UserPrincipal.create(security);
    }
}
