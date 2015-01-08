/**
 * The Form Builder Field Base Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-base
 */

var CSS_FIELD = A.getClassName('form', 'builder', 'field'),
    CSS_FIELD_CONFIGURATION = A.getClassName('form', 'builder', 'field', 'configuration'),
    CSS_FIELD_CONTENT = A.getClassName('form', 'builder', 'field', 'content'),
    CSS_FIELD_CONTENT_FOOTER = A.getClassName('form', 'builder', 'field', 'content', 'footer'),
    CSS_FIELD_CONTENT_TOOLBAR = A.getClassName('form', 'builder', 'field', 'content', 'toolbar'),
    CSS_FIELD_FOOTER_CONTENT = A.getClassName('form', 'builder', 'field', 'footer', 'content'),
    CSS_FIELD_MOVE_BUTTON = A.getClassName('form', 'builder', 'field', 'move', 'button'),
    CSS_FIELD_MOVE_TARGET = A.getClassName('form', 'builder', 'field', 'move', 'target'),
    CSS_FIELD_NESTED = A.getClassName('form', 'builder', 'field', 'nested'),
    CSS_FIELD_OVERLAY = A.getClassName('form', 'builder', 'field', 'overlay'),
    CSS_FIELD_SETTINGS_PANEL = A.getClassName('form', 'builder', 'field', 'settings', 'panel'),
    CSS_FIELD_SETTINGS_PANEL_ADVANCED = A.getClassName('form', 'builder', 'field', 'settings', 'panel', 'advanced'),
    CSS_FIELD_SETTINGS_PANEL_ADVANCED_CONTENT =
        A.getClassName('form', 'builder', 'field', 'settings', 'panel', 'advanced', 'content'),
    CSS_FIELD_SETTINGS_PANEL_LEFT = A.getClassName('form', 'builder', 'field', 'settings', 'panel', 'left'),
    CSS_FIELD_SETTINGS_PANEL_RIGHT = A.getClassName('form', 'builder', 'field', 'settings', 'panel', 'right'),
    CSS_FIELD_SETTINGS_PANEL_RIGHT_CONTENT = A.getClassName('form', 'builder', 'field', 'settings', 'panel', 'right', 'content'),
    CSS_FIELD_SETTINGS_PANEL_SEPARATOR = A.getClassName('form', 'builder', 'field', 'settings', 'panel', 'separator'),
    CSS_FIELD_SETTINGS_PANEL_TOGGLER_ADVANCED =
        A.getClassName('form', 'builder', 'field', 'settings', 'panel', 'toggler', 'advanced'),
    CSS_FIELD_TOOLBAR = A.getClassName('form', 'builder', 'field', 'toolbar'),
    CSS_FIELD_TOOLBAR_ADD_NESTED = A.getClassName('form', 'builder', 'field', 'toolbar', 'add', 'nested'),
    CSS_FIELD_TOOLBAR_CLOSE = A.getClassName('form', 'builder', 'field', 'toolbar', 'close'),
    CSS_FIELD_TOOLBAR_EDIT = A.getClassName('form', 'builder', 'field', 'toolbar', 'edit'),
    CSS_FIELD_TOOLBAR_REMOVE = A.getClassName('form', 'builder', 'field', 'toolbar', 'remove'),
    CSS_HIDE = A.getClassName('hide');

/**
 * An augmentation class which adds some editing funcionality to form builder
 * fields.
 *
 * @class A.FormBuilderFieldBase
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderFieldBase = function() {};

A.FormBuilderFieldBase.prototype = {
    SETTINGS_DIVIDER_POSITION: 3,

    TPL_FIELD: '<div class="' + CSS_FIELD + ' form-field">' +
        '<div class="' + CSS_FIELD_CONTENT_TOOLBAR + '">' +
        '<div class="' + CSS_FIELD_CONTENT + ' form-field-content"></div>' +
        '<div class="' + CSS_FIELD_MOVE_BUTTON + ' layout-builder-move-cut-button"></div>' +
        '<div class="btn-group ' + CSS_FIELD_TOOLBAR + ' hide">' +
        '<button class="btn btn-default ' + CSS_FIELD_TOOLBAR_ADD_NESTED + '"><span class="glyphicon glyphicon-plus"></span></button>' +
        '<button class="btn btn-default ' + CSS_FIELD_TOOLBAR_EDIT + '"><span class="glyphicon glyphicon-wrench"></span></button>' +
        '<button class="btn btn-default ' + CSS_FIELD_TOOLBAR_REMOVE + '"><span class="glyphicon glyphicon-trash"></span></button>' +
        '<button class="btn btn-default ' + CSS_FIELD_TOOLBAR_CLOSE + '"><span class="glyphicon glyphicon-remove"></span></button>' +
        '</div></div>' +
        '<div class="' + CSS_FIELD_NESTED + ' form-field-nested"></div>' +
        '<div class="' + CSS_FIELD_OVERLAY + '"></div>' +
        '<div class="' + CSS_FIELD_CONTENT_FOOTER + '"></div>' +
        '</div>',
    TPL_FIELD_CONFIGURATION: '<button class="btn btn-default ' + CSS_FIELD_CONFIGURATION + ' hide">' +
        '<span class="glyphicon glyphicon-cog"></span>' +
        '</button>',
    TPL_FIELD_MOVE_TARGET: '<button class="' + CSS_FIELD_MOVE_TARGET +
        ' layout-builder-move-target layout-builder-move-col-target btn btn-default">' +
        'Paste as subquestion</button>',
    TPL_FIELD_SETTINGS_PANEL: '<div class="' + CSS_FIELD_SETTINGS_PANEL + ' clearfix">' +
        '<div class="' + CSS_FIELD_SETTINGS_PANEL_SEPARATOR + '"></div>' +
        '<div class="' + CSS_FIELD_SETTINGS_PANEL_LEFT + ' col-md-6"></div>' +
        '<div class="' + CSS_FIELD_SETTINGS_PANEL_RIGHT + ' col-md-6">' +
        '<div class="' + CSS_FIELD_SETTINGS_PANEL_RIGHT_CONTENT + '">' +
        '</div>' +
        '<div class="' + CSS_FIELD_SETTINGS_PANEL_ADVANCED + '">' +
        '<a class="' + CSS_FIELD_SETTINGS_PANEL_TOGGLER_ADVANCED +
        '" href="javascript:void(0)">Advanced options</a>' +
        '<div class="' + CSS_FIELD_SETTINGS_PANEL_ADVANCED_CONTENT + '"></div>' +
        '</div>' +
        '</div>' +
        '</div>',
    TPL_FIELD_FOOTER_CONTENT: '<div class="' + CSS_FIELD_FOOTER_CONTENT + '"></div>',

    /**
     * Constructor for the `A.FormBuilderFieldBase` component. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var advancedSettings,
            content = this.get('content'),
            i;

        if (!A.UA.mobile) {
            this._configurationButton = A.Node.create(this.TPL_FIELD_CONFIGURATION);
            content.one('.' + CSS_FIELD_CONTENT_TOOLBAR).append(this._configurationButton);
        }

        this._fieldSettingsPanel = A.Node.create(this.TPL_FIELD_SETTINGS_PANEL);

        this._fieldEventHandles = [
            content.on('clickoutside', this._onClickOutsideField, this)
        ];

        advancedSettings = this._getAdvancedSettings();

        for (i = 0; i < advancedSettings.length; i++) {
            if (advancedSettings[i].footerLabel) {
                this.after(advancedSettings[i].attrName + 'Change', this._afterAdvancedSettingsChange);
            }
        }

        this._updateAdvancedSettingsChange();
    },

    /**
     * Checks if the toolbar node is visible.
     *
     * @method isToolbarVisible
     * @return {Boolean}
     */
    isToolbarVisible: function() {
        return !this.get('content').one('.' + CSS_FIELD_TOOLBAR).hasClass(CSS_HIDE);
    },

    /**
     * Renders the advanced settings on panel.
     *
     * @method renderAdvancedSettings
     */
    renderAdvancedSettings: function() {
        var advancedSettings = this._getAdvancedSettings(),
            currentNode,
            i;

        if (advancedSettings.length) {
            currentNode = this._fieldSettingsPanel.one('.' + CSS_FIELD_SETTINGS_PANEL_ADVANCED_CONTENT);

            for (i = 0; i < advancedSettings.length; i++) {
                this.renderSetting(advancedSettings[i], currentNode);
            }
        } else {
            this._fieldSettingsPanel.one('.' + CSS_FIELD_SETTINGS_PANEL_ADVANCED).addClass(CSS_HIDE);
        }
    },

    /**
     * Renders the basic settings on panel.
     *
     * @method renderBasicSettings
     */
    renderBasicSettings: function() {
        var currentNode,
            i,
            settings = this._getSettings();

        currentNode = this._fieldSettingsPanel.one('.' + CSS_FIELD_SETTINGS_PANEL_LEFT);

        for (i = 0; i < settings.length; i++) {
            if (i === this.SETTINGS_DIVIDER_POSITION) {
                currentNode = this._fieldSettingsPanel.one('.' + CSS_FIELD_SETTINGS_PANEL_RIGHT_CONTENT);
            }

            this.renderSetting(settings[i], currentNode);
        }
    },

    /**
     * Renders a single field setting to be edited.
     *
     * @method renderSetting
     * @param {Object} setting
     * @param {Node} targetNode
     * @protected
     */
    renderSetting: function(setting, targetNode) {
        var attrValue = this.get(setting.attrName);

        setting.editor.get('node').removeClass('has-error');
        setting.editor.set('originalValue', attrValue);
        setting.editor.updateUiWithValue(attrValue);
        targetNode.append(setting.editor.get('node'));
    },

    /**
     * Renders the settings panel.
     *
     * @method renderSettingsPanel
     * @param {Node} container The container where the panel should be rendered.
     */
    renderSettingsPanel: function(container) {
        this.renderBasicSettings();

        this.renderAdvancedSettings();

        container.setHTML(this._fieldSettingsPanel);

        if (!this._advancedSettingsToggler) {
            this._createAdvancedSettingsToggler();
        }
    },

    /**
     * Saves the edited settings.
     *
     * @method saveSettings
     */
    saveSettings: function() {
        var advancedSettings = this._getAdvancedSettings(),
            i,
            settings = this._getSettings();

        for (i = 0; i < settings.length; i++) {
            this.set(settings[i].attrName, settings[i].editor.get('editedValue'));
        }

        for (i = 0; i < advancedSettings.length; i++) {
            this.set(advancedSettings[i].attrName, advancedSettings[i].editor.get('editedValue'));
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
     * Validates all data editors used by this field's settings.
     *
     * @method validateSettings
     * @return {Boolean}
     */
    validateSettings: function() {
        var i,
            result = true,
            settings = this._getSettings();

        for (i = 0; i < settings.length; i++) {
            if (!settings[i].editor.isValid()) {
                settings[i].editor.get('node').addClass('has-error');
                result = false;
            }
        }

        return result;
    },

    /**
     * Fired after the a advanced settings change.
     *
     * @method _afterAdvancedSettingsChange
     * @protected
     */
    _afterAdvancedSettingsChange: function() {
        this._updateAdvancedSettingsChange();
    },

    /**
     * Create a Toggler with the advanced settings.
     *
     * @method _createAdvancedSettingsToggler
     * @protected
     */
    _createAdvancedSettingsToggler: function() {
        this._advancedSettingsToggler = new A.Toggler({
            animated: true,
            content: '.' + CSS_FIELD_SETTINGS_PANEL_ADVANCED_CONTENT,
            header: '.' + CSS_FIELD_SETTINGS_PANEL_TOGGLER_ADVANCED,
            expanded: this.get('content').one('.' + CSS_FIELD_CONTENT_FOOTER).hasChildNodes()
        });
    },

    /**
     * Creates a move target node.
     *
     * @method _createMoveTarget
     * @param {Number} position The position where the moved field will be added
     *   if this is the chosen target.
     * @return {Node}
     * @protected
     */
    _createMoveTarget: function(position) {
        var targetNode = A.Node.create(this.TPL_FIELD_MOVE_TARGET);
        targetNode.setData('nested-field-index', position);
        targetNode.setData('nested-field-parent', this);

        return targetNode;
    },

    /**
     * Gets the list of advanced settings for this field.
     *
     * @method _getAdvancedSettings
     * @return {Array}
     * @protected
     */
    _getAdvancedSettings: function() {
        if (!this._advancedSettings) {
            this._advancedSettings = [];

            if (this._fillAdvancedSettings) {
                this._fillAdvancedSettings();
            }
        }

        return this._advancedSettings;
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
            this._settings = [
                {
                    attrName: 'title',
                    editor: new A.TextDataEditor({
                        label: 'Type your question here',
                        required: true
                    })
                },
                {
                    attrName: 'help',
                    editor: new A.TextDataEditor({
                        label: 'Help text...'
                    })
                }
            ];

            if (this._fillSettings) {
                this._fillSettings();
            }
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
        if (this._configurationButton) {
            this._configurationButton.toggleClass(CSS_HIDE, !visible);
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
    },

    /**
     * Updates the UI according to the values of the Advanced Settings.
     *
     * @method _updateAdvancedSettingsChange
     * @protected
     */
    _updateAdvancedSettingsChange: function() {
        var advancedSettings = this._getAdvancedSettings(),
            footerNode,
            i;

        this.get('content').one('.' + CSS_FIELD_CONTENT_FOOTER).empty();

        for (i = 0; i < advancedSettings.length; i++) {
            if (advancedSettings[i].footerLabel && this.get(advancedSettings[i].attrName)) {
                footerNode = A.Node.create(this.TPL_FIELD_FOOTER_CONTENT);
                footerNode.set('text', advancedSettings[i].footerLabel +
                    ': ' + this.get(advancedSettings[i].attrName));
                this.get('content').one('.' + CSS_FIELD_CONTENT_FOOTER).append(footerNode);
            }
        }
    },

    /**
     * Updates the UI according to the value of the `nestedFields` attribute.
     *
     * @method _uiSetNestedFields
     * @param  {Array} nestedFields
     * @protected
     */
    _uiSetNestedFields: function(nestedFields) {
        var instance = this,
            nestedFieldsNode = this.get('content').one('.' + CSS_FIELD_NESTED);

        nestedFieldsNode.empty();
        nestedFieldsNode.append(this._createMoveTarget(0));
        A.Array.each(nestedFields, function(nestedField, index) {
            nestedFieldsNode.append(nestedField.get('content'));
            nestedFieldsNode.append(instance._createMoveTarget(index + 1));
        });
    }
};
