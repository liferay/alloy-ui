#!/usr/bin/env python
# -*- coding: utf-8 -*-
# vim: et sw=4 ts=4

'''
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.html
version: 1.0.0b1
'''

''' Prints documentation with htmltmpl from the json data outputted by parser.py  ''' 
import os, re, simplejson, shutil, logging, logging.config, time, datetime
from const import *
# from cStringIO import StringIO 
from Cheetah.Template import Template
from sets import Set
import codecs

try:
    logging.config.fileConfig(os.path.join(sys.path[0], LOGCONFIG))
except:
    pass

log = logging.getLogger('yuidoc.generate')


class DocGenerator(object):

    def __init__(self, inpath, datafile, outpath, templatepath, newext, showprivate=False, 
                 projectname='Yahoo! UI Library', 
                 version='', 
                 projecturl='http://developer.yahoo.com/yui/', 
                 ydn=False, copyrighttag='Yahoo! Inc.'):

        def _mkdir(newdir):
            if os.path.isdir(newdir): pass
            elif os.path.isfile(newdir):
                raise OSError("a file with the same name as the desired " \
                              "dir, '%s', already exists." % newdir)
            else:
                head, tail = os.path.split(newdir)
                if head and not os.path.isdir(head): _mkdir(head)
                if tail: os.mkdir(newdir)

       
        self.moduleprefix = MODULE_PREFIX
        self.inpath       = os.path.abspath(inpath)

        # set and output path, create if needed
        self.outpath      = os.path.abspath(outpath)
        self.newext = newext
        _mkdir(self.outpath)

        self.templatepath = os.path.abspath(templatepath)

        # copy all of the directories from the template directory to the
        # destination directory.
        for i in os.listdir(self.templatepath):
            fullname = os.path.join(self.templatepath, i)
            if os.path.isdir(fullname):
                targetdir = os.path.join(self.outpath, i)
                try:
                    shutil.rmtree(targetdir)
                except: pass
                # requires 2.6
                # shutil.copytree(fullname, targetdir, ignore=shutil.ignore_patterns(IGNORE_PATTERNS))
                shutil.copytree(fullname, targetdir)

        self.showprivate  = showprivate

        f = codecs.open(os.path.join(inpath, datafile), "r", "utf-8" )
        self.rawdata = f.read()

        # log.info('INPUT DATA: ' + self.rawdata)

        d = self.data = simplejson.loads(self.rawdata)

        self.projectname = projectname
        self.projecturl = projecturl
        self.copyrighttag = copyrighttag
        self.ydn = ydn
        self.version = version 
        self.modulename  = ""
        self.timestamp = "" # if supplied, linked script and css will have a timestamp appended to the url for cache busting
        self.moduletitle  = ""
        self.moduledesc  = "Please supply a module block somewhere in your code"
        # self.requires    = None
        self.modules = d[MODULES]
        self.modulenames = self.modules.keys()
        self.modulenames.sort(lambda x,y: cmp(x.lower(), y.lower()))
        self.cleansedmodulenames = {} 

        for mod in self.modulenames:
            self.cleansedmodulenames[mod] = self.cleanseStr(mod)

        self.cleansedmodulename = self.cleanseStr(self.modulename)
    
        self.classname   = ""
        self.filename    = ""
        self.pagetype    = ""
        self.classmap    = d[CLASS_MAP]
        self.classnames  = ""
        self.filenames   = ""
        self.allprops = []
        self.allprops_ext = []


    def cleanseStr(self, strg):
        cleanregex= re.compile(r"[^\w\-]")
        cleansed = cleanregex.sub('', strg.lower())
        # log.warn('cleansed module: %s' %(cleansed));
        return self.moduleprefix + cleansed

    def write(self, filename, data, template=True):
        out = codecs.open( os.path.join(self.outpath, filename), "w", "utf-8" )

        if template:
            datastr = data.respond()
            out.write(datastr)
        else:
            out.write(data)

        out.close()

    def process(self):

        def assignGlobalProperties(template):
            template.projectname  = self.projectname
            template.projecturl   = self.projecturl
            template.copyrighttag = self.copyrighttag
            template.ydn          = self.ydn
            template.version      = self.version
            template.modules      = self.modules
            template.modulenames  = self.modulenames
            template.cleansedmodulenames  = self.cleansedmodulenames
            template.modulename   = self.modulename
            template.moduletitle = self.moduletitle
            template.cleansedmodulename = self.cleansedmodulename 
            template.moduledesc   = self.moduledesc

            template.year         = datetime.date.today().strftime('%Y')

            template.filename     = self.filename
            if self.filename:
                template.filepath = os.path.join(self.inpath, self.filename)
                template.highlightcontent = codecs.open(os.path.join(self.inpath, self.filename + self.newext), "r", "utf-8" ).read()

            template.pagetype     = self.pagetype
            template.classmap     = self.classmap
            template.classnames   = self.classnames
            template.filenames    = self.filenames
            template.classname    = self.classname
            template.requires     = ""
            template.optional     = ""
            template.properties = ""
            template.methods = ""
            template.events  = ""
            template.configs = ""
            template.extends = ""
            template.uses   = ""
            template.index = False # is this the index page

        def transferToTemplate(prop, dict, template, valOverride=''):
            val = ""
            if prop in dict:
                val = dict[prop]

                if valOverride:
                    val = valOverride

            setattr(template, prop, val)

        def transferToDict(prop, dict1, dict2, default="", skipOverrideIfNoMatch=False):
            val = "" 
            if prop in dict1:
                val = dict1[prop]
                if not val: 
                    val = default
            else:
                if skipOverrideIfNoMatch:
                    pass
                else:
                    val = default

            dict2[prop] = val

        def shouldShow(item):
            if STATIC not in item and \
                    (self.showprivate or PRIVATE not in item):
                return True
            else:
                 return False

        def shouldShowClass(item):
            if self.showprivate or PRIVATE not in item:
                return True
            else:
                return False

        def soft_sort(x, y):
            return cmp(x.lower(), y.lower())


        def getPropsFromSuperclass(superc, classes, dict):
            # get inherited data
            if shouldShowClass(superc):
                supercname = superc[NAME]
                if PROPERTIES in superc:
                    inhdef = dict[PROPERTIES][supercname] = []
                    keys = superc[PROPERTIES].keys()
                    keys.sort(soft_sort)
                    for prop in keys:
                        superprop = superc[PROPERTIES][prop]
                        if shouldShow(superprop):
                            if PRIVATE in superprop: access = PRIVATE
                            elif PROTECTED in superprop: access = PROTECTED
                            else:access = ""
                            inhdef.append({NAME: prop, ACCESS: access, DEPRECATED: DEPRECATED in superprop})
                if METHODS in superc:
                    inhdef = dict[METHODS][supercname] = []
                    keys = superc[METHODS].keys()
                    keys.sort(soft_sort)
                    for method in keys:
                        supermethod = superc[METHODS][method]
                        if shouldShow(supermethod):
                            if PRIVATE in supermethod: access = PRIVATE
                            elif PROTECTED in supermethod: access = PROTECTED
                            else:access = ""
                            inhdef.append({NAME: method, ACCESS: access, DEPRECATED: DEPRECATED in supermethod})
                if EVENTS in superc:
                    inhdef = dict[EVENTS][supercname] = []
                    keys = superc[EVENTS].keys()
                    keys.sort(soft_sort)
                    for event in keys:
                        superevent = superc[EVENTS][event]
                        if shouldShow(superevent):
                            # inhdef.append(event)
                            if PRIVATE in superevent: access = PRIVATE
                            elif PROTECTED in superevent: access = PROTECTED
                            else:access = ""
                            inhdef.append({NAME: event, ACCESS: access, DEPRECATED: DEPRECATED in superevent})
                if CONFIGS in superc:
                    inhdef = dict[CONFIGS][supercname] = []
                    keys = superc[CONFIGS].keys()
                    keys.sort(soft_sort)
                    for config in keys:
                        superconfig = superc[CONFIGS][config]
                        if shouldShow(superconfig):
                            #inhdef.append(config)
                            if PRIVATE in superconfig: access = PRIVATE
                            elif PROTECTED in superconfig: access = PROTECTED
                            else:access = ""
                            inhdef.append({NAME: config, ACCESS: access, DEPRECATED: DEPRECATED in superconfig})

                if EXTENDS in superc:
                    supercname = superc[EXTENDS]
                    if supercname in classes:
                        getPropsFromSuperclass(classes[supercname], classes, dict)

                if USES in superc:
                    for supercname in superc[USES]:
                        if supercname in classes:
                            getPropsFromSuperclass(classes[supercname], classes, dict)

        # build url: class, property, type
        def getUrl(c, p, t=''):
            return "%s.html#%s_%s" %(c, t, p)

        #sort is case insensitive and ignores puctuation for the search json file
        def allprop_sort(x, y):
            pat = re.compile(r"[\_\-\.]")
            cx = x[NAME].lower()
            cy = y[NAME].lower()
            cx = pat.sub('', cx)
            cy = pat.sub('', cy)
            return cmp(cx, cy)

        def completeProp(main, ext):
            data = main.copy()
            if DESCRIPTION in ext:
                data[DESCRIPTION] = ext[DESCRIPTION]
            else:
                data[DESCRIPTION] = ''

            if PARAMS in ext:
                params = ext[PARAMS]
                count = 0
                result = []
                itemtemplate = '%s <%s> %s'
                for p in params:
                    if count > 0:
                        result.append(', ')
                    result.append(itemtemplate % (p[NAME] or 'unknown', p[TYPE] or 'Object', p[DESCRIPTION] or ''))
                    count+=1

                data[PARAMS] = ''.join(result)
            else:
                data[PARAMS] = ''

            return data


        log.info("-------------------------------------------------------")
 
        # copy the json file
        # jsonname = self.cleansedmodulename + ".json"
        jsonname = "raw.json"
        log.info("Writing " + jsonname)
        self.write(jsonname, self.rawdata, False)

        for mname in self.modules:
            log.info("Generating module splash for %s" %(mname))

            m = self.modules[mname]
            self.filename   = ""
            self.classname   = ""
            classes = self.data[CLASS_MAP]
            self.classnames = []

            for i in m[CLASS_LIST]:
                if shouldShowClass(classes[i]):
                    self.classnames.append(i)

            self.classnames.sort(soft_sort)

            t = Template(file=os.path.join(self.templatepath, "main.tmpl"))
            
            # @TODO add command line option for timestamp
            # timestamp = time.time()
            timestamp = ""
            t.timestamp = timestamp 

            transferToTemplate(REQUIRES, m, t)

            self.modulename   = mname
            self.moduletitle = mname
            if TITLE in m:
                self.moduletitle = m[TITLE]
            self.cleansedmodulename = self.cleanseStr(mname)

            if DESCRIPTION in m:
                self.moduledesc   = m[DESCRIPTION]
            else: 
                log.warn("Missing module description for " + mname)
                self.moduledesc   = ''

            self.filenames = m[FILE_LIST]
            self.filenames.sort(soft_sort)

            assignGlobalProperties(t)

            transferToTemplate(REQUIRES, m, t)
            transferToTemplate(OPTIONAL, m, t)

            transferToTemplate(BETA, m, t, "Beta")
            transferToTemplate(EXPERIMENTAL, m, t, "Experimental")
            
            if len(m[SUBMODULES]) > 0:
                strg = ', '.join(m[SUBMODULES])
            else:
                strg = 'none'
                
            transferToTemplate(SUBMODULES, m, t, strg)
            t.submodules = m[SUBMODULES]

            transferToTemplate(SUBDATA, m, t, '')
            t.subdata = m[SUBDATA]


            moduleprops = []
            classList = []

            # class API view
            #for i in classes:
            for i in m[CLASS_LIST]:
                self.classname = i
                c = classes[i]
                if shouldShowClass(c):
                    log.info("Generating API page for " + i)
                    assignGlobalProperties(t)

                    # template items that need default vaules even if not included
                    transferToTemplate( SEE, c, t )
                    transferToTemplate( DEPRECATED, c, t )
                    transferToTemplate( DESCRIPTION, c, t )
                    transferToTemplate( STATIC, c, t )
                    if STATIC in c: t.static = STATIC
                    transferToTemplate( FINAL, c, t )
                    if FINAL in c: t.final = FINAL
                    transferToTemplate( ACCESS, c, t )
                    if PRIVATE in c: t.access = PRIVATE
                    elif PROTECTED in c: t.access = PROTECTED

                    desc = ''
                    if DESCRIPTION in c:
                        desc = c[DESCRIPTION]


                    #subclasses
                    subclasses = self.subclasses = []
                    for j in classes:
                        if SUPERCLASS in classes[j] and classes[j][SUPERCLASS] == i:
                            subclasses.append(j)

                    t.subclasses = subclasses

                    gName = i.replace('YAHOO.widget.', '');
                    gName = gName.replace('YAHOO.util.', '');
                    classInfo = { DESCRIPTION: desc, NAME: i, GUESSEDNAME: gName, EXTENDS: [] }


                    # Properties/fields
                    props = t.properties = []
                    if PROPERTIES in c:
                        keys = c[PROPERTIES].keys()
                        keys.sort(soft_sort)
                        for propertykey in keys:
                            prop     = c[PROPERTIES][propertykey]
                            if self.showprivate or PRIVATE not in prop:
                                propdata = {
                                    NAME: propertykey, 
                                    HOST: i, 
                                    TYPE: 'property', 
                                    URL: getUrl(i, propertykey, PROPERTY)
                                }

                                transferToDict( ACCESS,   prop, propdata           )
                                if PRIVATE in prop: propdata[ACCESS] = PRIVATE
                                elif PROTECTED in prop: propdata[ACCESS] = PROTECTED

                                self.allprops.append(propdata.copy())
                                # completeProp(propdata, prop)
                                self.allprops_ext.append(completeProp(propdata, prop))

                                moduleprops.append(propdata.copy())

                                transferToDict( TYPE,        prop, propdata, OBJECT )
                                transferToDict( DESCRIPTION, prop, propdata           )
                                transferToDict( DEFAULT,     prop, propdata           )
                                transferToDict( DEPRECATED,  prop, propdata, NBWS, DEPRECATED )
                                transferToDict( SEE,         prop, propdata           )
                                transferToDict( STATIC,      prop, propdata           )
                                if STATIC in prop: propdata[STATIC] = STATIC
                                transferToDict( FINAL,      prop, propdata           )
                                if FINAL in prop: propdata[FINAL] = FINAL
                                props.append(propdata)


                    # Methods
                    methods = t.methods = []
                    if METHODS in c:
                        keys = c[METHODS].keys()
                        keys.sort(soft_sort)
                        for methodkey in keys:
                            method = c[METHODS][methodkey]
                            if self.showprivate or PRIVATE not in method:
                                methoddata = {NAME: methodkey, HOST: i, TYPE: 'method', URL:getUrl(i, methodkey, METHOD)}

                                transferToDict( ACCESS,      method, methoddata )
                                if PRIVATE in method: methoddata[ACCESS] = PRIVATE
                                elif PROTECTED in method: methoddata[ACCESS] = PROTECTED

                                self.allprops.append(methoddata.copy())
                                # completeProp(methodData, method)
                                self.allprops_ext.append(completeProp(methoddata, method))
                                moduleprops.append(methoddata.copy())

                                transferToDict( DESCRIPTION, method, methoddata )
                                transferToDict( DEPRECATED,  method, methoddata, NBWS, DEPRECATED )
                                transferToDict( SEE,         method, methoddata )
                                transferToDict( STATIC,      method, methoddata )
                                if STATIC in method: methoddata[STATIC] = STATIC
                                transferToDict( FINAL,      method, methoddata )
                                if FINAL in method: methoddata[FINAL] = FINAL

                                transferToDict( CHAINABLE,      method, methoddata )
                                if CHAINABLE in method: methoddata[CHAINABLE] = CHAINABLE

                                ret = methoddata[RETURN] = {NAME:"", DESCRIPTION:"", TYPE:VOID}
                                if RETURN in method:
                                    transferToDict( TYPE,        method[RETURN], ret, "" )
                                    transferToDict( DESCRIPTION, method[RETURN], ret )
                                    
                                params = methoddata[PARAMS] = []
                                if PARAMS in method:
                                    mp = method[PARAMS]
                                    for p in mp:
                                        param = {}
                                        transferToDict( NAME,        p, param, UNKNOWN )
                                        transferToDict( TYPE,        p, param, OBJECT )
                                        transferToDict( DESCRIPTION, p, param )
                                        params.append(param)

                                methods.append(methoddata)

                    # Events
                    events = t.events = []
                    if EVENTS in c:
                        keys = c[EVENTS].keys()
                        keys.sort(soft_sort)
                        for eventkey in keys:
                            event = c[EVENTS][eventkey]
                            if self.showprivate or PRIVATE not in event:
                                eventdata = {
                                    NAME: eventkey, 
                                    HOST: i, 
                                    TYPE: 'event', 
                                    URL: getUrl(i, eventkey, EVENT)
                                }

                                transferToDict( ACCESS,      event, eventdata )
                                if PRIVATE in event: eventdata[ACCESS] = PRIVATE
                                elif PROTECTED in event: eventdata[ACCESS] = PROTECTED

                                self.allprops.append(eventdata.copy())
                                # completeProp(eventdata, event)
                                self.allprops_ext.append(completeProp(eventdata, event))

                                moduleprops.append(eventdata.copy())

                                transferToDict( DESCRIPTION, event, eventdata )
                                transferToDict( DEPRECATED,  event, eventdata, NBWS, DEPRECATED )
                                transferToDict( SEE,         event, eventdata )
                                transferToDict( STATIC,      event, eventdata )
                                if STATIC in event: eventdata[STATIC] = STATIC
                                transferToDict( FINAL,      event, eventdata )
                                if FINAL in event: eventdata[FINAL] = FINAL

                                transferToDict( BUBBLES,      event, eventdata )
                                #Bubbles should contain a classname to bubble to
                                #if BUBBLES in event: eventdata[BUBBLES] = BUBBLES

                                transferToDict( PREVENTABLE,      event, eventdata )
                                #preventable should contain a default method
                                #Bug #20
                                #if PREVENTABLE in event: eventdata[PREVENTABLE] = PREVENTABLE

                                transferToDict( CANCELABLE,      event, eventdata )
                                if CANCELABLE in event: eventdata[CANCELABLE] = CANCELABLE

                                params = eventdata[PARAMS] = []
                                if PARAMS in event:
                                    mp = event[PARAMS]
                                    for p in mp:
                                        param = {}
                                        transferToDict( NAME,        p, param, UNKNOWN )
                                        transferToDict( TYPE,        p, param, OBJECT )
                                        transferToDict( DESCRIPTION, p, param )
                                        params.append(param)

                                events.append(eventdata)

                    # configs
                    configs = t.configs = []
                    if CONFIGS in c:
                        keys = c[CONFIGS].keys()
                        keys.sort(soft_sort)
                        for configkey in keys:
                            config = c[CONFIGS][configkey]
                            if self.showprivate or PRIVATE not in config:
                                configdata = {NAME: configkey, HOST: i, TYPE: 'config', URL:getUrl(i, configkey, CONFIG)}

                                transferToDict( ACCESS,   config, configdata           )
                                if PRIVATE in config: configdata[ACCESS] = PRIVATE
                                elif PROTECTED in config: configdata[ACCESS] = PROTECTED

                                self.allprops.append(configdata.copy())

                                # completeProp(configdata, config)
                                self.allprops_ext.append(completeProp(configdata, config))

                                moduleprops.append(configdata.copy())

                                transferToDict( TYPE,        config, configdata, OBJECT )
                                transferToDict( DESCRIPTION, config, configdata           )
                                transferToDict( DEFAULT, config, configdata           )
                                transferToDict( DEPRECATED,  config, configdata, NBWS, DEPRECATED )
                                transferToDict( SEE,         config, configdata           )
                                transferToDict( STATIC,      config, configdata           )
                                if STATIC in config: configdata[STATIC] = STATIC
                                transferToDict( FINAL,      config, configdata           )
                                if FINAL in config: configdata[FINAL] = READONLY
                                transferToDict( WRITEONCE,      config, configdata           )
                                if WRITEONCE in config: configdata[WRITEONCE] = WRITEONCE
                                configs.append(configdata)

                    # get inherited data
                    inherited = t.inherited = {PROPERTIES:{}, METHODS:{}, EVENTS:{}, CONFIGS:{}, SUPERCLASS: {} }
                    if EXTENDS in c:
                        supercname = t.extends = c[EXTENDS]
                        if supercname in classes:
                            superc = classes[supercname]
                            getPropsFromSuperclass(superc, classes, inherited)

                    if USES in c:
                        for supercname in c[USES]:
                            t.uses = c[USES]
                            if supercname in classes:
                                superc = classes[supercname]
                                getPropsFromSuperclass(superc, classes, inherited)
                    
                    #Create the superclass chain and attach it to the classInfo Object
                    extends = {}
                    for i in inherited:
                        for a in inherited[i]:
                            extends[a] = a
                    
                    inherited[SUPERCLASS] = extends
                    classInfo[EXTENDS] = inherited
                    classList.append(classInfo)

                    # Constructor -- technically the parser can take multiple constructors
                    # but that does't help here
                    constructordata = t.constructor = {}
                    if CONSTRUCTORS in c:
                        constructor = c[CONSTRUCTORS][0]
                        transferToDict( DESCRIPTION, constructor, constructordata )
                        ret = constructordata[RETURN] = {}
                        if RETURN in constructor:
                            transferToDict( TYPE,        constructor[RETURN], ret, VOID )
                            transferToDict( DESCRIPTION, constructor[RETURN], ret )
                            
                        params = constructordata[PARAMS] = []
                        if PARAMS in constructor:
                            cp = constructor[PARAMS]
                            for p in cp:
                                param = {}
                                transferToDict( NAME,        p, param, UNKNOWN )
                                transferToDict( TYPE,        p, param, OBJECT )
                                transferToDict( DESCRIPTION, p, param )
                                params.append(param)


                    # write module splash
                    moduleprops.sort(allprop_sort)
                    t.allprops_raw = moduleprops
                    moduleprops_json =  simplejson.dumps(moduleprops, ensure_ascii=False)
                    t.allprops = moduleprops_json
                    classList.sort(allprop_sort)
                    t.classList_raw = classList
                    t.classList = simplejson.dumps(classList, ensure_ascii=False)
                    self.write("%s.html" %(self.classname), t)
        
            # clear out class name
            self.classname   = ""
            t.classname = ""
            t.filename = ""
            t.properties = ""
            t.methods = ""
            t.events  = ""
            t.configs = ""


            # write module splash
            moduleprops.sort(allprop_sort)
            t.allprops_raw = moduleprops
            moduleprops_json =  simplejson.dumps(moduleprops, ensure_ascii=False)
            t.allprops = moduleprops_json

            # log.warn('cleansed module file name: %s' %(t.cleansedmodulename));
            self.write( t.cleansedmodulename + ".html", t)

            # class source view
            for i in m[FILE_LIST]:
                log.info("Generating source view for " + i)
                self.filename = i
                assignGlobalProperties(t)
                self.write("%s.html" %(self.filename), t)


        #remove dups
        allprops = []
        propmap = {}
        # for i in self.allprops:
        for i in self.allprops_ext:
            url = i[URL]
            if url not in propmap:
                allprops.append(i)
                propmap[url] = True

        allprops.sort(allprop_sort)

        # self.allprops_ext.sort(allprop_sort)
                                            
        allprops_json =  simplejson.dumps(allprops, ensure_ascii=False)
        self.write("index.json", allprops_json, False)

        # index
        log.info("Generating index")
        t = Template(file=os.path.join(self.templatepath, "main.tmpl"))
        # @TODO add command line option for timestamp
        # timestamp = time.time()
        timestamp = ""
        t.timestamp = timestamp 
        self.modulename   = ""
        self.moduletitle = ""
        self.classname   = ""
        self.classnames = []

        for i in self.data[CLASS_MAP].keys():
            if shouldShowClass(self.data[CLASS_MAP][i]):
                self.classnames.append(i)
        self.classnames.sort(soft_sort)
        
        self.filenames  = self.data[FILE_MAP].keys()
        self.filenames.sort(soft_sort)
        self.filename   = ""
        assignGlobalProperties(t)
        t.allprops = allprops_json
        t.index = True
        self.write("index.html", t)


        # map all classes to the corresponding module for external loaders
        t = Template(file=os.path.join(self.templatepath, "classmap.tmpl"))
        # @TODO add command line option for timestamp
        # timestamp = time.time()
        timestamp = ""
        t.timestamp = timestamp 
        pkgMap = {}
        keys = self.data[CLASS_MAP].keys()
        keys.sort()
        for i in keys:

            try:
                pkgMap[i] = self.data[CLASS_MAP][i][MODULE]
            except:
                try:
                    log.warn('class map ' + i + ' failure (no module declaration?)')
                except: pass

        t.pkgmap = simplejson.dumps(pkgMap, ensure_ascii=False)
        self.write("classmap.js", t)


        log.info(" ")
        log.info("Done\n")


def main():
    from optparse import OptionParser
    optparser = OptionParser("usage: %prog inputdir [options] inputdir")
    optparser.set_defaults(outputdir="docs", 
                           inputfile="parsed.json", 
                           newext=".highlighted", 
                           showprivate=False,
                           project="Yahoo! UI Library",
                           version=""
                           )
    optparser.add_option( "-o", "--outputdir",
        action="store", dest="outputdir", type="string",
        help="Directory to write the html documentation" )
    optparser.add_option( "-f", "--file",
        action="store", dest="inputfile", type="string",
        help="The name of the file that contains the JSON doc info" )
    optparser.add_option( "-t", "--template",
        action="store", dest="templatedir", type="string",
        help="The directory containing the html tmplate" )
    optparser.add_option( "-c", "--crosslink",
        action="store", dest="crosslinkdir", type="string",
        help="The directory containing json data for other modules to crosslink" )
    optparser.add_option( "-C", "--copyright",
        action="store", dest="copyrighttag", type="string",
        help="The name to use in the copyright line at the bottom of the pages." )        
    optparser.add_option( "-s", "--showprivate",
        action="store_true", dest="showprivate",
        help="Should private properties/methods be in the docs?" )
    optparser.add_option( "-n", "--newextension",
                          action="store", dest="newext", type="string",
                          help="The extension to append to the syntax output file" )
    optparser.add_option( "-m", "--project",
                          action="store", dest="project", type="string",
                          help="The name of the project" )
    optparser.add_option( "-v", "--version",
                          action="store", dest="version", type="string",
                          help="The version of the project" )

    optparser.add_option( "-u", "--projecturl",
                          action="store", dest="projecturl", type="string",
                          help="The project url" )
    optparser.add_option( "-y", "--ydn",
        action="store_true", dest="ydn",
        help="Add YDN MyBlogLog intrumentation?" )


    (options, inputdirs) = optparser.parse_args()

    if len(inputdirs) > 0:
        generator = DocGenerator( inputdirs[0], 
                               options.inputfile, 
                               options.outputdir,
                               options.templatedir,
                               options.showprivate,
                               options.project,
                               options.version,
                               options.projecturl,
                               options.ydn,
                               options.copyrighttag
                               )
        generator.process()
    else:
        optparser.error("Incorrect number of arguments")
           
if __name__ == '__main__':
    main()

