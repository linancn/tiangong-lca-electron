#!/bin/sh
cd /opt/TianGongLCA/ && docker compose -p "tiangonglca" stop
if [ $? -ne 0 ];then
	echo "Docker engine is not running."
else
	echo "Docker services stopped."
fi
