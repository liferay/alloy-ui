#!/bin/bash

START=$(date +%s)

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

parentDir=`dirname $toDir`

srcDir=${toDir}/src
demosDir=${toDir}/demos
buildDir=${toDir}/build
resourcesDir=${toDir}/resources
libDir=${toDir}/lib

rm -rf $toDir
mkdir $toDir
cp -R $fromDir/src $fromDir/demos $fromDir/build $fromDir/resources $fromDir/lib $fromDir/*.*  $toDir

ignoredComponets="ace-editor classnamemanager data-browser drawing editor"

for ic in $ignoredComponets; do
	[[ -d "$srcDir/aui-$ic" ]] && rm -rf "$srcDir/aui-$ic"
	[[ -d "$demosDir/$ic" ]] && rm -rf "$demosDir/$ic"
done

rm -rf $srcDir/aui-ace-editor $srcDir/aui-classnamemanager $srcDir/aui-data-browser $srcDir/drawing $srcDir/aui-editor 

rm -rf $libDir/ace $libDir/patches $libDir/patches $libDir/yui-combo $libDir/yui-yuidoc

perl -pi -e "s/^(build\.aui\.prefix=)/\$1gallery-/g;" ${toDir}/build.properties

perl -pi -e "s/window\.AUI = AUI;//g;" ${srcDir}/aui-base/js/aui-core.js

find $demosDir/* -type f -name "*.html" | xargs perl -pi -e 's#<script src="\.\./\.\./build/aui/aui\.js" type="text/javascript"></script>#<script src="../../build/yui/yui.js" type="text/javascript"></script><script src="../../build/gallery-aui/defaults.js" type="text/javascript"></script><script src="../../build/aui-base/aui-base.js" type="text/javascript"></script>#g;'

perl -pi -e 's#\${project\.dir}/resources/temp/defaults\.js#\${project.dir}/build/gallery-aui/defaults.js#;' ${resourcesDir}/builder/macrolib.xml

perl -pi -e 's/(,widget-css)/$1,aui-skin-base/g;' -e "s/^(component\.prependfiles).*$//;" -e "s/^(component\.jsfiles=).*$/\$1aui-base.js,aui-core.js/;" ${srcDir}/aui-base/build.properties

perl -pi -e 's/template="\$\{project\.dir\}\/resources\/builder\/templates\//template="\${project.dir}\/lib\/builder\/componentbuild\/files\//g;' $resourcesDir/builder/macrolib.xml

find $srcDir/* -type f \( -name "build*.xml" -or -name "build*.properties" \) | xargs perl -pi -e 's/aui-/gallery-aui-/g;'
find $srcDir/* -type f -name "*.css" | xargs perl -pi -e 's/\.aui-/.yui3-/g;' -e 's/\/aui-/\/gallery-aui-/g;'

#replace all 'aui that is not like addClass('aui- or 'aui-helper or 'aui-state with 'gallery-aui
find $srcDir/* -type f -name "*.js" | xargs perl -pi -e "s/(?<!\()(')aui-(?!helper|state)/\$1gallery-aui-/g;"

find $demosDir/* -type f -name "*.html" | xargs perl -pi -e "s/(\/|')aui-/\$1gallery-aui-/g;" -e "s/([^gallery-])aui-/\$1yui3-/g;" -e "s/\.ready\(/.use(/g;" -e "s/\.use\(/.use('gallery-aui-skin-classic',/g;" -e "s/AUI\(\)/window.A=YUI(YUI.AUI_config)/g;" -e "s/AUI\(/YUI(/g;"

for f in `find $srcDir -name 'aui-*' -or -name 'build.aui-*'` ;
do
	cp -R $f ${f//aui-/gallery-aui-}
done

rm -rf `find $srcDir -name 'aui-*' -or -name 'build.aui-*'`
rm -rf `find $buildDir -type d -name 'aui-*'`

skinDir=assets/skins/sam
skinPngPath=${skinDir}/*.png
skinGifPath=${skinDir}/*.gif
skinJpgPath=${skinDir}/*.jpg
imagePattern="png\|gif\|jpg"

#flatten rollups
rollups=`find $srcDir -name 'build.gallery-aui-*.properties'`
for f in $rollups;
do
	newName=${f}
	baseName=`basename $newName`
	oldDirName=`dirname $newName`
	baseModuleName=`basename $oldDirName`

	moduleName=${baseName#build.}
	moduleName=${moduleName%.properties}

	oldModuleDir=$oldDirName
	newModuleDir=$srcDir/$moduleName

	mkdir -p $newModuleDir/js

	mv $oldModuleDir/build.$moduleName.properties $newModuleDir/build.properties
	mv $oldModuleDir/build.$moduleName.xml $newModuleDir/build.xml
	mv $oldModuleDir/js/$moduleName.js $newModuleDir/js/$moduleName.js

	coreCSSFile=assets/${moduleName}-core.css
	skinCSSFile=${skinDir}/${moduleName}-skin.css

	if [[ -f $oldModuleDir/$coreCSSFile ]]; then
		mkdir -p $newModuleDir/assets
		mv $oldModuleDir/$coreCSSFile $newModuleDir/$coreCSSFile
	fi
	
	if [[ -f $oldModuleDir/$skinCSSFile ]]; then
		mkdir -p $newModuleDir/assets/skins/sam
		mv $oldModuleDir/$skinCSSFile $newModuleDir/$skinCSSFile
	fi

	if grep $imagePattern $newModuleDir/$coreCSSFile >/dev/null 2>&1 || grep $imagePattern $newModuleDir/$skinCSSFile >/dev/null 2>&1
	then
		cp $oldModuleDir/$skinPngPath $newModuleDir/$skinDir 2>/dev/null
		cp $oldModuleDir/$skinGifPath $newModuleDir/$skinDir 2>/dev/null
		cp $oldModuleDir/$skinJpgPath $newModuleDir/$skinDir 2>/dev/null
	fi

	perl -pi -e 's/^(srcdir|global\.)/#$1/g;' $newModuleDir/build.properties
	perl -pi -e "s/build\.${moduleName}\.properties/build.properties/g;" $newModuleDir/build.xml
	
	touch $oldModuleDir/js/${baseModuleName}.js

	perl -pi -e 's/^(srcdir|global\.|component\.rollup)/#$1/g;' -e "s/^(component=)/component.jsfiles=${baseModuleName}.js\n\$1/g;" -e "s/^component.use=/component.requires=/g;" -e "s/^component\.skinnable=true/component.skinnable=false/g;" $oldModuleDir/build.properties

	if [ "$baseModuleName" = "gallery-aui-scheduler" ]; then
		mv $oldModuleDir/js/$moduleName*.js $newModuleDir/js/
	fi

	if [ "$moduleName" = "gallery-aui-form-builder-field" ]; then
		mv $oldModuleDir/js/$moduleName*.js $newModuleDir/js/
	fi

	if [[ "$moduleName" == "gallery-aui-base-core" ]]; then
		mv $oldModuleDir/js/gallery-aui-base.js $newModuleDir/js/
		mv $oldModuleDir/js/gallery-aui-core.js $newModuleDir/js/
		touch $oldModuleDir/js/${baseModuleName}.js
	fi
done

#manual cleanup
#change node requires rollup to not require html5/fx by default (they can "use" those modules).
perl -pi -e "s/^(component.requires=gallery-aui-node-base),/\$1/g;" ${srcDir}/gallery-aui-node/build.properties

#change aui-base to only include gallery-aui-node-base 
perl -pi -e "s/^component.requires=gallery-aui-node/component.requires=gallery-aui-node-base/g;" ${srcDir}/gallery-aui-base-core/build.properties

find ${srcDir} -type f -name "*.js" | xargs perl -pi -e "s/A\.getClassName/A.ClassNameManager.getClassName/"
grep -Rl "gallery-aui-classnamemanager" $srcDir | xargs perl -pi -e 's#gallery-aui-classnamemanager#classnamemanager#g'

addedProperties="lint.skip=true\nyui.variable=A\n"

#Uncomment the following lines to move the builder to it's default location
#above the project directory
find ${toDir} -type f -name "build.xml" | xargs perl -pi -e 's/<import file="\.\.\/\.\.\/resources\/builder\/bootstrap\.xml" \/>/<import file="\${builddir}\/3.x\/bootstrap.xml" \/>/g;'
addedProperties="${addedProperties}builddir=..\/..\/..\/builder\/componentbuild\n"


find ${toDir} -type f -name "build.properties" | xargs perl -pi -e "s/^(component=)/$addedProperties\$1/"

if [[ ! -d ${parentDir}/builder ]]; then
	cp -R ${toDir}/lib/builder ${parentDir}/builder
fi

cd $toDir

SCRIPT_END=$(date +%s)

ant build-gallery


TOTAL_END=$(date +%s)

SCRIPT_DIFF=$(( $SCRIPT_END - $START ))
TOTAL_DIFF=$(( $TOTAL_END - $START ))

echo "Script ran in $SCRIPT_DIFF seconds, and the entire thing, including ant, took $TOTAL_DIFF seconds"