#!/bin/bash

eval "$(ssh-agent -s)" # Start ssh-agent cache
chmod 600 .travis/id_rsa # Allow read access to the private key
ssh-add .travis/id_rsa # Add the private key to SSH

# Skip this command if you don't need to execute any additional commands after deploying.
ssh root@$IP <<EOF
  sh update.sh
EOF