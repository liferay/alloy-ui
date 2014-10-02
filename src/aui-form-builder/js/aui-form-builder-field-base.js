/**
 * The Form Builder Field Base Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-base
 */

var CSS_FORM_BUILDER_FIELD_SETTINGS_SAVE =
    A.getClassName('form', 'builder', 'field', 'settings', 'save');

/**
 * A base class for Form Builder Field Base. All form builder fields should
 * extend from this.
 *
 * @class A.FormBuilderFieldBase
 * @extends A.FormBuilderLayoutCol
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderFieldBase = A.Base.create('form-builder-field-base', A.Base, [], {
    /**
     * Holds the name of this field.
     *
     * @property FIELD_NAME
     * @type {String}
     */
    FIELD_NAME: 'Base',

    /**
     * Destructor lifecycle implementation for the `A.FormBuilderFieldBase`
     * class. Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        if (this._modal) {
            this._modal.destroy();
        }
    },

    /**
     * Hides this field's settings.
     *
     * @method hideSettings
     */
    hideSettings: function() {
        if (this._modal) {
            this._modal.hide();
        }
    },

    /**
     * Shows this field's settings and lets the user edit them.
     *
     * @method showSettings
     */
    showSettings: function() {
        if (!this._modal) {
            this._renderSettingsModal();
        }

        this._updateSettingsPanel();
        this._modal.show();
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
     * Renders the settings modal.
     *
     * @method _renderSettingsModal
     * @protected
     */
    _renderSettingsModal: function() {
        this._modal = new A.Modal({
            centered: true,
            draggable: false,
            headerContent: this.FIELD_NAME,
            modal: true,
            resizable: false,
            zIndex: 1
        }).render();

        this._modal.addToolbar([{
            cssClass: CSS_FORM_BUILDER_FIELD_SETTINGS_SAVE,
            label: 'Save',
            on: {
                click: A.bind(this._saveSettings, this)
            },
            render: true
        }], A.WidgetStdMod.FOOTER);

        this._renderSettingsPanel(this._modal.getStdModNode(A.WidgetStdMod.BODY));
    },

    /**
     * Renders the settings panel.
     *
     * @method _renderSettingsPanel
     * @param {Node} container The container where the panel should be rendered.
     * @protected
     */
    _renderSettingsPanel: function(container) {
        var i,
            settings = this._getSettings();

        for (i = 0; i < settings.length; i++) {
            container.append(settings[i].editor.get('node'));
        }
    },

    /**
     * Saves the edited settings.
     *
     * @method _saveSettings
     * @protected
     */
    _saveSettings: function() {
        var i,
            settings = this._getSettings();

        for (i = 0; i < settings.length; i++) {
            this.set(settings[i].attrName, settings[i].editor.getEditedValue());
        }

        this.hideSettings();
    },

    /**
     * Updates the rendered settings panel with information (like the current
     * value of each setting).
     *
     * @method _updateSettingsPanel
     * @protected
     */
    _updateSettingsPanel: function() {
        var i,
            setting,
            settings = this._getSettings();

        for (i = 0; i < settings.length; i++) {
            setting = settings[i];
            setting.editor.set('originalValue', this.get(setting.attrName));
        }
    }
});
