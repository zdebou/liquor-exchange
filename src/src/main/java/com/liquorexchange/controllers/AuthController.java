package com.liquorexchange.controllers;

import com.liquorexchange.db.model.*;
import com.liquorexchange.db.repository.RoleRepository;
import com.liquorexchange.db.repository.UserRepository;
import com.liquorexchange.db.repository.UserSecurityRepository;
import com.liquorexchange.emails.SMTPEmailSender;
import com.liquorexchange.exception.LiquorExchangeException;
import com.liquorexchange.payload.*;
import com.liquorexchange.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserSecurityRepository userSecurityRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    JwtTokenProvider tokenProvider;

    @Autowired
    SMTPEmailSender emailSender;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
            )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                HttpStatus.BAD_REQUEST);
        }

        User user = new User(
            signUpRequest.getEmail(),
            new UserInfo(signUpRequest.getFirstName(), signUpRequest.getLastName()),
            signUpRequest.getIdentityCardNumber(),
            signUpRequest.getBirthDate(),
            signUpRequest.getAddress(),
            signUpRequest.getCompanyAddress(),
            signUpRequest.getCompanyName(),
            signUpRequest.getCompanyIdentificationNumber(),
            signUpRequest.getVATNumber()
        );

        User result = userRepository.save(user);

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
            .orElseThrow(() -> new LiquorExchangeException("User role not found."));

        UserSecurity security = UserSecurity.create(
            user,
            signUpRequest.getPassword(),
            new ArrayList<>(Collections.singleton(userRole))
        );

        userSecurityRepository.save(security);

        URI location = ServletUriComponentsBuilder
            .fromCurrentContextPath().path("/api/users/{email}")
            .buildAndExpand(result.getEmail()).toUri();

        emailSender.sendSimpleMessage(user.getEmail(), "Liquor Exchange: Thank you for your registration", "Dear " + user.getInfo().getFirstName() + ", \n thank you for your registration on Liquor Exchange.");

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }

    @PostMapping("/changepass")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordRequest changepassRequest) {
        Boolean success;
        String message;
        String email = "anna@gmail.com";
        Optional<User> user = userRepository.findByEmail(email);

        if (!changepassRequest.getNewPassword().matches(changepassRequest.getNewPasswordConfirm())) {
            success = false;
            message = "Password does not match with confirmation!";
        } else {
            if (!user.isPresent()) {
                success = false;
                message = "User not found!";
            } else {
                Optional<UserSecurity> security = userSecurityRepository.findByUser(user.get());
                if (security.isPresent()) {
                    if (!passwordEncoder.matches(changepassRequest.getOldPassword(), security.get().getPasswordHash())) {
                        success = false;
                        message = "Old password does not match!";
                    } else {
                        security.get().setPassword(changepassRequest.getNewPassword());
                        userSecurityRepository.save(security.get());
                        success = true;
                        message = "Password was changed.";
                        emailSender.sendSimpleMessage(email, "Liquor Exchange: Your password was changed.", "Dear " + user.get().getInfo().getFirstName() + ", \n your password on Liquor Exchange was changed.");
                    }
                } else {
                    success = false;
                    message = "User credentials not found!";
                }
            }
        }

        URI location = ServletUriComponentsBuilder
            .fromCurrentContextPath().path("/api/users/{email}")
            .buildAndExpand(email).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(success, message));
    }
}
