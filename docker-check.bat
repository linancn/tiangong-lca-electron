@echo off
docker compose -p "crystalca" start || docker compose -p "crystalca" up -d
if %errorlevel% == 0 ( echo Docker services started. ) else ( echo Docker engine is not running. )
