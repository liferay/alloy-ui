/**
 * The Form Builder Field Base Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-base
 */

var CSS_FIELD = A.getClassName('form', 'builder', 'field'),
    CSS_FIELD_CONTENT = A.getClassName('form', 'builder', 'field', 'content'),
    CSS_FIELD_TOOLBAR = A.getClassName('form', 'builder', 'toolbar'),
    CSS_FIELD_CONFIGURATION = A.getClassName('form', 'builder', 'configuration'),
    CSS_FIELD_TOOLBAR_EDIT = A.getClassName('form', 'builder', 'edit'),
    CSS_FIELD_TOOLBAR_REMOVE = A.getClassName('form', 'builder', 'remove'),
    CSS_FIELD_TOOLBAR_CLOSE = A.getClassName('form', 'builder', 'close'),
    CSS_HIDE = A.getClassName('hide'),

    TPL_FIELD = '<div class="' + CSS_FIELD + '">' +
        '<div class="' + CSS_FIELD_CONTENT + '"></div>' +
        '<div class="btn-group ' + CSS_FIELD_TOOLBAR + ' hide">' +
        '<button class="btn btn-default ' + CSS_FIELD_TOOLBAR_EDIT + '"><span class="glyphicon glyphicon-wrench"></span></button>' +
        '<button class="btn btn-default ' + CSS_FIELD_TOOLBAR_REMOVE + '"><span class="glyphicon glyphicon-trash"></span></button>' +
        '<button class="btn btn-default ' + CSS_FIELD_TOOLBAR_CLOSE + '"><span class="glyphicon glyphicon-remove"></span></button>' +
        '</div>' +
        '</div>',

    TPL_FIELD_CONFIGURATION = '<button class="btn btn-default ' + CSS_FIELD_CONFIGURATION + ' hide">' +
        '<span class="glyphicon glyphicon-cog"></span>' +
        '</button>';

/**
 * A base class for Form Builder Field Base. All form builder fields should
 * extend from this.
 *
 * @class A.FormBuilderFieldBase
 * @extends A.Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderFieldBase = A.Base.create('form-builder-field-base', A.Base, [], {
    
    /**
     * Constructor for the Field Base component.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var content = this.get('content');

        if (!A.UA.mobile) {
            content.appendChild(TPL_FIELD_CONFIGURATION);
        }

        content.setData('field-instance', this);

        this._fieldEventHandles = [
            content.on('clickoutside', this._onClickOutsideField, this)
        ];
    },

    /**
     * Destructor lifecycle implementation for the `A.FormBuilderFieldBase` class.
     * Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        this.get('content').remove(true);

        (new A.EventHandle(this._fieldEventHandles)).detach();
    },

    /**
     * Renders the settings panel.
     *
     * @method renderSettingsPanel
     * @param {Node} container The container where the panel should be rendered.
     */
    renderSettingsPanel: function(container) {
        var i,
            settings = this._getSettings();

        for (i = 0; i < settings.length; i++) {
            settings[i].editor.set('originalValue', this.get(settings[i].attrName));
            container.append(settings[i].editor.get('node'));
        }
    },

    /**
     * Toggles the configuration button of Form Field Base by adding or
     * removing the active class name.
     *
     * @method toggleConfigurationButton
     * @param {Boolean}
     */
    toggleConfigurationButton: function(visible) {
        this._toggleConfigurationButton(visible);
    },

    /**
     * Toggles the Toolbar of Form Field Base by adding or removing the active
     * class name.
     *
     * @method toggleToolbar
     * @param {Boolean}
     */
    toggleToolbar: function(visible) {
        this._toggleToolbar(visible);
        this._toggleConfigurationButton(!visible);
    },

    /**
     * Saves the edited settings.
     *
     * @method saveSettings
     */
    saveSettings: function() {
        var i,
            settings = this._getSettings();

        for (i = 0; i < settings.length; i++) {
            this.set(settings[i].attrName, settings[i].editor.get('editedValue'));
        }
    },

    /**
     * Fills the settings array with the information for this field.
     * Subclasses should override this.
     *
     * @method _fillSettings
     * @protected
     */
    _fillSettings: function() {
        throw new Error('Subclasses should override _fillSettings');
    },

    /**
     * Gets the list of settings for this field. Safer then calling the property
     * directly, as this will lazy load the settings if they're not ready yet.
     * Each setting should be an object with the following keys: attrName and
     * editor.
     *
     * @method _getSettings
     * @return {Array}
     * @protected
     */
    _getSettings: function() {
        if (!this._settings) {
            this._fillSettings();
        }

        return this._settings;
    },

    /**
     * Fires when there's a click outside of the Form Builder Field.
     *
     * @method _onClickOutsideField
     * @protected
     */
    _onClickOutsideField: function() {
        this._toggleToolbar(false);
    },

    /**
     * Toggles the Configuration Button of Form Field Base by adding or
     * removing the active class name.
     *
     * @method _toggleConfigurationButton
     * @param {Boolean}
     * @protected
     */
    _toggleConfigurationButton: function(visible) {
        var content = this.get('content');

        if (!A.UA.mobile) {
            content.one('.' + CSS_FIELD_CONFIGURATION).toggleClass(CSS_HIDE, !visible);
        }
    },

    /**
     * Toggles the Toolbar of Form Field Base by adding or removing the active class name.
     *
     * @method _toggleToolbar
     * @param {Boolean}
     * @protected
     */
    _toggleToolbar: function(visible) {
        this.get('content').one('.' + CSS_FIELD_TOOLBAR).toggleClass(CSS_HIDE, !visible);
    }
}, {
    /**
     * Static property used to define the default attribute configuration
     * for the `A.FormBuilderFieldBase`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Node containing the contents of this field.
         *
         * @attribute content
         * @type Node
         */
        content: {
            validator: function(val) {
                return A.instanceOf(val, A.Node);
            },
            valueFn: function() {
                return A.Node.create(TPL_FIELD);
            },
            writeOnce: 'initOnly'
        }
    }
});
