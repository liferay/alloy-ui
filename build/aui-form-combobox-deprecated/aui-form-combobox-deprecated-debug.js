YUI.add('aui-form-combobox-deprecated', function (A, NAME) {

var Lang = A.Lang,

    getClassName = A.getClassName,

    ARROW = 'arrow',
    CIRCLE = 'circle',
    DOWN = 'down',
    ICON = 'icon',
    NAME = 'combobox',

    CSS_COMBOBOX = getClassName(NAME),
    CSS_ICON_CIRCLE_ARROW_DOWN = getClassName(ICON, CIRCLE, ARROW, DOWN);

var Combobox = A.Component.create({
    NAME: NAME,

    ATTRS: {
        field: {},

        fieldWidget: {
            value: A.Textfield
        },

        node: {
            getter: function() {
                var instance = this;

                if (instance._field) {
                    return instance._field.get('node');
                }
            }
        },

        icons: {
            value: [CSS_ICON_CIRCLE_ARROW_DOWN],
            validator: Lang.isArray
        }
    },

    prototype: {
        renderUI: function() {
            var instance = this;

            Combobox.superclass.renderUI.call(instance);

            instance._renderField();
            instance._renderIcons();
        },

        _renderField: function() {
            var instance = this;

            var contentBox = instance.get('contentBox');

            var field = instance.get('field');
            var fieldWidget = instance.get('fieldWidget');

            instance._field = new fieldWidget(field).render();

            contentBox.appendChild(instance._field.get('boundingBox'));
        },

        _renderIcons: function() {
            var instance = this;

            var icons = instance.get('icons');

            if (icons.length) {
                var toolbar = new A.Toolbar({
                    children: [icons]
                }).render(instance.get('contentBox'));

                instance.icons = toolbar;
            }
        }
    }
});

A.Combobox = Combobox;


}, '3.0.1', {"requires": ["aui-form-textarea-deprecated", "aui-toolbar"], "skinnable": true});
