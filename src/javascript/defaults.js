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

	// temp
	var TRUNK_BASE_PATH = '/alloy/trunk/';

	window.Alloy = {
		defaults: {

			classNamePrefix: 'aui',

			//base: '',

			filter: 'raw',

			skin: { },

			modules: {
				'rating': {
					fullpath: TRUNK_BASE_PATH + 'src/javascript/rating.js',
					requires: [ 'widget', 'rating-css' ]
				},
				'rating-css': {
					fullpath: TRUNK_BASE_PATH + 'themes/base/css/rating.css',
					type: 'css'
				},

			}
		}
	}

})();