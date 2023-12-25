@echo off
start "Server Process" cmd /k "cd ./server && node server"

ping -n 6 127.0.0.1 > nul

start "Authentication Server Process" cmd /k "cd ./my-app && npm start"