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

parentDir=`dirname $toDir`

srcDir=${toDir}/src
demosDir=${toDir}/demos
buildDir=${toDir}/build
resourcesDir=${toDir}/resources

rm -rf $toDir
cp -R $fromDir $toDir

find $toDir -type d -name ".svn" | xargs rm -rf

perl -pi -e "s/^(build\.aui\.prefix=)/\$1gallery-/g;" ${toDir}/build.properties

perl -pi -e "s/window\.AUI = AUI;//g;" ${srcDir}/aui-base/js/aui-core.js

find $demosDir/* -type f -name "*.html" | xargs perl -pi -e 's/<script src="\.\.\/\.\.\/build\/aui\/aui\.js" type="text\/javascript"><\/script>/<script src="..\/..\/build\/yui\/yui.js" type="text\/javascript"><\/script><script src="..\/..\/build\/gallery-aui\/defaults.js" type="text\/javascript"><\/script><script src="..\/..\/build\/aui-base\/aui-base.js" type="text\/javascript"><\/script>/g;'

perl -pi -e 's/\${project\.dir}\/resources\/temp\/defaults\.js/\${project.dir}\/build\/gallery-aui\/defaults.js/' ${resourcesDir}/builder/macrolib.xml

perl -pi -e 's/(,widget-css)/$1,aui-skin-base/g;' ${srcDir}/aui-base/build.properties
perl -pi -e "s/^(component\.prependfiles).*$//" ${srcDir}/aui-base/build.properties
perl -pi -e "s/^(component\.jsfiles=).*$/\$1aui-base.js,aui-core.js/" ${srcDir}/aui-base/build.properties

perl -pi -e 's/template="\$\{project\.dir\}\/resources\/builder\/templates\//template="\${project.dir}\/lib\/builder\/componentbuild\/files\//g;' $resourcesDir/builder/macrolib.xml

find $srcDir/* -type f \( -name "build*.xml" -or -name "build*.properties" \) | xargs perl -pi -e 's/aui-/gallery-aui-/g;'
find $srcDir/* -type f -name "*.css" | xargs perl -pi -e 's/\.aui-/.yui3-/g;'
find $srcDir/* -type f -name "*.css" | xargs perl -pi -e 's/\/aui-/\/gallery-aui-/g;'

#replace all 'aui that is not like addClass('aui- or 'aui-helper or 'aui-state with 'gallery-aui
find $srcDir/* -type f -name "*.js" | xargs perl -pi -e "s/(?<!\()(')aui-(?!helper|state)/\$1gallery-aui-/g;"

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

skinDir=assets/skins/sam
skinPngPath=${skinDir}/*.png
skinGifPath=${skinDir}/*.gif
skinJpgPath=${skinDir}/*.jpg
imagePattern="png\|gif\|jpg"

#flatten rollups
for f in `find $srcDir -name 'build.gallery-aui-*.properties'` ;
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
	perl -pi -e 's/^(srcdir|global\.|component\.rollup)/#$1/g;' $oldModuleDir/build.properties
	perl -pi -e "s/^(component=)/component.jsfiles=${baseModuleName}.js\n\$1/g;" $oldModuleDir/build.properties
	perl -pi -e "s/^component.use=/component.requires=/g;" $oldModuleDir/build.properties
done

find ${toDir} -type f -name "build.properties" | xargs perl -pi -e "s/^(component=)/lint.skip=true\n\$1/"
find ${toDir} -type f -name "build.properties" | xargs perl -pi -e "s/^(component=)/yui.variable=A\n\$1/"

#Uncomment the following lines to move the builder to it's default location
#above the project directory
find ${toDir} -type f -name "build.xml" | xargs perl -pi -e 's/<import file="\.\.\/\.\.\/resources\/builder\/bootstrap\.xml" \/>/<import file="\${builddir}\/3.x\/bootstrap.xml" \/>/g;'
find ${toDir} -type f -name "build.properties" | xargs perl -pi -e "s/^(component=)/builddir=..\/..\/..\/builder\/componentbuild\n\$1/"

if [[ ! -d ${parentDir}/builder ]]; then
	cp -R ${toDir}/lib/builder ${parentDir}/builder
fi

cd $toDir

ant build-gallery