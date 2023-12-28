@echo off
start "Authentication Server Process" cmd /k "npm start"

ping -n 6 127.0.0.1 > nul

start "Server Process" cmd /k "py -3.11 RandomForest.py"