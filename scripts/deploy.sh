#!/bin/bash
# Skip this command if you don't need to execute any additional commands after deploying.
ssh root@$IP <<EOF
  rm -rf /var/www/html
  mkdir /var/www/html
EOF
scp -r frontend/dist/* root@$IP:/var/www/html