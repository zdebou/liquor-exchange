package com.liquorexchange.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.liquorexchange.db.model.UserSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class UserPrincipal implements UserDetails {

    @JsonIgnore
    private UserSecurity user;

    private Collection<? extends GrantedAuthority> authorities;

    public UserPrincipal(UserSecurity user, Collection<? extends GrantedAuthority> authorities) {
        this.user = user;
        this.authorities = authorities;
    }

    public static UserPrincipal create(UserSecurity user) {
        List<GrantedAuthority> authorities = user.getRoles().stream().map(role ->
            new SimpleGrantedAuthority(role.getName().name())
        ).collect(Collectors.toList());
        return new UserPrincipal(user, authorities);
    }

    @Override
    public String getUsername() {
        return this.user.getUser().getEmail();
    }

    @Override
    public String getPassword() {
        return this.user.getPasswordHash();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserPrincipal that = (UserPrincipal) o;
        return that.getUsername() == this.getUsername();
    }

    @Override
    public int hashCode() {
        return this.getUsername().hashCode();
    }
}
