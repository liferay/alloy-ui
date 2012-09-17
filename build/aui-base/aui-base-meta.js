;(function() {
	var AUI_config = {
		filter: 'raw',

		io: {
			method: 'GET'
		},

        combine: false,

		groups: {
            alloy: {
				combine: false,
                modules: {
						'aui-ace-editor': {skinnable:false, requires:['aui-base']},
						'aui-aria': {requires:['aui-base','plugin'], skinnable:false},
						'aui-arraysort': {requires:['arraysort'], skinnable:false},
						'aui-audio': {requires:['aui-base','querystring-stringify-simple'], skinnable:true},
						'aui-autocomplete': {requires:['aui-base','aui-overlay-base','datasource','dataschema','aui-form-combobox'], skinnable:true},
						'aui-base': {submodules: {'aui-base-lang': {skinnable:false}, 'aui-base-core': {skinnable:false, requires:['aui-classnamemanager','aui-node','aui-component','aui-debounce','aui-delayed-task','aui-selector','aui-event-base','oop','yui-throttle']} }, skinnable:false, use:['aui-base-core','aui-base-lang']},
						'aui-button-item': {skinnable:true, requires:['aui-base','aui-state-interaction','widget-child']},
						'aui-calendar': {skinnable:true, requires:['aui-base','aui-datatype','widget-stdmod','datatype-date','widget-locale']},
						'aui-carousel': {skinnable:true, requires:['aui-base','aui-template','anim']},
						'aui-char-counter': {skinnable:false, requires:['aui-base','aui-event-input']},
						'aui-chart': {skinnable:false, requires:['datasource','aui-swf','json']},
						'aui-classnamemanager': {skinnable:false, requires:['classnamemanager']},
						'aui-color-picker': {submodules: {'aui-color-picker-grid-plugin': {requires:['aui-color-picker-base','plugin'], skinnable:true}, 'aui-color-picker-base': {requires:['aui-overlay-context','dd-drag','slider','aui-button-item','aui-color-util','aui-form-base','aui-panel'], skinnable:true} }, use:['aui-color-picker-base','aui-color-picker-grid-plugin'], skinnable:true},
						'aui-color-util': {skinnable:false},
						'aui-component': {skinnable:false, requires:['aui-classnamemanager','base-build','widget']},
						'aui-data-browser': {skinnable:true, requires:['aui-base','aui-datasource-control-base','aui-input-text-control','aui-tree','aui-panel']},
						'aui-data-set': {skinnable:false, requires:['oop','collection','base']},
						'aui-datasource-control': {submodules: {'aui-input-text-control': {requires:['aui-base','aui-datasource-control-base','aui-form-combobox']}, 'aui-datasource-control-base': {requires:['aui-base','datasource','dataschema']} }, use:['aui-datasource-control-base','aui-input-text-control'], skinnable:true},
						'aui-datatable': {submodules: {'aui-datatable-highlight': {requires:['aui-datatable-selection'], skinnable:true}, 'aui-datatable-selection': {requires:['datatable-base'], skinnable:true}, 'aui-datatable-edit': {requires:['datatable-base','calendar','aui-datatype','aui-toolbar','aui-form-validator','overlay','sortable'], skinnable:true} }, use:['aui-datatable-edit','aui-datatable-selection','aui-datatable-highlight'], skinnable:true},
						'aui-datatype': {skinnable:false, requires:['aui-base','datatype']},
						'aui-datepicker-deprecated': {submodules: {'aui-datepicker-select-deprecated': {requires:['aui-datepicker-base-deprecated','aui-button-item'], skinnable:true}, 'aui-datepicker-base-deprecated': {requires:['aui-calendar','aui-overlay-context'], skinnable:true} }, use:['aui-datepicker-base-deprecated','aui-datepicker-select-deprecated'], skinnable:true},
						'aui-datepicker': {submodules: {'aui-datepicker-select': {requires:['aui-datepicker-base','aui-button-item'], skinnable:true}, 'aui-datepicker-base': {requires:['aui-datatype','calendar','aui-overlay-context'], skinnable:true} }, use:['aui-datepicker-base','aui-datepicker-select'], skinnable:true},
						'aui-debounce': {skinnable:false},
						'aui-delayed-task': {skinnable:false},
						'aui-diagram-builder': {submodules: {'aui-diagram-builder-connector': {requires:['aui-base','aui-template','arraylist-add','arraylist-filter','json','graphics','dd'], skinnable:true}, 'aui-diagram-builder-impl': {requires:['aui-data-set','aui-diagram-builder-base','aui-diagram-builder-connector','overlay'], skinnable:true}, 'aui-diagram-builder-base': {requires:['aui-tabs','aui-property-list','collection','dd'], skinnable:true} }, use:['aui-diagram-builder-base','aui-diagram-builder-impl'], skinnable:true},
						'aui-dialog-iframe': {skinnable:true, requires:['aui-base','aui-loading-mask','aui-resize-iframe','plugin']},
						'aui-dialog': {skinnable:true, requires:['aui-panel','dd-constrain','aui-button-item','aui-overlay-manager','aui-overlay-mask','aui-io-plugin','aui-resize']},
						'aui-drawing-safari': {requires:['aui-drawing-base'], condition: {name: 'aui-drawing-safari', trigger: 'aui-drawing-base',test: function(A){var UA = A.UA; return UA.safari && (UA.version.major < 4 || (UA.iphone || UA.ipad));}}},
						'aui-drawing-svg': {requires:['aui-drawing-base'], condition: {name: 'aui-drawing-svg', trigger: 'aui-drawing-base',test: function(A){return A.UA.svg;}}},
						'aui-drawing-vml': {requires:['aui-drawing-base'], condition: {name: 'aui-drawing-vml', trigger: 'aui-drawing-base',test: function(A){return A.UA.vml;}}},
						'aui-drawing': {submodules: {'aui-drawing-fonts': {requires:['aui-drawing-base']}, 'aui-drawing-drag': {requires:['aui-drawing-base','event-gestures']}, 'aui-drawing-animate': {requires:['aui-drawing-base']}, 'aui-drawing-base': {requires:['aui-base','aui-color-util','substitute']} }, use:['aui-drawing-base', 'aui-drawing-animate', 'aui-drawing-drag', 'aui-drawing-fonts'], skinnable:false},
						'aui-editable': {skinnable:true, requires:['aui-base','aui-form-combobox']},
						'aui-editor': {submodules: {'aui-editor-creole-plugin': {requires:['aui-base','editor-base','aui-editor-html-creole','aui-editor-creole-parser']}, 'aui-editor-html-creole': {requires:['aui-editor-base']}, 'aui-editor-creole-parser': {requires:['aui-base']}, 'aui-editor-bbcode-plugin': {requires:['aui-base','editor-base']}, 'aui-editor-toolbar-plugin': {requires:['aui-base','aui-button-item','aui-color-picker','aui-editor-menu-plugin','aui-editor-tools-plugin','aui-form-select','aui-overlay-context-panel','aui-panel','aui-toolbar','createlink-base','editor-lists','editor-base','plugin'], skinnable:true}, 'aui-editor-menu-plugin': {requires:['aui-base','editor-base','aui-overlay-context','aui-panel','aui-editor-tools-plugin']}, 'aui-editor-tools-plugin': {requires:['aui-base','editor-base']}, 'aui-editor-base': {requires:['aui-base','editor-base','aui-editor-toolbar-plugin']} }, use:['aui-editor-base','aui-editor-tools-plugin','aui-editor-menu-plugin','aui-editor-toolbar-plugin','aui-editor-bbcode-plugin','aui-editor-creole-parser','aui-editor-creole-plugin'], skinnable:true},
						'aui-event': {submodules: {'aui-event-delegate-submit': {requires:['aui-node-base','aui-event-base'], condition: {name: 'aui-event-delegate-submit', trigger: 'event-base-ie', ua: 'ie'}}, 'aui-event-delegate-change': {requires:['aui-node-base','aui-event-base'], condition: {name: 'aui-event-delegate-change', trigger: 'event-base-ie', ua: 'ie'}}, 'aui-event-input': {requires:['aui-base']}, 'aui-event-base': {requires:['event']} }, use:['aui-event-base','aui-event-input'], skinnable:false},
						'aui-form-builder': {submodules: {'aui-form-builder-field': {requires:['aui-datatype','aui-panel','aui-tooltip'], skinnable:true}, 'aui-form-builder-base': {requires:['aui-base','aui-button-item','aui-data-set','aui-diagram-builder-base','aui-nested-list','aui-tabs'], skinnable:true} }, use:['aui-form-builder-base','aui-form-builder-field'], skinnable:true},
						'aui-form-validator': {skinnable:false, requires:['aui-base','aui-event-input','selector-css3']},
						'aui-form': {submodules: {'aui-form-textfield': {requires:['aui-form-field']}, 'aui-form-textarea': {requires:['aui-form-textfield'], skinnable:true}, 'aui-form-select': {requires:['aui-form-field']}, 'aui-form-field': {requires:['aui-base','aui-component']}, 'aui-form-combobox': {requires:['aui-form-textarea','aui-toolbar'], skinnable:true}, 'aui-form-base': {requires:['aui-base','aui-data-set','aui-form-field','querystring-parse','io-form']} }, use:['aui-form-base','aui-form-combobox','aui-form-field','aui-form-select','aui-form-textarea','aui-form-textfield'], skinnable:false},
						'aui-image-cropper': {skinnable:true, requires:['widget','aui-base','resize','dd-constrain']},
						'aui-image-viewer': {submodules: {'aui-media-viewer-plugin': {requires:['aui-image-viewer-base'], skinnable:false}, 'aui-image-viewer-gallery': {requires:['aui-image-viewer-base','aui-paginator','aui-toolbar'], skinnable:true}, 'aui-image-viewer-base': {requires:['anim','aui-overlay-mask'], skinnable:true} }, use:['aui-image-viewer-base','aui-image-viewer-gallery','aui-media-viewer-plugin'], skinnable:true},
						'aui-io': {submodules: {'aui-io-plugin': {requires:['aui-overlay-base','aui-parse-content','aui-io-request','aui-loading-mask']}, 'aui-io-request': {requires:['aui-base','io-base','json','plugin','querystring-stringify']} }, use:['aui-io-request','aui-io-plugin'], skinnable:false},
						'aui-live-search': {skinnable:false, requires:['aui-base']},
						'aui-loading-mask': {skinnable:true, requires:['aui-overlay-mask','plugin']},
						'aui-messaging': {skinnable:false, requires:['aui-base','aui-task-manager','querystring']},
						'aui-nested-list': {skinnable:false, requires:['aui-base','dd-drag','dd-drop','dd-proxy']},
						'aui-node': {submodules: {'aui-node-html5-print': {requires:['aui-node-html5']}, 'aui-node-html5': {requires:['collection','aui-base']}, 'aui-node-base': {requires:['array-extras','aui-base-lang','aui-classnamemanager','node']} }, use:['aui-node-base','aui-node-html5','aui-node-html5-print'], skinnable:false},
						'aui-overlay': {submodules: {'aui-overlay-mask': {requires:['aui-base','aui-overlay-base','event-resize'], skinnable:true}, 'aui-overlay-manager': {requires:['aui-base','aui-overlay-base','overlay','plugin']}, 'aui-overlay-context-panel': {requires:['aui-overlay-context','anim'], skinnable:true}, 'aui-overlay-context': {requires:['aui-overlay-manager','aui-delayed-task','aui-aria']}, 'aui-overlay-base': {requires:['aui-component','widget-position','widget-stack','widget-position-align','widget-position-constrain','widget-stdmod']} }, use:['aui-overlay-base','aui-overlay-context','aui-overlay-context-panel','aui-overlay-manager','aui-overlay-mask'], skinnable:true},
						'aui-paginator': {skinnable:true, requires:['aui-base']},
						'aui-panel': {skinnable:true, requires:['aui-component','widget-stdmod','aui-toolbar','aui-aria']},
						'aui-parse-content': {skinnable:false, requires:['async-queue','aui-base','plugin']},
						'aui-portal-layout': {skinnable:true, requires:['aui-base','dd-drag','dd-delegate','dd-drop','dd-proxy']},
						'aui-progressbar': {skinnable:true, requires:['aui-base','aui-aria']},
						'aui-property-list': {skinnable:true, requires:['aui-datatable','datatable-scroll','datatable-sort']},
						'aui-rating': {skinnable:true, requires:['aui-base']},
						'aui-resize-iframe': {skinnable:true, requires:['aui-base','aui-task-manager','plugin']},
						'aui-resize': {submodules: {'aui-resize-constrain': {requires:['aui-resize-base','dd-constrain','plugin'], skinnable:false}, 'aui-resize-base': {requires:['aui-base','dd-drag','dd-delegate','dd-drop'], skinnable:true} }, use:['aui-resize-base','aui-resize-constrain'], skinnable:true},
						'aui-scheduler': {submodules: {'aui-scheduler-calendar': {requires:['aui-scheduler-event'], skinnable:false}, 'aui-scheduler-event': {requires:['aui-base','aui-color-util','aui-datatype','aui-template','aui-toolbar','io-form','querystring','overlay'], skinnable:true}, 'aui-scheduler-view': {requires:['aui-scheduler-event','aui-datatype','aui-button-item','dd-drag','dd-delegate','dd-drop','dd-constrain'], skinnable:true}, 'aui-scheduler-base': {requires:['aui-scheduler-view','datasource','button-group'], skinnable:true} }, use:['aui-scheduler-base','aui-scheduler-view','aui-scheduler-event','aui-scheduler-calendar'], skinnable:true},
						'aui-scroller': {skinnable:true, requires:['aui-base','aui-simple-anim']},
						'aui-selector': {skinnable:false, requires:['selector-css3']},
						'aui-simple-anim': {skinnable:false, requires:['aui-base']},
						'aui-skin-base': {path: 'aui-skin-base/css/aui-skin-base.css', type: 'css'},
						'aui-skin-classic-all': {path: 'aui-skin-classic/css/aui-skin-classic-all.css', type: 'css'},
						'aui-skin-classic': {requires:['aui-skin-base'], path: 'aui-skin-classic/css/aui-skin-classic.css', type: 'css'},
						'aui-sortable': {skinnable:true, requires:['aui-base','dd-constrain','dd-drag','dd-drop','dd-proxy']},
						'aui-state-interaction': {skinnable:false, requires:['aui-base','plugin']},
						'aui-swf': {skinnable:false, requires:['aui-base','querystring-parse-simple','querystring-stringify-simple']},
						'aui-tabs': {submodules: {'aui-tabs-menu-plugin': {requires:['aui-component','aui-state-interaction','aui-tabs-base','aui-overlay-context','plugin']}, 'aui-tabs-base': {requires:['aui-component','aui-state-interaction'], skinnable:true} }, use:['aui-tabs-base','aui-tabs-menu-plugin'], skinnable:true},
						'aui-task-manager': {skinnable:false, requires:['aui-base']},
						'aui-template': {skinnable:false, requires:['aui-base']},
						'aui-text': {submodules: {'aui-text-unicode': {requires:['aui-text-data-unicode'], skinnable:false}, 'aui-text-data-unicode': {requires:['text'], skinnable:false} }, use:['aui-text-data-unicode', 'aui-text-unicode'], skinnable:false},
						'aui-textboxlist': {skinnable:true, requires:['anim-node-plugin','aui-autocomplete','node-focusmanager']},
						'aui-toggler': {submodules: {'aui-toggler-delegate': {requires:['aui-toggler-base'], skinnable:false}, 'aui-toggler-base': {requires:['aui-base','transition'], skinnable:true} }, use:['aui-toggler-base','aui-toggler-delegate'], skinnable:true},
						'aui-toolbar': {skinnable:true, requires:['aui-base','aui-button-item','aui-data-set','widget-parent']},
						'aui-tooltip': {skinnable:true, requires:['aui-overlay-context-panel']},
						'aui-tpl-snippets': {submodules: {'aui-tpl-snippets-checkbox': {requires:['aui-tpl-snippets-base'], skinnable:false}, 'aui-tpl-snippets-textarea': {requires:['aui-tpl-snippets-base'], skinnable:false}, 'aui-tpl-snippets-input': {requires:['aui-tpl-snippets-base'], skinnable:false}, 'aui-tpl-snippets-select': {requires:['aui-tpl-snippets-base'], skinnable:false}, 'aui-tpl-snippets-base': {requires:['aui-template'], skinnable:false} }, use:['aui-tpl-snippets-base','aui-tpl-snippets-select','aui-tpl-snippets-input','aui-tpl-snippets-textarea','aui-tpl-snippets-checkbox'], skinnable:false},
						'aui-tree': {submodules: {'aui-tree-view': {requires:['aui-tree-node','dd-delegate','dd-proxy'], skinnable:true}, 'aui-tree-node': {requires:['aui-tree-data','aui-io','json','querystring-stringify'], skinnable:false}, 'aui-tree-data': {requires:['aui-base','aui-task-manager'], skinnable:false} }, use:['aui-tree-data', 'aui-tree-node', 'aui-tree-view'], skinnable:true},
						'aui-video': {skinnable:true, requires:['aui-base','querystring-stringify-simple']},
						'aui-viewport': {skinnable:false, requires:['aui-base']}
				}
		    }
		}
	};

	if (typeof YUI != 'undefined') {
		YUI.AUI_config = AUI_config;
	}
	
	if (typeof exports == 'object') {
        exports.AUI_config = AUI_config;
    }
})();
