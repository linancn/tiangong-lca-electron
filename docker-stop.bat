@echo off
docker compose -p "tiangonglca" down
if %errorlevel% == 0 ( echo Docker stopped. ) else ( echo Docker is not running.)
