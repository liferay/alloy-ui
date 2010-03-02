#!/bin/sh

##############################################################################

# The location of your yuidoc install
# yuidoc_home=yahoo/presentation/tools/yuidoc
# yuidoc_home=~/www/yuidoc/yuidoc
yuidoc_home=..

# The location of the files to parse.  Parses subdirectories, but will fail if
# there are duplicate file names in these directories.
# parser_in="$src/animation \
#          $src/attribute \
#          $src/base \
#          $src/dd \
#          $src/dom \
#          $src/json \
#          $src/json-parse \
#          $src/json-stringify \
#          $src/node \
#          $src/queue \
#          $src/yui"

# parser_in="lang"
parser_in="lang/java lang/python lang/perl lang/ruby"
 
# The location to output the parser data.  This output is a file containing a 
# json string, and copies of the parsed files.
parser_out=build_tmp/yuidoc_tmp

# The directory to put the html file outputted by the generator
generator_out=build_tmp/api

# The location of the template files.  Any subdirectories here will be copied
# verbatim to the destination directory.
template=$yuidoc_home/template

version=`test`

##############################################################################

$yuidoc_home/bin/yuidoc.py $parser_in -e .py,.java,.rb,.pl -p $parser_out -o $generator_out -t $template -v $version -s $*

