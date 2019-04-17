#!/usr/bin/env bash
mongod --fork --logpath /var/log/mongo.log
mongo --verbose localhost:27017 <<EOF
use liquor
db.createUser(
  {
    user: "usr",
    pwd: "xyz123",
    roles: [ { role: "readWrite", db: "liquor" } ]
  }
)
EOF
java -Djava.security.egd=file:/dev/./urandom -Dspring.profiles.active=docker -jar /app.jar
