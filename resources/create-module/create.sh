#!/bin/sh

if [[ -z $1 ]]; then
	echo "Please pass in a name."
else
	ant create-module -Dmodule.name=$1
fi