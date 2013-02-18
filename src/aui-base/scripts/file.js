/*
* Copyright (c) 2012, Liferay Inc. All rights reserved.
* Code licensed under the BSD License:
* https://github.com/liferay/alloy-ui/blob/master/LICENSE.txt
*
* @author Eduardo Lundgren <eduardo.lundgren@liferay.com>
*/

// -- Requires -----------------------------------------------------------------
var fs = require('fs-extra');

// -- Utils --------------------------------------------------------------------
function objectValues(obj) {
    var keys = Object.keys(obj),
        i = 0,
        len = keys.length,
        values = [];

    for (; i < len; ++i) {
        values.push(obj[keys[i]]);
    }

    return values;
}

// -- File ---------------------------------------------------------------------
exports.append = function(filepath, content, opt_callback) {
    fs.appendFile(filepath, content, opt_callback);
};

exports.copy = function(from, to, opt_callback) {
    return fs.copy(from, to, opt_callback);
};

exports.exists = function(path) {
    return fs.existsSync(path);
};

exports.find = function(filepath, opt_pattern) {
    return fs.readdirSync(filepath).filter(function(file) {
        return (opt_pattern || /.*/).test(file);
    });
};

exports.mkdir = function(path, mode) {
    if (!exports.exists(path)) {
        return fs.mkdirsSync(path, mode);
    }
};

exports.read = function(filepath) {
    return fs.readFileSync(filepath).toString();
};

exports.remove = function(filepath, opt_callback) {
    return fs.unlink(filepath, opt_callback);
};

exports.replaceRegex = function(filepath, regex, replacement) {
    var instance = this,
        content = instance.read(filepath);

    instance.write(filepath, content.replace(regex, replacement));
};

exports.replaceTokens = function(filepath, tokens, opt_outputFilepath) {
    var instance = this,
        keys = Object.keys(tokens),
        values = objectValues(tokens),
        content = instance.read(filepath);

    keys.forEach(function(key, index) {
        content = content.replace('@' + key.toUpperCase() + '@', values[index]);
    });

    instance.write(opt_outputFilepath || filepath, content);
};

exports.write = function(filepath, content) {
    return fs.writeFileSync(filepath, content);
};