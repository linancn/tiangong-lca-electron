@echo off
docker compose start || docker compose up -d
if %errorlevel% == 0 ( echo Docker services started. ) else ( echo Docker engine is not running. )
