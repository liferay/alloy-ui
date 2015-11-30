YUI.add('aui-form-textarea-deprecated', function (A, NAME) {

var Lang = A.Lang,

    getClassName = A.getClassName,

    DOC = A.config.doc,

    NAME = 'textarea',

    NODE = 'node',

    TPL_INPUT = '<textarea autocomplete="off" class="{cssClass}" name="{name}"></textarea>';

var Textarea = A.Component.create({
    NAME: NAME,

    ATTRS: {
        autoSize: {
            value: true
        },

        height: {
            value: 'auto'
        },

        maxHeight: {
            value: 1000
        },

        minHeight: {
            value: 45
        },

        width: {
            value: 'auto'
        }
    },

    HTML_PARSER: {
        node: 'textarea'
    },

    EXTENDS: A.Textfield,

    prototype: {
        FIELD_TEMPLATE: TPL_INPUT,
        renderUI: function() {
            var instance = this;

            Textarea.superclass.renderUI.call(instance);

            var autoSize = instance.get('autoSize');

            if (autoSize !== false) {
                var config = null;

                if (Lang.isObject(autoSize)) {
                    config = autoSize;
                }

                instance.get(NODE).plug(A.Plugin.Autosize, config);
            }
        },

        bindUI: function() {
            var instance = this;

            Textarea.superclass.bindUI.call(instance);

            instance.after('heightChange', instance._afterHeightChange);
            instance.after('widthChange', instance._afterWidthChange);

            instance.after(['maxHeightChange', 'minHeightChange'], instance._afterMinMaxChange);
        },

        syncUI: function() {
            var instance = this;

            Textarea.superclass.syncUI.call(instance);

            instance._uiSetDim('height', instance.get('height'));
            instance._uiSetDim('width', instance.get('width'));

            var maxHeight = instance.get('maxHeight');
            var minHeight = instance.get('minHeight');

            var autosize = instance.get(NODE).autosize;

            if (autosize) {
                if (Lang.isValue(maxHeight)) {
                    autosize.set('maxHeight', maxHeight);
                }

                if (Lang.isValue(minHeight)) {
                    autosize.set('minHeight', minHeight);
                }
            }
        },

        _afterHeightChange: function(event) {
            var instance = this;

            instance._uiSetDim('height', event.newVal, event.prevVal);
        },

        _afterMinMaxChange: function(event) {
            var instance = this;

            var autosize = instance.get(NODE).autosize;

            if (autosize) {
                autosize.set(event.attrName, event.newVal);
            }
        },

        _afterWidthChange: function(event) {
            var instance = this;

            instance._uiSetDim('width', event.newVal, event.prevVal);
        },

        _uiSetDim: function(key, newVal) {
            var instance = this;

            instance.get('node').setStyle(key, newVal);
        }
    }
});

A.Textarea = Textarea;


}, '3.0.1', {"requires": ["node-pluginhost", "aui-autosize-deprecated", "aui-form-textfield-deprecated"]});
