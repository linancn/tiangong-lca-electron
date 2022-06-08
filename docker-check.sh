#!/bin/sh
export PATH="$PATH:/usr/local/bin/" && cd /Applications/TianGongLCA.app/Contents/ && (docker compose -p "tiangonglca" start || docker compose -p "tiangonglca" up -d)
if [ $? -ne 0 ];then
	echo "Docker engine is not running."
else
	echo "Docker services started."
fi
