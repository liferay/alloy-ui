#!/usr/bin/env node

/*
* Copyright (c) 2012, Liferay Inc. All rights reserved.
* Code licensed under the BSD License:
* https://github.com/liferay/alloy-ui/blob/master/LICENSE.txt
*
* @author Eduardo Lundgren <eduardo.lundgren@liferay.com>
*/

// -- Header -------------------------------------------------------------------
var path = require('path'),
    root = path.join(__dirname, '../../../');

// -- Requires -----------------------------------------------------------------
var file = require('./file');

// -- CLI ----------------------------------------------------------------------
exports.getContent = function() {
    var auiMetaPath = path.join(root, 'src/aui-base/js/aui-loader.json'),
        data = require(auiMetaPath),
        meta = {};

    Object.keys(data).sort().forEach(function(moduleName) {
        if (moduleName === 'yui') {
            return;
        }

        if (data[moduleName].use) {
            meta[moduleName] = {
                use: data[moduleName].use
            };
        }
    });

    var modules = Object.keys(meta),
        buffer = [],
        content = '';

    if (modules.length) {
        modules.forEach(function(moduleName) {
            var module = meta[moduleName];
            buffer.push('    "' + moduleName + '": ' + JSON.stringify(module.use));
        });

        content += 'YUI.Env.aliases = YUI.Env.aliases || {};\n';
        content += 'Y.mix(YUI.Env.aliases, {\n';
        content += buffer.join(',\n');
        content += '\n});\n';
    }

    return content;
};