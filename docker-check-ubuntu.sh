#!/bin/sh
cd /opt/CrystaLCA/ && (docker compose -p "crystalca" start || docker compose -p "crystalca" up -d)
if [ $? -ne 0 ];then
	echo "Docker engine is not running."
else
	echo "Docker services started."
fi
