/**
 * The Form Builder Field Base Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-base
 */

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
A.FormBuilderFieldBase = A.Base.create('form-builder-field-base', A.FormBuilderLayoutCol, [], {
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
     * Saves the edited settings.
     *
     * @method saveSettings
     */
    saveSettings: function() {
        var i,
            settings = this._getSettings();

        for (i = 0; i < settings.length; i++) {
            this.set(settings[i].attrName, settings[i].editor.getEditedValue());
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
    }
});
