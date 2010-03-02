#!/bin/sh

##############################################################################

# The location of your yuidoc install
# yuidoc_home=yahoo/presentation/tools/yuidoc
# yuidoc_home=~/www/yuidoc/yuidoc
yuidoc_home=..

src=~/src/yui3/src

parser_in="$src/yui/js"
 
# The location to output the parser data.  This output is a file containing a 
# json string, and copies of the parsed files.
parser_out=build_tmp/yuidoc_tmp

# The directory to put the html file outputted by the generator
generator_out=build_tmp/api

# The location of the template files.  Any subdirectories here will be copied
# verbatim to the destination directory.
template=$yuidoc_home/template

version="localtest"

##############################################################################

$yuidoc_home/bin/yuidoc.py $parser_in -p $parser_out -o $generator_out -t $template -v $version -s $*

