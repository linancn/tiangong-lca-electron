#!/bin/sh
cd /opt/CrystaLCA/ && (docker compose start || docker compose up -d)
if [ $? -ne 0 ];then
	echo "Docker engine is not running."
else
	echo "Docker services started."
fi
