YUI.add('aui-selector', function (A, NAME) {

/**
 * The Selector Utility.
 *
 * @module aui-selector
 */

var SELECTOR = A.Selector,

    CSS_BOOTSTRAP_SR_ONLY = A.getClassName('sr-only'),
    CSS_HIDE = A.getClassName('hide'),
    REGEX_CLIP_RECT_ZERO = new RegExp(/rect\((0(px)?(,)?(\s)?){4}\)/i),
    REGEX_HIDDEN_CLASSNAMES = new RegExp(CSS_HIDE),
    REGEX_SR_ONLY_CLASSNAMES = new RegExp(CSS_BOOTSTRAP_SR_ONLY);

SELECTOR._isNodeHidden = function(node) {
    var width = node.offsetWidth;
    var height = node.offsetHeight;
    var ignore = node.nodeName.toLowerCase() === 'tr';
    var className = node.className;
    var nodeStyle = node.style;

    var hidden = false;

    if (!ignore) {
        if (width === 0 && height === 0) {
            hidden = true;
        }
        else if (width > 0 && height > 0) {
            hidden = false;
        }
    }

    hidden = hidden || (nodeStyle.display === 'none' || nodeStyle.visibility === 'hidden') ||
        (nodeStyle.position === 'absolute' && REGEX_CLIP_RECT_ZERO.test(nodeStyle.clip)) ||
        REGEX_HIDDEN_CLASSNAMES.test(className) || REGEX_SR_ONLY_CLASSNAMES.test(className);

    return hidden;
};

var testNodeType = function(type) {
    return function(node) {
        return node.type === type;
    };
};

/**
 * Augment the [YUI3 Selector](Selector.html) with more util methods.
 *
 * @class A.Selector
 * @uses Selector
 * @constructor
 */
A.mix(
    SELECTOR.pseudos, {
        /**
         * Checks if the node is a button element or contains `type="button"`.
         *
         * @method button
         * @param node
         * @return {Boolean}
         */
        button: function(node) {
            return node.type === 'button' || node.nodeName.toLowerCase() === 'button';
        },

        /**
         * Checks if the node contains `type="checkbox"`.
         *
         * @method checkbox
         * @return {Boolean}
         */
        checkbox: testNodeType('checkbox'),

        /**
         * Checks if the node is checked or not.
         *
         * @method checked
         * @param node
         * @return {Boolean}
         */
        checked: function(node) {
            return node.checked === true;
        },

        /**
         * Checks if the node is disabled or not.
         *
         * @method disabled
         * @param node
         * @return {Boolean}
         */
        disabled: function(node) {
            return node.disabled === true;
        },

        /**
         * Checks if the node is empty or not.
         *
         * @method empty
         * @param node
         * @return {Boolean}
         */
        empty: function(node) {
            return !node.firstChild;
        },

        /**
         * Checks if the node is enabled or not.
         *
         * @method enabled
         * @param node
         * @return {Boolean}
         */
        enabled: function(node) {
            return node.disabled === false && node.type !== 'hidden';
        },

        /**
         * Checks if the node contains `type="file"`.
         *
         * @method file
         * @return {Boolean}
         */
        file: testNodeType('file'),

        /**
         * Checks if the node is a header (e.g. `<h1>`, `<h2>`, ...) or not.
         *
         * @method header
         * @param node
         * @return {Boolean}
         */
        header: function(node) {
            return /h\d/i.test(node.nodeName);
        },

        /**
         * Checks if the node is hidden or not.
         *
         * @method hidden
         * @param node
         * @return {Boolean}
         */
        hidden: function(node) {
            return SELECTOR._isNodeHidden(node);
        },

        /**
         * Checks if the node contains `type="image"`.
         *
         * @method image
         * @return {Boolean}
         */
        image: testNodeType('image'),

        /**
         * Checks if the node is an input (e.g. `<textarea>`, `<input>`, ...) or not.
         *
         * @method input
         * @param node
         * @return {Boolean}
         */
        input: function(node) {
            return /input|select|textarea|button/i.test(node.nodeName);
        },

        /**
         * Checks if the node contains a child or not.
         *
         * @method parent
         * @param node
         * @return {Boolean}
         */
        parent: function(node) {
            return !!node.firstChild;
        },

        /**
         * Checks if the node contains `type="password"`.
         *
         * @method password
         * @return {Boolean}
         */
        password: testNodeType('password'),

        /**
         * Checks if the node contains `type="radio"`.
         *
         * @method radio
         * @return {Boolean}
         */
        radio: testNodeType('radio'),

        /**
         * Checks if the node contains `type="reset"`.
         *
         * @method reset
         * @return {Boolean}
         */
        reset: testNodeType('reset'),

        /**
         * Checks if the node is selected or not.
         *
         * @method selected
         * @param node
         * @return {Boolean}
         */
        selected: function(node) {
            node.parentNode.selectedIndex;
            return node.selected === true;
        },

        /**
         * Checks if the node contains `type="submit"`.
         *
         * @method submit
         * @return {Boolean}
         */
        submit: testNodeType('submit'),

        /**
         * Checks if the node contains `type="text"`.
         *
         * @method text
         * @return {Boolean}
         */
        text: testNodeType('text'),

        /**
         * Checks if the node is visible or not.
         *
         * @method visible
         * @param node
         * @return {Boolean}
         */
        visible: function(node) {
            return !SELECTOR._isNodeHidden(node);
        }
    }
);


}, '3.0.1', {"requires": ["selector-css3", "aui-classnamemanager"]});
