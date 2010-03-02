#!/usr/bin/env python
# -*- coding: utf-8 -*-
# vim: et sw=4 ts=4

'''
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.html
version: 1.0.0b1
'''

import os, re, string, logging, logging.config
from const import *
from optparse import OptionParser
from pygments import highlight
from pygments.formatters import HtmlFormatter
import codecs

try:
    logging.config.fileConfig(os.path.join(sys.path[0], LOGCONFIG))
except:
    pass

log = logging.getLogger('yuidoc.highlight')


class DocHighlighter(object):

    def __init__(self, inputdirs, outputdir, ext, newext):

        def _mkdir(newdir):
            if os.path.isdir(newdir): pass
            elif os.path.isfile(newdir):
                raise OSError("a file with the same name as the desired " \
                              "dir, '%s', already exists." % newdir)
            else:
                head, tail = os.path.split(newdir)
                if head and not os.path.isdir(head): _mkdir(head)
                if tail: os.mkdir(newdir)

        def highlightString(src):
            try:
                if self.currentExt == 'php':
                    from pygments.lexers import PhpLexer
                    return highlight(src, PhpLexer(), HtmlFormatter())
                elif self.currentExt == 'py':
                    from pygments.lexers import PythonLexer
                    return highlight(src, PythonLexer(), HtmlFormatter())
                elif self.currentExt == 'rb':
                    from pygments.lexers import RubyLexer
                    return highlight(src, RubyLexer(), HtmlFormatter())
                elif self.currentExt == 'pl':
                    from pygments.lexers import PerlLexer
                    return highlight(src, PerlLexer(), HtmlFormatter())
                elif self.currentExt == 'java':
                    from pygments.lexers import JavaLexer
                    return highlight(src, JavaLexer(), HtmlFormatter())
                elif self.currentExt == 'cs':
                    from pygments.lexers import CSharpLexer
                    return highlight(src, CSharpLexer(), HtmlFormatter())
                else:
                    from pygments.lexers import JavascriptLexer
                    return highlight(src, JavascriptLexer(), HtmlFormatter())
            except: 
                return "File could not be highlighted"

        def highlightFile(path, file):
            f=open(os.path.join(path, file))
            fileStr = codecs.open( os.path.join(path, file), "r", "utf-8" ).read()

            f.close()
            log.info("highlighting " + file)

            self.currentExt = os.path.splitext(file)[1].replace('.', '')

            highlighted = highlightString(fileStr)

            out = codecs.open( os.path.join(self.outputdir, file + self.newext), "w", "utf-8" )
            out.write(highlighted)
            out.close()

        def highlightDir(path):
            subdirs = []
            dircontent = ""
            for i in os.listdir(path):
                fullname = os.path.join(path, i)
                if os.path.isdir(fullname):
                    subdirs.append(fullname)
                else:
                    for ext in self.ext_check:
                        if i.lower().endswith(ext):
                            highlightFile(path, i)

            for i in subdirs:
                highlightDir(i)

        self.inputdirs = inputdirs
        self.outputdir = os.path.abspath(outputdir)
        _mkdir(self.outputdir)
        self.ext = ext
        self.currentExt = ''
        self.ext_check = ext.split(',')
        self.newext = newext

        log.info("-------------------------------------------------------")

        for i in inputdirs: 
            highlightDir(os.path.abspath(i))


def main():
    optparser = OptionParser("usage: %prog [options] inputdir1 inputdir2 etc")
    optparser.set_defaults(outputdir="out", ext=".js", newext=".highlighted")
    optparser.add_option( "-o", "--outputdir",
                          action="store", dest="outputdir", type="string",
                          help="Directory to write the parser results" )
    optparser.add_option( "-e", "--extension",
                          action="store", dest="ext", type="string",
                          help="The extension for the files that should be parsed" )
    optparser.add_option( "-n", "--newextension",
                          action="store", dest="newext", type="string",
                          help="The extension to append to the output file" )
    (opts, inputdirs) = optparser.parse_args()
    if len(inputdirs) > 0:
        docparser = DocHighlighter( inputdirs, 
                            opts.outputdir, 
                            opts.ext,
                            opts.newext )
    else:
        optparser.error("Incorrect number of arguments")
           
if __name__ == '__main__':
    main()
