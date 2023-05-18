#!/bin/bash

# The actual commands we want to execute.
cd services/backend && php artisan serve --port=8000 --host=0.0.0.0 & \
cd services/frontend && yarn dev & \

# Trap the input and wait for the script to be cancelled.
waitforcancel
return 0
