#!/bin/sh

if [[ -z $1 ]]; then
	echo "Please pass in a name."
else
	ant create-demo -Ddemo.name=$1
fi