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

			//filter: 'raw',

			modules: {
				/*
				* AutoComplete
				*/
				'autocomplete': {
					fullpath: PATH_JAVASCRIPT + 'autocomplete.js',
					requires: [ 'overlay', 'datasource', 'dataschema', 'autocomplete-css' ]
				},
				'autocomplete-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'autocomplete.css',
					type: 'css'
				},
				/*
				* Rating
				*/
				'rating': {
					fullpath: PATH_JAVASCRIPT + 'rating.js',
					requires: [ 'rating-css' ]
				},
				'rating-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'rating.css',
					type: 'css'
				},

				/*
				* Tooltip
				*/
				'tooltip': {
					fullpath: PATH_JAVASCRIPT + 'tooltip.js',
					requires: [ 'tooltip-css' ]
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
					requires: [ 'overlay', 'dialog-css', 'plugin' ],
					use: [ 'dd-constrain', 'overlay-manager', 'io-stdmod' ]
				},
				'dialog-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'dialog.css',
					type: 'css'
				},

				/*
				* OverlayManager
				*/
				'overlay-manager': {
					fullpath: PATH_JAVASCRIPT + 'overlay-manager.js',
					requires: [ 'overlay', 'plugin' ]
				},

				/*
				* StdModIOPlugin
				*/
				'io-stdmod': {
					fullpath: PATH_JAVASCRIPT + 'io-stdmod.js',
					requires: [ 'overlay', 'substitute', 'io', 'json', 'plugin' ]
				}
			}
		}
	}
})();