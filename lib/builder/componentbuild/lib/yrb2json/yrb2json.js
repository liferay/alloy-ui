/**
 * Converts resource bundles provided in YRB format into JSON format.
 *
 * YRB format is documented at
 * http://developer.yahoo.com/yui/3/intl/index.html#yrb
 */

/*jslint onevar: true, undef: true, nomen: true, eqeqeq: true, bitwise: true, regexp: true, newcap: true, immed: true */

var yrb2json = (function() {
        
var result = {};

function isCommentLine(line) {
    return (line.match(/^[ \t]*#/) !== null);
}

function isWhitespaceLine(line) {
    return (line.match(/^[ \t]*$/) !== null);
}

function isWhitespaceChar(c) {
    return c === " " || c === "\t";
}

/**
 * Checks whether the given key is not empty and doesn't contain backslashes.
 */
function checkKey(key) {
    if (key.length === 0) {
        throw new Error("Empty key not allowed.");
    }
    if (key.indexOf("\\") >= 0) {
        throw new Error("Backslash not allowed in key: " + key);
    }
}

function trimWhitespace(s) {
    var start = 0, end = s.length;
    while (start < s.length && isWhitespaceChar(s.charAt(start))) {
        start++;
    }
    while (end > start && isWhitespaceChar(s.charAt(end - 1))) {
        end--;
    }
    return s.substring(start, end);
}

/**
 * Unescapes all escape sequences that occur in s. Optionally trims whitespace
 * from beginning and end of string, taking care not to trim whitespace
 * that's part of an escape sequence.
 */
function unescapeValue(s, trim) {
    var pos, start, end, result;

    pos = s.indexOf("\\");
    if (pos >= 0) {
        result = "";
        start = 0;
        if (trim) {
            while (isWhitespaceChar(s.charAt(start))) {
                start++;
            }
        }
        while (pos >= 0) {
            result += s.substring(start, pos);
            if (pos + 1 >= s.length) {
                throw new Error("Illegal escape sequence: unaccompanied \\");
            }
            switch (s.charAt(pos + 1)) {
                case "\\":
                    result += "\\";
                    break;
                case "n":
                    result += "\n";
                    break;
                case "t":
                    result += "\t";
                    break;
                case " ":
                    result += " ";
                    break;
                case "#":
                    result += "#";
                    break;
                default:
                    throw new Error("Illegal escape sequence: \\" + s.charAt(pos + 1));
            }
            start = pos + 2;
            pos = s.indexOf("\\", start);
        }
        end = s.length;
        if (trim) {
            while (end > start && isWhitespaceChar(s.charAt(end - 1))) {
                end--;
            }
        }
        result += s.substring(start, end);
    } else {
        result = trim ? trimWhitespace(s) : s;
    }
    return result;
}

/**
 * Convert a string into JSON representation. Should use stringify once Rhino gets it.
 */
function jsonString(s) {
    return "\"" + s.replace(/\\/g, "\\\\").replace(/\"/g, "\\\"").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "\"";
}

function jsonKeyValue(key, value) {
    return jsonString(key) + ":" + jsonString(value);
}

/**
 * Converts the contents of one YRB file into corresponding JSON content.
 */
result.convert = function (source) {
    var lines, properties, hereDocId, i, line, equalsPos, key, remainder,
        match, value;

    if (source.length > 0 && source.charAt(0) === "\ufeff") {
        // remove BOM
        source = source.substring(1);
    }
    lines = source.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');

    properties = [];
    hereDocId = null; // null indicates we're not inside heredoc section

    for (i = 0; i < lines.length; i++) {
        line = lines[i];
        if (isCommentLine(line)) {
            continue;
        }
        if (hereDocId === null) {
            if (isWhitespaceLine(line)) {
                continue;
            }
            
            // extract the key
            equalsPos = line.indexOf("=");
            if (equalsPos < 0) {
                throw new Error("Missing '=' in line " + line + ".");
            }
            key = trimWhitespace(line.substring(0, equalsPos));
            checkKey(key);
            
            // decide whether it's simple or heredoc form
            remainder = line.substring(equalsPos + 1);
            if ((match = remainder.match(/^[ \t]*<<</)) !== null) {
                hereDocId = trimWhitespace(remainder.substring(match[0].length));
                value = null;
            } else {
                value = unescapeValue(remainder, true);
                properties.push(jsonKeyValue(key, value));
            }
        } else {
            if (line === hereDocId || line === hereDocId + ";") {
                value = value || "";
                properties.push(jsonKeyValue(key, value));
                hereDocId = null;
            } else {
                if (value === null) {
                    value = unescapeValue(line, false);
                } else {
                    value += "\n" + unescapeValue(line, false);
                }
            }
        }
    }
    if (hereDocId !== null) {
        throw new Error("Incomplete heredoc with id " + hereDocId + ".");
    }
    return '{' + properties.join(",") + "}";
};

return result;

}());

