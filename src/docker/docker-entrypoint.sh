#!/usr/bin/env bash
mongod --fork --logpath /var/log/mongo.log
java -Djava.security.egd=file:/dev/./urandom -Dspring.profiles.active=docker -jar /app.jar
