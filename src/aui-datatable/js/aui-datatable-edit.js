/**
 * The Datatable Component
 *
 * @module aui-datatable
 * @submodule aui-datatable-edit
 */

var Lang = A.Lang,
    AArray = A.Array,
    isArray = Lang.isArray,
    isBoolean = Lang.isBoolean,
    isFunction = Lang.isFunction,
    isObject = Lang.isObject,
    isString = Lang.isString,
    isValue = Lang.isValue,
    LString = Lang.String,
    DataType = A.DataType,

    WidgetStdMod = A.WidgetStdMod,

    REGEX_BR = /<br\s*\/?>/gi,
    REGEX_NL = /[\r\n]/g,

    CSS_FORM_CONTROL = A.getClassName('form', 'control'),
    CSS_CELLEDITOR_EDIT = A.getClassName('celleditor', 'edit'),
    CSS_CELLEDITOR_EDIT_ADD_OPTION = A.getClassName('celleditor', 'edit', 'add', 'option'),
    CSS_CELLEDITOR_EDIT_DD_HANDLE = A.getClassName('celleditor', 'edit', 'dd', 'handle'),
    CSS_CELLEDITOR_EDIT_DELETE_OPTION = A.getClassName('celleditor', 'edit', 'delete', 'option'),
    CSS_CELLEDITOR_EDIT_HIDE_OPTION = A.getClassName('celleditor', 'edit', 'hide', 'option'),
    CSS_CELLEDITOR_EDIT_INPUT_NAME = A.getClassName('celleditor', 'edit', 'input', 'name'),
    CSS_CELLEDITOR_EDIT_INPUT_VALUE = A.getClassName('celleditor', 'edit', 'input', 'value'),
    CSS_CELLEDITOR_EDIT_LABEL = A.getClassName('celleditor', 'edit', 'label'),
    CSS_CELLEDITOR_EDIT_LINK = A.getClassName('celleditor', 'edit', 'link'),
    CSS_CELLEDITOR_EDIT_OPTION_ROW = A.getClassName('celleditor', 'edit', 'option', 'row'),
    CSS_CELLEDITOR_ELEMENT = A.getClassName('celleditor', 'element'),
    CSS_CELLEDITOR_OPTION = A.getClassName('celleditor', 'option'),
    CSS_ICON = A.getClassName('glyphicon'),
    CSS_ICON_GRIP_DOTTED_VERTICAL = A.getClassName('glyphicon', 'resize', 'vertical'),

    TPL_BR = '<br/>';
