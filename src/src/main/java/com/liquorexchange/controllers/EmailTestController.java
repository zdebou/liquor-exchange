package com.liquorexchange.controllers;

import com.liquorexchange.emails.SMTPEmailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/email")
public class EmailTestController {

    @Autowired
    SMTPEmailSender emailSender;

    @PostMapping("/send")
    public void send() {
        emailSender.sendSimpleMessage("karelzav@gmail.com", "test Spring", "Hello World");
    }


}
