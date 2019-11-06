#!/bin/bash

# Skip this command if you don't need to execute any additional commands after deploying.
ssh root@$IP <<EOF
  sh update.sh
EOF