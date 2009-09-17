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
					requires: [ 'aui-base', 'context-overlay', 'calendar-css' ]
				},
				'calendar-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'calendar.css',
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
			}
		}
	}
})();