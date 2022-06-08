@echo off
docker compose -p "tiangonglca" start || docker compose -p "tiangonglca" up -d
if %errorlevel% == 0 ( echo Docker services started. ) else ( echo Docker engine is not running. )
