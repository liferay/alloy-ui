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
					requires: [ 'aui-base', 'overlay', 'datasource', 'dataschema', 'autocomplete-css' ]
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
					requires: [ 'aui-base', 'editable-css' ]
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
				* Dialog
				*/
				'dialog': {
					fullpath: PATH_JAVASCRIPT + 'dialog.js',
					requires: [ 'plugin', 'overlay', 'dd-constrain', 'aui-base', 'overlay-manager', 'io-stdmod', 'dialog-css' ]
				},
				'dialog-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'dialog.css',
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
					fullpath: PATH_JAVASCRIPT + 'context_overlay.js',
					requires: [ 'aui-base', 'overlay' ]
				},

				/*
				* OverlayManager
				*/
				'overlay-manager': {
					fullpath: PATH_JAVASCRIPT + 'overlay_manager.js',
					requires: [ 'aui-base', 'overlay', 'plugin' ]
				},

				/*
				* OverlayMask
				*/
				'overlay-mask': {
					fullpath: PATH_JAVASCRIPT + 'overlay_mask.js',
					requires: [ 'aui-base', 'overlay', 'plugin' ]
				},

				/*
				* StdModIOPlugin
				*/
				'io-stdmod': {
					fullpath: PATH_JAVASCRIPT + 'io_stdmod.js',
					requires: [ 'aui-base', 'overlay', 'io', 'plugin' ]
				}
			}
		}
	}
})();