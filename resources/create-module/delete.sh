#!/bin/sh

if [[ -z $1 ]]; then
	echo "Please pass in a name."
else
	ant delete-module -Dmodule.name=$1
fi