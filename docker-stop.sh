#!/bin/sh
export PATH="$PATH:/usr/local/bin/" && cd /Applications/CrystaLCA.app/Contents/ && docker compose stop
if [ $? -ne 0 ];then
	echo "Docker engine is not running."
else
	echo "Docker services stopped."
fi
