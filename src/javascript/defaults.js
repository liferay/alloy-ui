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

	window.Alloy = {
		defaults: {

			classNamePrefix: 'aui',

			//base: '',

			filter: 'raw',

			skin: { },

			modules: {
				'rating': {
					fullpath: '/alloy/trunk/src/javascript/rating.js',
					requires: [ 'widget' ]
				}
			}
		}
	}

})();