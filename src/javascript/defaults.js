/*
 * Alloy JavaScript Library v0.1
 * http://alloyui.com/
 *
 * Copyright (c) 2009 Liferay Inc.
 * Licensed under the MIT license.
 * http://alloyui.com/License
 *
 * Date: @DATE
 * Revision: @REVISION
 */

;(function() {
	var PATH_BASE = YUI.config.base + '../../../';
	var PATH_JAVASCRIPT = PATH_BASE + 'src/javascript/';
	var PATH_THEME_ROOT = PATH_BASE + 'themes/base/css/';
	var PATH_THEME_IMAGES = PATH_THEME_ROOT + '../images/';

	window.AUI = {
		defaults: {
			classNamePrefix: 'aui',

			//base: '',

			defaultModules: [ 'aui-base' ],

			filter: 'raw',

			modules: {

				/*
				* AUI Base modules
				*/
				'aui-base': {
					fullpath: PATH_JAVASCRIPT + 'base.js',
					requires: [ 'event', 'oop', 'widget', 'aui-node' ]
				},

				/*
				* Compound Set
				*/
				'compound-set': {
					fullpath: PATH_JAVASCRIPT + 'compound-set.js',
					requires: [ 'oop', 'collection', 'base' ]
				},

				/*
				* AutoComplete
				*/
				'autocomplete': {
					fullpath: PATH_JAVASCRIPT + 'autocomplete.js',
					requires: [ 'aui-base', 'overlay', 'datasource', 'dataschema', 'autocomplete-css', 'combobox' ]
				},
				'autocomplete-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'autocomplete.css',
					type: 'css'
				},

				/*
				* Editable
				*/
				'editable': {
					fullpath: PATH_JAVASCRIPT + 'editable.js',
					requires: [ 'aui-base', 'editable-css', 'combobox', 'textarea' ]
				},
				'editable-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'editable.css',
					type: 'css'
				},

				/*
				* Rating
				*/
				'rating': {
					fullpath: PATH_JAVASCRIPT + 'rating.js',
					requires: [ 'aui-base', 'rating-css' ]
				},
				'rating-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'rating.css',
					type: 'css'
				},

				/*
				* Tool Item
				*/
				'tool-item': {
					fullpath: PATH_JAVASCRIPT + 'tool-item.js',
					requires: [ 'aui-base', 'state-interaction', 'tool-item-css' ]
				},
				'tool-item-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'tool-item.css',
					type: 'css'
				},

				/*
				* Tool Set
				*/
				'tool-set': {
					fullpath: PATH_JAVASCRIPT + 'tool-set.js',
					requires: [ 'compound-set', 'tool-item', 'tool-set-css' ]
				},
				'tool-set-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'tool-set.css',
					type: 'css'
				},

				/*
				* Calendar
				*/
				'calendar': {
					fullpath: PATH_JAVASCRIPT + 'calendar.js',
					requires: [ 'aui-base', 'context-overlay', 'overlay-manager', 'datatype-date', 'calendar-css' ]
				},
				'calendar-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'calendar.css',
					type: 'css'
				},

				/*
				* DatePickerSelect
				*/
				'date-picker-select': {
					fullpath: PATH_JAVASCRIPT + 'date-picker-select.js',
					requires: [ 'calendar', 'tool-item', 'date-picker-select-css' ]
				},
				'date-picker-select-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'date-picker-select.css',
					type: 'css'
				},

				/*
				* ContextPanel
				*/
				'context-panel': {
					fullpath: PATH_JAVASCRIPT + 'context-panel.js',
					requires: [ 'context-overlay', 'anim', 'context-panel-css' ]
				},
				'context-panel-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'context-panel.css',
					type: 'css'
				},

				/*
				* ColorPicker
				*/
				'color-picker': {
					fullpath: PATH_JAVASCRIPT + 'color-picker.js',
					requires: [ 'context-overlay', 'dd', 'slider', 'substitute', 'tool-item', 'color-picker-css', 'form', 'module' ]
				},
				'color-picker-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'color-picker.css',
					type: 'css'
				},

				/*
				* Tooltip
				*/
				'tooltip': {
					fullpath: PATH_JAVASCRIPT + 'tooltip.js',
					requires: [ 'context-panel', 'tooltip-css' ]
				},
				'tooltip-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'tooltip.css',
					type: 'css'
				},

				/*
				* TreeData
				*/
				'tree-data': {
					fullpath: PATH_JAVASCRIPT + 'tree-data.js',
					requires: [ 'aui-base' ]
				},

				/*
				* TreeNode
				*/
				'tree-node': {
					fullpath: PATH_JAVASCRIPT + 'tree-node.js',
					requires: [ 'tree-data', 'io', 'json', 'tree-css' ]
				},

				/*
				* TreeView
				*/
				'tree-view': {
					fullpath: PATH_JAVASCRIPT + 'tree-view.js',
					requires: [ 'tree-node', 'dd', 'tree-css' ]
				},

				'tree-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'tree.css',
					type: 'css'
				},

				/*
				* Dialog
				*/
				'dialog': {
					fullpath: PATH_JAVASCRIPT + 'dialog.js',
					requires: [ 'plugin', 'overlay', 'dd-constrain', 'aui-base', 'tool-item', 'overlay-manager', 'overlay-mask', 'io-stdmod', 'dialog-css' ]
				},
				'dialog-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'dialog.css',
					type: 'css'
				},

				/*
				* Tabs
				*/
				'tabs': {
					fullpath: PATH_JAVASCRIPT + 'tabs.js',
					requires: ['widget', 'state-interaction', 'tabs-css']
				},
				'tabs-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'tabs.css',
					type: 'css'
				},

				/*
				* Resize
				*/
				'resize': {
					fullpath: PATH_JAVASCRIPT + 'resize.js',
					requires: [ 'aui-base', 'dd', 'resize-css' ]
				},
				'resize-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'resize.css',
					type: 'css'
				},
				'resize-plugin': {
					fullpath: PATH_JAVASCRIPT + 'resize.js',
					requires: [ 'resize' ]
				},

				/*
				* Sortable
				*/
				'sortable': {
					fullpath: PATH_JAVASCRIPT + 'sortable.js',
					requires: [ 'aui-base', 'dd', 'sortable-css' ]
				},
				'sortable-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'sortable.css',
					type: 'css'
				},

				/*
				* LiveSearch
				*/
				'live-search': {
					fullpath: PATH_JAVASCRIPT + 'live-search.js',
					requires: [ 'aui-base' ]
				},

				/*
				* Nested list
				*/
				'nested-list': {
					fullpath: PATH_JAVASCRIPT + 'nested-list.js',
					requires: [ 'aui-base', 'dd' ]
				},

				/*
				* ContextOverlay
				*/
				'context-overlay': {
					fullpath: PATH_JAVASCRIPT + 'context-overlay.js',
					requires: [ 'aui-base', 'overlay', 'overlay-manager', 'delayed-task' ]
				},

				/*
				* OverlayManager
				*/
				'overlay-manager': {
					fullpath: PATH_JAVASCRIPT + 'overlay-manager.js',
					requires: [ 'aui-base', 'overlay', 'plugin' ]
				},

				/*
				* OverlayMask
				*/
				'overlay-mask': {
					fullpath: PATH_JAVASCRIPT + 'overlay-mask.js',
					requires: [ 'aui-base', 'overlay', 'event-resize' ]
				},

				/*
				* Module
				*/
				'module': {
					fullpath: PATH_JAVASCRIPT + 'module.js',
					requires: [ 'module-css', 'widget', 'widget-stdmod', 'tool-set' ]
				},
				'module-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'module.css',
					type: 'css'
				},

				/*
				* Form
				*/
				'form': {
					fullpath: PATH_JAVASCRIPT + 'form.js',
					requires: [ 'aui-base', 'compound-set', 'io-form', 'field' ]
				},

				/*
				* Fieldset
				*/
				'fieldset': {
					fullpath: PATH_JAVASCRIPT + 'fieldset.js',
					requires: [ 'module' ]
				},

				/*
				* Field
				*/
				'field': {
					fullpath: PATH_JAVASCRIPT + 'field.js',
					requires: [ 'substitute' ]
				},

				/*
				* Textfield
				*/
				'textfield': {
					fullpath: PATH_JAVASCRIPT + 'textfield.js',
					requires: [ 'field' ]
				},

				/*
				* Textarea
				*/
				'textarea': {
					fullpath: PATH_JAVASCRIPT + 'textarea.js',
					requires: [ 'textfield', 'textarea-css' ]
				},
				'textarea-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'textarea.css',
					type: 'css'
				},

				/*
				* Combobox
				*/
				'combobox': {
					fullpath: PATH_JAVASCRIPT + 'combobox.js',
					requires: [ 'textarea', 'combobox-css', 'tool-set' ]
				},
				'combobox-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'combobox.css',
					type: 'css'
				},

				/*
				* StdModIOPlugin
				*/
				'io-stdmod': {
					fullpath: PATH_JAVASCRIPT + 'io-stdmod.js',
					requires: [ 'aui-base', 'overlay', 'io', 'plugin' ]
				},

				/*
				* State Interaction plugin
				*/
				'state-interaction': {
					fullpath: PATH_JAVASCRIPT + 'state-interaction.js',
					requires: [ 'aui-base', 'plugin' ]
				}
			},

			paths: {
				images: PATH_THEME_IMAGES,
				javascript: PATH_JAVASCRIPT,
				theme: PATH_THEME_ROOT
			}
		}
	}
})();