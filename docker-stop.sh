#!/bin/sh
export PATH="$PATH:/usr/local/bin/" && cd /Applications/TianGongLCA.app/Contents/ && docker compose -p "tiangonglca" down
if [ $? -ne 0 ];then
	echo "Docker engine is not running."
else
	echo "Docker services stopped."
fi
