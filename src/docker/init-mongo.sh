#!/usr/bin/env bash
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