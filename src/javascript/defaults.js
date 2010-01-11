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
					requires: [ 'event', 'oop', 'component', 'aui-node', 'collection', 'widget-css' ]
				},
				'widget-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'widget.css',
					type: 'css'
				},

				/*
				* Data Set
				*/
				'data-set': {
					fullpath: PATH_JAVASCRIPT + 'data-set.js',
					requires: [ 'oop', 'collection', 'base' ]
				},

				/*
				* AutoComplete
				*/
				'autocomplete': {
					fullpath: PATH_JAVASCRIPT + 'autocomplete.js',
					requires: [ 'aui-base', 'component-overlay', 'datasource', 'dataschema', 'combobox', 'autocomplete-css' ]
				},
				'autocomplete-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'autocomplete.css',
					type: 'css'
				},

				/*
				* Parse Content
				*/
				'parse-content': {
					fullpath: PATH_JAVASCRIPT + 'parse-content.js',
					requires: [ 'async-queue', 'io', 'plugin' ]
				},

				/*
				* Editable
				*/
				'editable': {
					fullpath: PATH_JAVASCRIPT + 'editable.js',
					requires: [ 'aui-base', 'combobox', 'textarea', 'editable-css' ]
				},
				'editable-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'editable.css',
					type: 'css'
				},

				/*
				* Paginator
				*/
				'paginator': {
					fullpath: PATH_JAVASCRIPT + 'paginator.js',
					requires: [ 'aui-base', 'substitute', 'paginator-css' ]
				},
				'paginator-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'paginator.css',
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
					requires: [ 'data-set', 'tool-item', 'tool-set-css' ]
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
					requires: [ 'aui-base', 'context-overlay', 'overlay-manager', 'datatype-date', 'widget-i18n', 'calendar-css' ]
				},
				'calendar-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'calendar.css',
					type: 'css'
				},

				/*
				* Calendar
				*/
				'char-counter': {
					fullpath: PATH_JAVASCRIPT + 'char-counter.js',
					requires: [ 'aui-base', 'input-handler' ]
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
					requires: [ 'context-overlay', 'dd', 'slider', 'substitute', 'tool-item', 'form', 'panel', 'color-picker-css' ]
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
				* TextboxList
				*/
				'textboxlist': {
					fullpath: PATH_JAVASCRIPT + 'textboxlist.js',
					requires: [ 'anim-node-plugin', 'aui-base', 'autocomplete', 'node-focusmanager', 'textboxlist-css' ]
				},

				'textboxlist-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'textboxlist.css',
					type: 'css'
				},

				/*
				* Dialog
				*/
				'dialog': {
					fullpath: PATH_JAVASCRIPT + 'dialog.js',
					requires: [ 'plugin', 'panel', 'dd-constrain', 'aui-base', 'tool-item', 'overlay-manager', 'overlay-mask', 'io-plugin', 'dialog-css' ]
				},
				'dialog-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'dialog.css',
					type: 'css'
				},

				/*
				* Component Overlay
				*/
				'component-overlay': {
					fullpath: PATH_JAVASCRIPT + 'component-overlay.js',
					requires: [ 'component', 'widget-position', 'widget-stack', 'widget-position-ext', 'widget-stdmod' ]
				},

				/*
				* Tabs
				*/
				'tabs': {
					fullpath: PATH_JAVASCRIPT + 'tabs.js',
					requires: ['component', 'state-interaction', 'tabs-css']
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
					requires: [ 'aui-base', 'dd', 'substitute', 'resize-css' ]
				},
				'resize-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'resize.css',
					type: 'css'
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
					requires: [ 'aui-base', 'component-overlay', 'overlay-manager', 'delayed-task' ]
				},

				/*
				* OverlayManager
				*/
				'overlay-manager': {
					fullpath: PATH_JAVASCRIPT + 'overlay-manager.js',
					requires: [ 'aui-base', 'component', 'component-overlay', 'overlay', 'plugin' ]
				},

				/*
				* OverlayMask
				*/
				'overlay-mask': {
					fullpath: PATH_JAVASCRIPT + 'overlay-mask.js',
					requires: [ 'aui-base', 'component-overlay', 'event-resize' ]
				},

				/*
				* Module
				*/
				'panel': {
					fullpath: PATH_JAVASCRIPT + 'panel.js',
					requires: [ 'component', 'widget-stdmod', 'tool-set', 'panel-css' ]
				},
				'panel-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'panel.css',
					type: 'css'
				},

				/*
				* Form
				*/
				'form': {
					fullpath: PATH_JAVASCRIPT + 'form.js',
					requires: [ 'aui-base', 'data-set', 'io-form', 'field' ]
				},

				/*
				* Fieldset
				*/
				'fieldset': {
					fullpath: PATH_JAVASCRIPT + 'fieldset.js',
					requires: [ 'panel' ]
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
					requires: [ 'textarea', 'tool-set', 'combobox-css' ]
				},
				'combobox-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'combobox.css',
					type: 'css'
				},

				/*
				* Component
				*/
				'component': {
					fullpath: PATH_JAVASCRIPT + 'component.js',
					requires: [ 'widget' ]
				},

				/*
				* IO Plugin
				*/
				'io-plugin': {
					fullpath: PATH_JAVASCRIPT + 'io-plugin.js',
					requires: [ 'aui-base', 'component-overlay', 'parse-content', 'io-request', 'plugin' ]
				},

				/*
				* Input Event Handler
				*/
				'input-handler': {
					fullpath: PATH_JAVASCRIPT + 'input-handler.js'
				},

				/*
				* IO Ajax configuration
				*/
				'io-request': {
					fullpath: PATH_JAVASCRIPT + 'io-request.js',
					requires: [ 'aui-base', 'io', 'json', 'plugin' ]
				},

				/*
				* Image Viewer
				*/
				'image-viewer': {
					fullpath: PATH_JAVASCRIPT + 'image-viewer.js',
					requires: [ 'aui-base', 'anim', 'overlay-mask', 'substitute', 'image-viewer-css' ]
				},

				'image-viewer-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'image-viewer.css',
					type: 'css'
				},

				/*
				* ImageGallery
				*/
				'image-gallery': {
					fullpath: PATH_JAVASCRIPT + 'image-gallery.js',
					requires: [ 'image-viewer', 'paginator', 'tool-set', 'image-gallery-css' ]
				},

				'image-gallery-css': {
					ext: false,
					fullpath: PATH_THEME_ROOT + 'image-gallery.css',
					type: 'css'
				},

				/*
				* State Interaction plugin
				*/
				'state-interaction': {
					fullpath: PATH_JAVASCRIPT + 'state-interaction.js',
					requires: [ 'aui-base', 'plugin' ]
				},

				/*
				* Chart Widgets
				*/
				'chart': {
					fullpath: PATH_JAVASCRIPT + 'chart.js',
					requires: [ 'datasource', 'swf', 'json' ]
				},

				/*
				* SWF Utility
				*/
				'swf': {
					fullpath: PATH_JAVASCRIPT + 'swf.js',
					requires: [ 'aui-base' ]
				}
			},

			paths: {
				images: PATH_THEME_IMAGES,
				javascript: PATH_JAVASCRIPT,
				theme: PATH_THEME_ROOT
			},

			io: {
				method: 'GET'
			},

			chart: {
				swfURL: 'assets/chart.swf'
			}
		}
	}
})();