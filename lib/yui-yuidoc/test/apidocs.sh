#!/bin/sh

##############################################################################

# The location of your yuidoc install
# yuidoc_home=yahoo/presentation/tools/yuidoc
# yuidoc_home=~/www/yuidoc/yuidoc
yuidoc_home=..

src=~/src/yui3/src

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
#parser_in="$src"

parser_in="$src/yui \
           $src/anim \
           $src/attribute \
           $src/base \
           $src/cache \
           $src/classnamemanager \
           $src/collection \
           $src/console \
           $src/console-filters \
           $src/cookie \
           $src/dataschema \
           $src/datasource \
           $src/datatype \
           $src/dd \
           $src/dom \
           $src/dump \
           $src/event \
           $src/event-custom \
           $src/event-simulate \
           $src/history \
           $src/imageloader \
           $src/io \
           $src/json \
           $src/node \
           $src/node-focusmanager \
           $src/node-menunav \
           $src/oop \
           $src/overlay \
           $src/plugin \
           $src/profiler \
           $src/slider \
           $src/stylesheet \
           $src/substitute \
           $src/test \
           $src/widget \
           $src/widget-position \
           $src/widget-position-ext \
           $src/widget-stdmod \
           $src/widget-stack"

# The location to output the parser data.  This output is a file containing a 
# json string, and copies of the parsed files.
parser_out=build_tmp/yuidoc_tmp

# The directory to put the html file outputted by the generator
generator_out=build_tmp/api

# The location of the template files.  Any subdirectories here will be copied
# verbatim to the destination directory.
template=$yuidoc_home/template

version=`cat version.txt`

##############################################################################

$yuidoc_home/bin/yuidoc.py $parser_in -p $parser_out -o $generator_out -t $template -v $version -s $*

