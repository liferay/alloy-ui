#!/bin/bash -x ;-x for debugging

curScript=`perl -e "use Cwd qw(realpath);print realpath('$0');"`
curDir=`dirname $curScript`
projectDir=`perl -e "use Cwd qw(realpath);print realpath('$curDir/../../');"`

toDir=$1
fromDir=$2

if [[ ! $toDir ]]; then
	toDir="${projectDir}_export"
fi

if [[ ! $fromDir ]]; then
	fromDir=$projectDir
fi

rm -rf $toDir
cp -R $fromDir $toDir

find $toDir -type d -name ".svn" | xargs rm -rf

srcDir=${toDir}/src
demosDir=${toDir}/demos
buildDir=${toDir}/build

find ${toDir} -type f -name "build.xml" | xargs perl -pi -e 's/<property name="build\.aui\.prefix" value=""\/>/<property name="build.aui.prefix" value="gallery-"\/>/g;'

find $srcDir/aui-base -type f -name "build.properties" | xargs perl -pi -e 's/(,widget-css)/$1,aui-skin-base/g;'

find $srcDir/* -type f \( -name "build*.xml" -or -name "build*.properties" \) | xargs perl -pi -e 's/aui-/gallery-aui-/g;'
find $srcDir/* -type f -name "*.css" | xargs perl -pi -e 's/\.aui-/.yui3-/g;'
find $srcDir/* -type f -name "*.css" | xargs perl -pi -e 's/\/aui-/\/gallery-aui-/g;'
find $demosDir/* -type f -name "*.html" | xargs perl -pi -e "s/(\/|')aui-/\$1gallery-aui-/g;"
find $demosDir/* -type f -name "*.html" | xargs perl -pi -e "s/([^gallery-])aui-/\$1yui3-/g;"
find $demosDir/* -type f -name "*.html" | xargs perl -pi -e "s/\.ready\(/.use(/g;"
find $demosDir/* -type f -name "*.html" | xargs perl -pi -e "s/\.use\(/.use('gallery-aui-skin-classic',/g;"
find $demosDir/* -type f -name "*.html" | xargs perl -pi -e "s/AUI\(\)/YUI(YUI.AUI_config)/g;"
find $demosDir/* -type f -name "*.html" | xargs perl -pi -e "s/AUI\(/YUI(/g;"

for f in `find $srcDir -name 'aui-*' -or -name 'build.aui-*'` ;
do
	cp -R $f ${f//aui-/gallery-aui-}
done
rm -rf `find $srcDir -name 'aui-*' -or -name 'build.aui-*'`
rm -rf `find $buildDir -type d -name 'aui-*'`

cd $toDir
ant build-gallery

