#!/bin/bash

eval "$(ssh-agent -s)" # Start ssh-agent cache
chmod 600 .travis/deploy_key # Allow read access to the private key
ssh-add .travis/deploy_key # Add the private key to SSH

# Skip this command if you don't need to execute any additional commands after deploying.
ssh root@$IP <<EOF
  sh update.sh
EOF