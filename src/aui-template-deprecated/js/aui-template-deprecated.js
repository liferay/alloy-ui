var Lang = A.Lang,
    UA = A.UA,
    LString = Lang.String,
    isArray = Lang.isArray,
    isDate = Lang.isDate,
    isString = Lang.isString,
    isObject = Lang.isObject,
    isValue = Lang.isValue,
    isUndefined = Lang.isUndefined,

    REGEX_TPL = /<tpl\b[^>]*?((for|if|exec)="([^"]+)")*?>((?:(?=([^<]+))\5|<(?!tpl\b[^>]*>))*?)<\/tpl>/,
    REGEX_NEWLINE = /\r\n|\n/g,
    REGEX_QUOTE = /'/g,
    REGEX_QUOTE_ESCAPED = /\\'/g,
    REGEX_PREFIX_GLOBAL_REPLACE = /^(?!\$)/,

    REGEX_TPL_VAR = /\{([\w-.#$]+)(?:\:([\w.]*)(?:\((.*?)?\))?)?(\s?[+\-*\/]\s?[\d.+\-*\/()]+)?\}/g,
    REGEX_TPL_SCRIPTLET = /\{\[((?:\\\]|.|\n)*?)\]\}/g,

    STR_BLANK = '',
    STR_COLON = ':',
    STR_COMMA = ',',
    STR_DOT = '.',
    STR_FOR = 'for',
    STR_EXEC = 'exec',
    STR_IF = 'if',
    STR_QUOTE = '\'',
    STR_BRACE_OPEN = '{',
    STR_BRACE_CLOSE = '}',
    STR_PAREN_OPEN = '(',
    STR_PAREN_CLOSE = ')',
    STR_GLOBAL_SYMBOL = '$',

    STR_JOIN_OPEN = STR_QUOTE + STR_COMMA,
    STR_JOIN_CLOSE = STR_COMMA + STR_QUOTE,

    STR_JOIN_GROUP_OPEN = STR_JOIN_OPEN + STR_PAREN_OPEN,
    STR_JOIN_GROUP_CLOSE = STR_PAREN_CLOSE + STR_JOIN_CLOSE,

    STR_COMPILE_TPL_ARGS = 'values, parent, $index, $i, $count, $last, $ns, $ans, $yns',

    BUFFER_HTML = ['<tpl>', null, '</tpl>'],

    BUFFER_STR_COMPILE_SUB_TPL = [
  STR_JOIN_OPEN + 'this._compileSubTpl(',
  null,
  STR_COMMA + STR_COMPILE_TPL_ARGS + STR_PAREN_CLOSE + STR_JOIN_CLOSE
 ],

    BUFFER_COMPILED_TPL_FN = [
  'compiledTplFn = function(' + STR_COMPILE_TPL_ARGS + ') { return [' + STR_QUOTE,
  null,
  STR_QUOTE + '].join("");};'
 ],

    BUFFER_GLOBAL_PROP = ['MAP_GLOBALS["', null, '"]'],

    BUFFER_VALUES_LOOKUP = [
  'values["',
  null,
  '"]'
 ],

    STR_INVOKE_METHOD_NAME_OPEN = 'this._invokeMethod("',
    STR_INVOKE_METHOD_NAME_CLOSE = '"' + STR_COMMA,

    STR_UNDEFINED_OUT = ' === undefined ? "" : ',

    STR_REPLACE_NEWLINE = '\\n',
    STR_REPLACE_QUOTE = "\\'",

    STR_VALUES = 'values',
    STR_PARENT = 'parent',
    STR_SPECIAL_I = '$i',
    STR_SPECIAL_INDEX = '$index',
    STR_SPECIAL_COUNT = '$count',
    STR_SPECIAL_LAST = '$last',
    STR_SPECIAL_ANS = '$ans',
    STR_SPECIAL_NS = '$ns',
    STR_SPECIAL_YNS = '$yns',
    STR_RETURN = 'return ',
    STR_WITHVALUES = 'with(values){ ',
    STR_WITHCLOSE = '; }',

    STR_LANGSTRING_VAR = 'LString.',

    TOKEN_TPL = 'AUITPL',
    TOKEN_TPL_LENGTH = TOKEN_TPL.length,
    TOKEN_PARENT_PROP = STR_PARENT + STR_DOT,
    TOKEN_THIS_PROP = 'this.',
    TOKEN_THIS_PROP_LENGTH = TOKEN_THIS_PROP.length,
    TOKEN_VALUES_PROP = STR_VALUES + STR_DOT,

    MAP_TPL_FN = {
        '.': new Function(
            STR_VALUES,
            STR_PARENT,
            STR_WITHVALUES + STR_RETURN + STR_VALUES + STR_WITHCLOSE
        ),
        '..': new Function(
            STR_VALUES,
            STR_PARENT,
            STR_WITHVALUES + STR_RETURN + STR_PARENT + STR_WITHCLOSE
        )
    },

    MAP_TPL_FILTERED_TYPES = {
        'boolean': true,
        'number': true,
        'string': true
    },

    MAP_TPL_VALUES = {
        '.': 'this._getValidValues(values)',
        '#': STR_SPECIAL_INDEX,
        '$index': STR_SPECIAL_INDEX,
        '$i': STR_SPECIAL_I,
        '$count': STR_SPECIAL_COUNT,
        '$last': STR_SPECIAL_LAST,
        '$ans': STR_SPECIAL_ANS,
        '$ns': STR_SPECIAL_NS,
        '$yns': STR_SPECIAL_YNS
    },

    MAP_GLOBALS = {},

    SRC_CREATE = {},

    AUI_NS = A.getClassName(STR_BLANK),
    YUI_NS = A.ClassNameManager.getClassName(STR_BLANK),

    _INSTANCES = {};

var Template = function(html, src) {
    var instance = this;

    var tpl;
    var fromStaticCall = (src === SRC_CREATE);

    if (fromStaticCall || A.instanceOf(instance, Template)) {
        if (!fromStaticCall) {
            html = instance._parseArgs(arguments);
        }

        tpl = instance._parse(html);
    }
    else {
        html = Template.prototype._parseArgs(arguments);

        tpl = new Template(html, SRC_CREATE);
    }

    return tpl;
};

Template.prototype = {
    html: function(tpl) {
        var instance = this;

        var retVal = instance;

        if (isValue(tpl)) {
            instance._parse(instance._parseArgs(arguments));
        }
        else {
            retVal = instance._html;
        }

        return retVal;
    },

    parse: function(values) {
        var instance = this;

        return instance._parentTpl.compiled.call(instance, values, {}, 1, 1, 1);
    },

    render: function(values, node) {
        var instance = this;

        var rendered = A.Node.create(instance.parse(values));

        node = node && A.one(node);

        if (node) {
            node.setContent(rendered);
        }

        return rendered;
    },

    _compile: function(tpl) {
        var instance = this;

        var compiledTplFn;

        var fnBody = tpl.tplBody;

        fnBody = fnBody.replace(REGEX_NEWLINE, STR_REPLACE_NEWLINE);
        fnBody = fnBody.replace(REGEX_QUOTE, STR_REPLACE_QUOTE);
        fnBody = fnBody.replace(REGEX_TPL_VAR, instance._compileTpl);
        fnBody = fnBody.replace(REGEX_TPL_SCRIPTLET, instance._compileCode);

        BUFFER_COMPILED_TPL_FN[1] = fnBody;

        var body = BUFFER_COMPILED_TPL_FN.join(STR_BLANK);

        var $yns = instance.$yns;
        var $ans = instance.$ans;
        var $ns = instance.$ns;

        eval(body);

        tpl.compiled = function(values, parent, $index, $i, $count, $last) {
            var buffer = [];

            var subTpl = STR_BLANK;

            var testFn = tpl.testFn;

            if (!testFn || testFn.call(instance, values, parent, $index, $i, $count, $last, $ns, $ans, $yns)) {
                var subValues = values;

                var tplFn = tpl.tplFn;

                if (tplFn) {
                    subValues = tplFn.call(instance, values, parent);
                    parent = values;
                }

                if (tplFn && isArray(subValues)) {
                    var length = subValues.length;

                    var execFn = tpl.execFn;

                    for (var i = 0; i < length; i++) {
                        var index = i + 1;
                        var last = (index == length);
                        var subValue = subValues[i];

                        buffer[buffer.length] = compiledTplFn.call(instance, subValue, parent, index, i, length, last,
                            $ns, $ans, $yns);

                        if (execFn) {
                            execFn.call(instance, subValues[i]);
                        }
                    }

                    subTpl = buffer.join(STR_BLANK);
                }
                else {
                    subTpl = compiledTplFn.call(instance, subValues, parent, $index, $i, $count, $last, $ns, $ans, $yns);
                }
            }

            return subTpl;
        };

        return instance;
    },

    _compileCode: function(match, code) {
        return STR_JOIN_GROUP_OPEN + code.replace(REGEX_QUOTE_ESCAPED, STR_QUOTE) + STR_JOIN_GROUP_CLOSE;
    },

    _compileSubTpl: function(id, values, parent, $index, $i, $count, $last, $ns, $ans, $yns) {
        var instance = this;

        var length;
        var tpl = instance.tpls[id];

        return tpl.compiled.call(instance, values, parent, $index, $i, $count, $last, $ns, $ans, $yns);
    },

    _compileTpl: function(match, name, methodName, args, math, offset, str) {
        var compiled;

        if (name.indexOf(TOKEN_TPL) === 0) {
            BUFFER_STR_COMPILE_SUB_TPL[1] = name.substr(TOKEN_TPL_LENGTH);

            compiled = BUFFER_STR_COMPILE_SUB_TPL.join(STR_BLANK);
        }
        else {
            var value = MAP_TPL_VALUES[name];

            if (!value) {
                if (name.indexOf(TOKEN_PARENT_PROP) === 0) {
                    value = name;
                }
                else if (name.indexOf(STR_DOT) > -1) {
                    value = TOKEN_VALUES_PROP + name;
                }
                else if (name.indexOf(STR_GLOBAL_SYMBOL) === 0 && (name in MAP_GLOBALS)) {
                    BUFFER_GLOBAL_PROP[1] = name;

                    value = BUFFER_GLOBAL_PROP.join(STR_BLANK);

                }
                else {
                    BUFFER_VALUES_LOOKUP[1] = name;

                    value = BUFFER_VALUES_LOOKUP.join(STR_BLANK);
                }
            }

            if (math) {
                value = STR_PAREN_OPEN + value + math + STR_PAREN_CLOSE;
            }

            if (methodName) {
                args = args ? STR_COMMA + args : STR_BLANK;

                if (methodName.indexOf(TOKEN_THIS_PROP) !== 0) {
                    methodName = STR_LANGSTRING_VAR + methodName + STR_PAREN_OPEN;
                }
                else {
                    methodName = STR_INVOKE_METHOD_NAME_OPEN + methodName.substr(TOKEN_THIS_PROP_LENGTH) +
                        STR_INVOKE_METHOD_NAME_CLOSE;

                    args = STR_COMMA + STR_VALUES;
                }
            }
            else {
                args = STR_BLANK;

                methodName = STR_PAREN_OPEN + value + STR_UNDEFINED_OUT;
            }

            compiled = STR_JOIN_OPEN + methodName + value + args + STR_JOIN_GROUP_CLOSE;
        }

        return compiled;
    },

    _getValidValues: function(values) {
        var instance = this;

        var val = STR_BLANK;

        if (MAP_TPL_FILTERED_TYPES[typeof values] || isDate(values)) {
            val = values;
        }

        return val;
    },

    _invokeMethod: function(methodName, value, allValues) {
        var instance = this;

        return instance[methodName](value, allValues);
    },

    _parse: function(html) {
        var instance = this;

        instance._html = html;

        var match;
        var id = 0;
        var tpls = [];

        BUFFER_HTML[1] = html;

        html = BUFFER_HTML.join(STR_BLANK);

        while (match = html.match(REGEX_TPL)) {
            var testFn = null;
            var execFn = null;
            var tplFn = null;
            var expression = match[2];
            var expressionValue = match[3];

            if (expressionValue) {
                if (expression == STR_FOR) {
                    tplFn = MAP_TPL_FN[expressionValue] || new Function(
                        STR_VALUES,
                        STR_PARENT,
                        STR_WITHVALUES + STR_RETURN + expressionValue + STR_WITHCLOSE
                    );
                }
                else {
                    expressionValue = LString.unescapeEntities(expressionValue);

                    if (expression == STR_IF) {
                        testFn = new Function(
                            STR_VALUES,
                            STR_PARENT,
                            STR_SPECIAL_INDEX,
                            STR_SPECIAL_I,
                            STR_SPECIAL_COUNT,
                            STR_SPECIAL_LAST,
                            STR_SPECIAL_NS,
                            STR_SPECIAL_ANS,
                            STR_SPECIAL_YNS,
                            STR_WITHVALUES + STR_RETURN + expressionValue + STR_WITHCLOSE
                        );
                    }
                    else if (expression == STR_EXEC) {
                        execFn = new Function(
                            STR_VALUES,
                            STR_PARENT,
                            STR_SPECIAL_INDEX,
                            STR_SPECIAL_I,
                            STR_SPECIAL_COUNT,
                            STR_SPECIAL_LAST,
                            STR_SPECIAL_NS,
                            STR_SPECIAL_ANS,
                            STR_SPECIAL_YNS,
                            STR_WITHVALUES + expressionValue + STR_WITHCLOSE
                        );
                    }
                }
            }

            var tplBody = match[4] || STR_BLANK;

            html = html.replace(match[0], STR_BRACE_OPEN + TOKEN_TPL + id + STR_BRACE_CLOSE);

            id = tpls.push({
                execFn: execFn,
                id: id,
                testFn: testFn,
                tplBody: tplBody,
                tplFn: tplFn
            });
        }

        var lastIndex = id - 1;

        while (id--) {
            instance._compile(tpls[id]);
        }

        instance._parentTpl = tpls[lastIndex];

        instance.tpls = tpls;

        return instance;
    },

    _parseArgs: function(args) {
        var instance = this;

        var config;

        var tpl = args[0];

        if (isArray(tpl)) {
            if (isObject(tpl[tpl.length - 1])) {
                config = tpl.pop();
            }
            else if (isObject(args[1])) {
                config = args[1];
            }

            tpl = tpl.join(STR_BLANK);
        }
        else if (args.length > 1) {
            var buffer = [];

            args = A.Array(args, 0, true);

            var length = args.length;
            var item;

            var lastItem = args[length - 1];

            if (isObject(lastItem)) {
                config = args.pop();
            }

            for (var i = 0; i < length; i++) {
                item = args[i];

                buffer.push(item);
            }

            tpl = buffer.join(STR_BLANK);
        }

        if (config) {
            A.mix(instance, config, true);
        }

        return tpl;
    },

    $ans: AUI_NS,
    $yns: YUI_NS
};

var TEMPLATE_PROTO = Template.prototype;

TEMPLATE_PROTO.$ns = AUI_NS;

var globalVar = function(key, value) {
    var retVal = null;

    if (isUndefined(value) && key) {
        retVal = MAP_GLOBALS[key];
    }
    else {
        if (key) {
            key = String(key).replace(REGEX_PREFIX_GLOBAL_REPLACE, STR_GLOBAL_SYMBOL);

            if (value !== null) {
                MAP_GLOBALS[key] = value;
                retVal = value;
            }
            else {
                delete MAP_GLOBALS[key];
            }
        }
    }

    return retVal;
};

Template.globalVar = TEMPLATE_PROTO.globalVar = globalVar;

Template._GLOBALS = MAP_GLOBALS;

var NODE_PROTO = A.Node.prototype;

NODE_PROTO.toTPL = function() {
    return Template.from(this);
};

NODE_PROTO.renderTPL = function(tpl, data) {
    var instance = this;

    if (isString(tpl) || isArray(tpl)) {
        tpl = new Template(tpl);
    }

    if (tpl && data) {
        tpl.render(instance, data);
    }

    return instance;
};

A.NodeList.importMethod(
    NODE_PROTO, [
   'renderTPL'
  ]
);

A.mix(
    Template, {
        from: function(node) {
            node = A.one(node);

            var content = STR_BLANK;

            if (node) {
                node = node.getDOM();

                var nodeName = String(node && node.nodeName).toLowerCase();

                if (nodeName != 'script') {
                    content = node.value || node.innerHTML;
                }
                else {
                    content = node.text || node.textContent || node.innerHTML;
                }
            }

            return new Template(content);
        },

        get: function(key) {
            var template = _INSTANCES[key];

            if (template && !A.instanceOf(template, Template)) {
                template = new Template(template);

                _INSTANCES[key] = template;
            }

            return template;
        },

        parse: function(key, data) {
            var template = Template.get(key);

            return template && template.parse(data);
        },

        register: function(key, value) {
            var instance = this;

            var tpl = value;

            if (!(key in _INSTANCES) &&
                (Lang.isArray(value) || A.instanceOf(value, Template))) {

                _INSTANCES[key] = value;
            }

            return value;
        },

        render: function(key, data, node) {
            var template = Template.get(key);

            return template && template.render(data, node);
        },

        _INSTANCES: _INSTANCES
    }
);

A.Template = Template;
