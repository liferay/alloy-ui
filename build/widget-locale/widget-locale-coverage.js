if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/widget-locale/widget-locale.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/widget-locale/widget-locale.js",
    code: []
};
_yuitest_coverage["build/widget-locale/widget-locale.js"].code=["YUI.add('widget-locale', function (Y, NAME) {","","/**"," * Provides string support for widget with BCP 47 language tag lookup. This module has been deprecated."," * It's replaced by the \"intl\" module which provides generic internationalization and BCP 47 language tag"," * support with externalization."," *"," * @module widget-locale"," * @deprecated This module has been deprecated. It's replaced by the \"intl\" module which provides"," * generic internationalization and BCP 47 language tag support with externalization."," */","var TRUE = true,","    LOCALE = \"locale\",","    INIT_VALUE = \"initValue\",","    HYPHEN = \"-\",","    EMPTY_STR = \"\",","    Widget = Y.Widget;","","/**"," * @attribute locale"," * @deprecated Use Y.config.lang and Y.Intl externalization support"," * @description"," * The default locale for the widget. NOTE: Using get/set on the \"strings\" attribute will"," * return/set strings for this locale."," * @default \"en\""," * @type String"," */","Widget.ATTRS[LOCALE] = {","    value: \"en\"","};","","// Since strings support with locale needs the private _strs setup","Widget.ATTRS.strings.lazyAdd = false;","","Y.mix(Widget.prototype, {","","    /**","     * Sets strings for a particular locale, merging with any existing","     * strings which may already be defined for the locale.","     *","     * @method _setStrings","     * @protected","     * @param {Object} strings The hash of string key/values to set","     * @param {Object} locale The locale for the string values being set","     */","    _setStrings : function(strings, locale) {","        var strs = this._strs;","        locale = locale.toLowerCase();","","        if (!strs[locale]) {","            strs[locale] = {};","        }","","        Y.aggregate(strs[locale], strings, TRUE);","        return strs[locale];","    },","","    /**","     * Returns the strings key/value hash for a paricular locale, without locale lookup applied.","     *","     * @method _getStrings","     * @protected","     * @param {Object} locale","     */","    _getStrings : function(locale) {","        return this._strs[locale.toLowerCase()];","    },","","    /**","     * Gets the entire strings hash for a particular locale, performing locale lookup.","     * <p>","     * If no values of the key are defined for a particular locale the value for the","     * default locale (in initial locale set for the class) is returned.","     * </p>","     * @method getStrings","     * @param {String} locale (optional) The locale for which the string value is required. Defaults to the current locale, if not provided.","     */","    // TODO: Optimize/Cache. Clear cache on _setStrings call.","    getStrings : function(locale) {","","        locale = (locale || this.get(LOCALE)).toLowerCase();","","","        var defLocale = this.getDefaultLocale().toLowerCase(),","            defStrs = this._getStrings(defLocale),","            strs = (defStrs) ? Y.merge(defStrs) : {},","            localeSegments = locale.split(HYPHEN),","            localeStrs,","            i, l,","            lookup;","","        // If locale is different than the default, or needs lookup support","        if (locale !== defLocale || localeSegments.length > 1) {","            lookup = EMPTY_STR;","            for (i = 0, l = localeSegments.length; i < l; ++i) {","                lookup += localeSegments[i];","","","                localeStrs = this._getStrings(lookup);","                if (localeStrs) {","                    Y.aggregate(strs, localeStrs, TRUE);","                }","                lookup += HYPHEN;","            }","        }","","        return strs;","    },","","    /**","     * Gets the string for a particular key, for a particular locale, performing locale lookup.","     * <p>","     * If no values if defined for the key, for the given locale, the value for the","     * default locale (in initial locale set for the class) is returned.","     * </p>","     * @method getString","     * @param {String} key The key.","     * @param {String} locale (optional) The locale for which the string value is required. Defaults to the current locale, if not provided.","     */","    getString : function(key, locale) {","","        locale = (locale || this.get(LOCALE)).toLowerCase();","","","        var defLocale = (this.getDefaultLocale()).toLowerCase(),","            strs = this._getStrings(defLocale) || {},","            str = strs[key],","            idx = locale.lastIndexOf(HYPHEN);","","        // If locale is different than the default, or needs lookup support","        if (locale !== defLocale || idx != -1) {","            do {","","                strs = this._getStrings(locale);","                if (strs && key in strs) {","                    str = strs[key];","                    break;","                }","                idx = locale.lastIndexOf(HYPHEN);","                // Chop of last locale segment","                if (idx != -1) {","                    locale = locale.substring(0, idx);","                }","","            } while (idx != -1);","        }","","        return str;","    },","","    /**","     * Returns the default locale for the widget (the locale value defined by the","     * widget class, or provided by the user during construction).","     *","     * @method getDefaultLocale","     * @return {String} The default locale for the widget","     */","    getDefaultLocale : function() {","        return this._state.get(LOCALE, INIT_VALUE);","    },","","    _strSetter : function(val) {","        return this._setStrings(val, this.get(LOCALE));","    },","","    _strGetter : function(val) {","        return this._getStrings(this.get(LOCALE));","    }","}, true);","","","}, 'patched-v3.18.1', {\"requires\": [\"widget-base\"]});"];
_yuitest_coverage["build/widget-locale/widget-locale.js"].lines = {"1":0,"12":0,"28":0,"33":0,"35":0,"47":0,"48":0,"50":0,"51":0,"54":0,"55":0,"66":0,"81":0,"84":0,"93":0,"94":0,"95":0,"96":0,"99":0,"100":0,"101":0,"103":0,"107":0,"122":0,"125":0,"131":0,"132":0,"134":0,"135":0,"136":0,"137":0,"139":0,"141":0,"142":0,"148":0,"159":0,"163":0,"167":0};
_yuitest_coverage["build/widget-locale/widget-locale.js"].functions = {"_setStrings:46":0,"_getStrings:65":0,"getStrings:79":0,"getString:120":0,"getDefaultLocale:158":0,"_strSetter:162":0,"_strGetter:166":0,"(anonymous 1):1":0};
_yuitest_coverage["build/widget-locale/widget-locale.js"].coveredLines = 38;
_yuitest_coverage["build/widget-locale/widget-locale.js"].coveredFunctions = 8;
_yuitest_coverline("build/widget-locale/widget-locale.js", 1);
YUI.add('widget-locale', function (Y, NAME) {

/**
 * Provides string support for widget with BCP 47 language tag lookup. This module has been deprecated.
 * It's replaced by the "intl" module which provides generic internationalization and BCP 47 language tag
 * support with externalization.
 *
 * @module widget-locale
 * @deprecated This module has been deprecated. It's replaced by the "intl" module which provides
 * generic internationalization and BCP 47 language tag support with externalization.
 */
_yuitest_coverfunc("build/widget-locale/widget-locale.js", "(anonymous 1)", 1);
_yuitest_coverline("build/widget-locale/widget-locale.js", 12);
var TRUE = true,
    LOCALE = "locale",
    INIT_VALUE = "initValue",
    HYPHEN = "-",
    EMPTY_STR = "",
    Widget = Y.Widget;

/**
 * @attribute locale
 * @deprecated Use Y.config.lang and Y.Intl externalization support
 * @description
 * The default locale for the widget. NOTE: Using get/set on the "strings" attribute will
 * return/set strings for this locale.
 * @default "en"
 * @type String
 */
_yuitest_coverline("build/widget-locale/widget-locale.js", 28);
Widget.ATTRS[LOCALE] = {
    value: "en"
};

// Since strings support with locale needs the private _strs setup
_yuitest_coverline("build/widget-locale/widget-locale.js", 33);
Widget.ATTRS.strings.lazyAdd = false;

_yuitest_coverline("build/widget-locale/widget-locale.js", 35);
Y.mix(Widget.prototype, {

    /**
     * Sets strings for a particular locale, merging with any existing
     * strings which may already be defined for the locale.
     *
     * @method _setStrings
     * @protected
     * @param {Object} strings The hash of string key/values to set
     * @param {Object} locale The locale for the string values being set
     */
    _setStrings : function(strings, locale) {
        _yuitest_coverfunc("build/widget-locale/widget-locale.js", "_setStrings", 46);
_yuitest_coverline("build/widget-locale/widget-locale.js", 47);
var strs = this._strs;
        _yuitest_coverline("build/widget-locale/widget-locale.js", 48);
locale = locale.toLowerCase();

        _yuitest_coverline("build/widget-locale/widget-locale.js", 50);
if (!strs[locale]) {
            _yuitest_coverline("build/widget-locale/widget-locale.js", 51);
strs[locale] = {};
        }

        _yuitest_coverline("build/widget-locale/widget-locale.js", 54);
Y.aggregate(strs[locale], strings, TRUE);
        _yuitest_coverline("build/widget-locale/widget-locale.js", 55);
return strs[locale];
    },

    /**
     * Returns the strings key/value hash for a paricular locale, without locale lookup applied.
     *
     * @method _getStrings
     * @protected
     * @param {Object} locale
     */
    _getStrings : function(locale) {
        _yuitest_coverfunc("build/widget-locale/widget-locale.js", "_getStrings", 65);
_yuitest_coverline("build/widget-locale/widget-locale.js", 66);
return this._strs[locale.toLowerCase()];
    },

    /**
     * Gets the entire strings hash for a particular locale, performing locale lookup.
     * <p>
     * If no values of the key are defined for a particular locale the value for the
     * default locale (in initial locale set for the class) is returned.
     * </p>
     * @method getStrings
     * @param {String} locale (optional) The locale for which the string value is required. Defaults to the current locale, if not provided.
     */
    // TODO: Optimize/Cache. Clear cache on _setStrings call.
    getStrings : function(locale) {

        _yuitest_coverfunc("build/widget-locale/widget-locale.js", "getStrings", 79);
_yuitest_coverline("build/widget-locale/widget-locale.js", 81);
locale = (locale || this.get(LOCALE)).toLowerCase();


        _yuitest_coverline("build/widget-locale/widget-locale.js", 84);
var defLocale = this.getDefaultLocale().toLowerCase(),
            defStrs = this._getStrings(defLocale),
            strs = (defStrs) ? Y.merge(defStrs) : {},
            localeSegments = locale.split(HYPHEN),
            localeStrs,
            i, l,
            lookup;

        // If locale is different than the default, or needs lookup support
        _yuitest_coverline("build/widget-locale/widget-locale.js", 93);
if (locale !== defLocale || localeSegments.length > 1) {
            _yuitest_coverline("build/widget-locale/widget-locale.js", 94);
lookup = EMPTY_STR;
            _yuitest_coverline("build/widget-locale/widget-locale.js", 95);
for (i = 0, l = localeSegments.length; i < l; ++i) {
                _yuitest_coverline("build/widget-locale/widget-locale.js", 96);
lookup += localeSegments[i];


                _yuitest_coverline("build/widget-locale/widget-locale.js", 99);
localeStrs = this._getStrings(lookup);
                _yuitest_coverline("build/widget-locale/widget-locale.js", 100);
if (localeStrs) {
                    _yuitest_coverline("build/widget-locale/widget-locale.js", 101);
Y.aggregate(strs, localeStrs, TRUE);
                }
                _yuitest_coverline("build/widget-locale/widget-locale.js", 103);
lookup += HYPHEN;
            }
        }

        _yuitest_coverline("build/widget-locale/widget-locale.js", 107);
return strs;
    },

    /**
     * Gets the string for a particular key, for a particular locale, performing locale lookup.
     * <p>
     * If no values if defined for the key, for the given locale, the value for the
     * default locale (in initial locale set for the class) is returned.
     * </p>
     * @method getString
     * @param {String} key The key.
     * @param {String} locale (optional) The locale for which the string value is required. Defaults to the current locale, if not provided.
     */
    getString : function(key, locale) {

        _yuitest_coverfunc("build/widget-locale/widget-locale.js", "getString", 120);
_yuitest_coverline("build/widget-locale/widget-locale.js", 122);
locale = (locale || this.get(LOCALE)).toLowerCase();


        _yuitest_coverline("build/widget-locale/widget-locale.js", 125);
var defLocale = (this.getDefaultLocale()).toLowerCase(),
            strs = this._getStrings(defLocale) || {},
            str = strs[key],
            idx = locale.lastIndexOf(HYPHEN);

        // If locale is different than the default, or needs lookup support
        _yuitest_coverline("build/widget-locale/widget-locale.js", 131);
if (locale !== defLocale || idx != -1) {
            _yuitest_coverline("build/widget-locale/widget-locale.js", 132);
do {

                _yuitest_coverline("build/widget-locale/widget-locale.js", 134);
strs = this._getStrings(locale);
                _yuitest_coverline("build/widget-locale/widget-locale.js", 135);
if (strs && key in strs) {
                    _yuitest_coverline("build/widget-locale/widget-locale.js", 136);
str = strs[key];
                    _yuitest_coverline("build/widget-locale/widget-locale.js", 137);
break;
                }
                _yuitest_coverline("build/widget-locale/widget-locale.js", 139);
idx = locale.lastIndexOf(HYPHEN);
                // Chop of last locale segment
                _yuitest_coverline("build/widget-locale/widget-locale.js", 141);
if (idx != -1) {
                    _yuitest_coverline("build/widget-locale/widget-locale.js", 142);
locale = locale.substring(0, idx);
                }

            }while (idx != -1);
        }

        _yuitest_coverline("build/widget-locale/widget-locale.js", 148);
return str;
    },

    /**
     * Returns the default locale for the widget (the locale value defined by the
     * widget class, or provided by the user during construction).
     *
     * @method getDefaultLocale
     * @return {String} The default locale for the widget
     */
    getDefaultLocale : function() {
        _yuitest_coverfunc("build/widget-locale/widget-locale.js", "getDefaultLocale", 158);
_yuitest_coverline("build/widget-locale/widget-locale.js", 159);
return this._state.get(LOCALE, INIT_VALUE);
    },

    _strSetter : function(val) {
        _yuitest_coverfunc("build/widget-locale/widget-locale.js", "_strSetter", 162);
_yuitest_coverline("build/widget-locale/widget-locale.js", 163);
return this._setStrings(val, this.get(LOCALE));
    },

    _strGetter : function(val) {
        _yuitest_coverfunc("build/widget-locale/widget-locale.js", "_strGetter", 166);
_yuitest_coverline("build/widget-locale/widget-locale.js", 167);
return this._getStrings(this.get(LOCALE));
    }
}, true);


}, 'patched-v3.18.1', {"requires": ["widget-base"]});
