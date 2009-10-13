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
					requires: [ 'aui-base', 'overlay', 'datasource', 'dataschema', 'tool-item', 'autocomplete-css' ]
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
					requires: [ 'aui-base', 'editable-css', 'tool-item' ]
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
					requires: [ 'aui-base', 'state-interaction' ]
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
					requires: [ 'context-overlay', 'overlay-manager', 'anim', 'context-panel-css' ]
				},
				'context-panel-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'context-panel.css',
					type: 'css'
				},

				/*
				* ContextPanel
				*/
				'color-picker': {
					fullpath: PATH_JAVASCRIPT + 'color-picker.js',
					requires: [ 'context-overlay', 'dd', 'slider', 'substitute', 'tool-item', 'color-picker-css' ]
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
				* Nested list
				*/
				'nested-list': {
					fullpath: PATH_JAVASCRIPT + 'nested-list.js',
					requires: [ 'sortable' ]
				},

				/*
				* ContextOverlay
				*/
				'context-overlay': {
					fullpath: PATH_JAVASCRIPT + 'context-overlay.js',
					requires: [ 'aui-base', 'overlay', 'delayed-task' ]
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