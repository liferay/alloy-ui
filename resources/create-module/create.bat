@echo off

if "" == "%1" goto errorCreate

call ant create-module -Dmodule.name=%1

goto end

:errorCreate
	echo Please pass in a name

:end