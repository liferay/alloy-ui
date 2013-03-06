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
						'aui-ace-autocomplete': {submodules: {'aui-ace-autocomplete-freemarker': {requires:['aui-ace-autocomplete-base','aui-search-ternary-search-tree']}, 'aui-ace-autocomplete-plugin': {requires:['plugin','aui-ace-autocomplete-list']}, 'aui-ace-autocomplete-list': {skinnable:true, requires:['aui-overlay-base','widget-autohide','aui-ace-autocomplete-base']}, 'aui-ace-autocomplete-base': {requires:['aui-ace-editor']} }, use:['aui-ace-autocomplete-base','aui-ace-autocomplete-list','aui-ace-autocomplete-plugin']},
						'aui-ace-editor': {skinnable:false, requires:['aui-base']},
						'aui-aria': {skinnable:false, requires:['aui-base','plugin']},
						'aui-arraysort': {skinnable:false, requires:['arraysort']},
						'aui-audio': {skinnable:true, requires:['aui-base','querystring-stringify-simple']},
						'aui-autocomplete': {skinnable:true, requires:['aui-base','aui-overlay-base','datasource','dataschema','aui-form-combobox']},
						'aui-autosize': {skinnable:true, requires:['aui-base','event-valuechange','plugin']},
						'aui-base': {submodules: {'aui-base-lang': {skinnable:false}, 'aui-base-core': {requires:['aui-classnamemanager','aui-node','aui-component','aui-debounce','aui-delayed-task','aui-selector','aui-event-base','oop','yui-throttle'], skinnable:false} }, use:['aui-base-core','aui-base-lang'], skinnable:false},
						'aui-button-item': {skinnable:true, requires:['aui-base','aui-state-interaction','widget-child']},
						'aui-calendar': {skinnable:true, requires:['aui-base','aui-datatype','widget-stdmod','datatype-date','widget-locale']},
						'aui-carousel': {skinnable:true, requires:['aui-base','aui-template','anim']},
						'aui-char-counter': {skinnable:false, requires:['aui-base','aui-event-input']},
						'aui-chart': {skinnable:false, requires:['datasource','aui-swf','json']},
						'aui-classnamemanager': {skinnable:false, requires:['classnamemanager']},
						'aui-color-picker': {submodules: {'aui-color-picker-grid-plugin': {skinnable:true, requires:['aui-color-picker-base','plugin']}, 'aui-color-picker-base': {skinnable:true, requires:['aui-overlay-context','dd-drag','slider','aui-button-item','aui-color-util','aui-form-base','aui-panel']} }, skinnable:true, use:['aui-color-picker-base','aui-color-picker-grid-plugin']},
						'aui-color-util': {skinnable:false},
						'aui-component': {skinnable:false, requires:['aui-classnamemanager','base-build','widget']},
						'aui-data-browser': {skinnable:true, requires:['aui-base','aui-datasource-control-base','aui-input-text-control','aui-tree','aui-panel']},
						'aui-data-set': {skinnable:false, requires:['oop','collection','base']},
						'aui-datasource-control': {submodules: {'aui-input-text-control': {requires:['aui-base','aui-datasource-control-base','aui-form-combobox']}, 'aui-datasource-control-base': {requires:['aui-base','datasource','dataschema']} }, skinnable:true, use:['aui-datasource-control-base','aui-input-text-control']},
						'aui-datatable': {submodules: {'aui-datatable-highlight': {skinnable:true, requires:['aui-datatable-selection']}, 'aui-datatable-selection': {skinnable:true, requires:['datatable-base']}, 'aui-datatable-edit': {skinnable:true, requires:['datatable-base','calendar','aui-datatype','aui-toolbar','aui-form-validator','overlay','sortable']} }, skinnable:true, use:['aui-datatable-edit','aui-datatable-selection','aui-datatable-highlight']},
						'aui-datatype': {skinnable:false, requires:['aui-base','datatype']},
						'aui-datepicker-deprecated': {submodules: {'aui-datepicker-select-deprecated': {skinnable:true, requires:['aui-datepicker-base-deprecated','aui-button-item']}, 'aui-datepicker-base-deprecated': {skinnable:true, requires:['aui-calendar','aui-overlay-context']} }, skinnable:true, use:['aui-datepicker-base-deprecated','aui-datepicker-select-deprecated']},
						'aui-datepicker': {submodules: {'aui-datepicker-select': {skinnable:true, requires:['aui-datepicker-base','aui-button-item']}, 'aui-datepicker-base': {skinnable:true, requires:['aui-datatype','calendar','aui-overlay-context']} }, skinnable:true, use:['aui-datepicker-base','aui-datepicker-select']},
						'aui-debounce': {skinnable:false},
						'aui-delayed-task': {skinnable:false},
						'aui-diagram-builder': {submodules: {'aui-diagram-builder-connector': {skinnable:true, requires:['aui-base','aui-template','arraylist-add','arraylist-filter','json','graphics','dd']}, 'aui-diagram-builder-impl': {skinnable:true, requires:['aui-data-set','aui-diagram-builder-base','aui-diagram-builder-connector','overlay']}, 'aui-diagram-builder-base': {skinnable:true, requires:['aui-tabs','aui-property-list','collection','dd']} }, skinnable:true, use:['aui-diagram-builder-base','aui-diagram-builder-impl']},
						'aui-dialog-iframe': {skinnable:true, requires:['aui-base','aui-loading-mask','aui-resize-iframe','plugin']},
						'aui-dialog': {skinnable:true, requires:['aui-panel','dd-constrain','aui-button-item','aui-overlay-manager','aui-overlay-mask','aui-io-plugin','aui-resize']},
						'aui-drawing-safari': {condition: {name: 'aui-drawing-safari', trigger: 'aui-drawing-base',test: function(A){var UA = A.UA; return UA.safari && (UA.version.major < 4 || (UA.iphone || UA.ipad));}}, requires:['aui-drawing-base']},
						'aui-drawing-svg': {condition: {name: 'aui-drawing-svg', trigger: 'aui-drawing-base',test: function(A){return A.UA.svg;}}, requires:['aui-drawing-base']},
						'aui-drawing-vml': {condition: {name: 'aui-drawing-vml', trigger: 'aui-drawing-base',test: function(A){return A.UA.vml;}}, requires:['aui-drawing-base']},
						'aui-drawing': {submodules: {'aui-drawing-fonts': {requires:['aui-drawing-base']}, 'aui-drawing-drag': {requires:['aui-drawing-base','event-gestures']}, 'aui-drawing-animate': {requires:['aui-drawing-base']}, 'aui-drawing-base': {requires:['aui-base','aui-color-util','substitute']} }, skinnable:false, use:['aui-drawing-base', 'aui-drawing-animate', 'aui-drawing-drag', 'aui-drawing-fonts']},
						'aui-editable': {skinnable:true, requires:['aui-base','aui-form-combobox']},
						'aui-editor': {submodules: {'aui-editor-creole-plugin': {requires:['aui-base','editor-base','aui-editor-html-creole','aui-editor-creole-parser']}, 'aui-editor-html-creole': {requires:['aui-editor-base']}, 'aui-editor-creole-parser': {requires:['aui-base']}, 'aui-editor-bbcode-plugin': {requires:['aui-base','editor-base']}, 'aui-editor-toolbar-plugin': {skinnable:true, requires:['aui-base','aui-button-item','aui-color-picker','aui-editor-menu-plugin','aui-editor-tools-plugin','aui-form-select','aui-overlay-context-panel','aui-panel','aui-toolbar','createlink-base','editor-lists','editor-base','plugin']}, 'aui-editor-menu-plugin': {requires:['aui-base','editor-base','aui-overlay-context','aui-panel','aui-editor-tools-plugin']}, 'aui-editor-tools-plugin': {requires:['aui-base','editor-base']}, 'aui-editor-base': {requires:['aui-base','editor-base','aui-editor-toolbar-plugin']} }, skinnable:true, use:['aui-editor-base','aui-editor-tools-plugin','aui-editor-menu-plugin','aui-editor-toolbar-plugin','aui-editor-bbcode-plugin','aui-editor-creole-parser','aui-editor-creole-plugin']},
						'aui-event': {submodules: {'aui-event-delegate-submit': {condition: {name: 'aui-event-delegate-submit', trigger: 'event-base-ie', ua: 'ie'}, requires:['aui-node-base','aui-event-base']}, 'aui-event-delegate-change': {condition: {name: 'aui-event-delegate-change', trigger: 'event-base-ie', ua: 'ie'}, requires:['aui-node-base','aui-event-base']}, 'aui-event-input': {requires:['aui-base']}, 'aui-event-base': {requires:['event']} }, skinnable:false, use:['aui-event-base','aui-event-input']},
						'aui-form-builder': {submodules: {'aui-form-builder-field': {skinnable:true, requires:['aui-datatype','aui-panel','aui-tooltip']}, 'aui-form-builder-base': {skinnable:true, requires:['aui-base','aui-button-item','aui-data-set','aui-diagram-builder-base','aui-nested-list','aui-tabs']} }, skinnable:true, use:['aui-form-builder-base','aui-form-builder-field']},
						'aui-form-validator': {skinnable:false, requires:['aui-base','aui-event-input','selector-css3','escape']},
						'aui-form': {submodules: {'aui-form-textfield': {requires:['aui-form-field']}, 'aui-form-textarea': {skinnable:true, requires:['aui-autosize','aui-form-textfield']}, 'aui-form-select': {requires:['aui-form-field']}, 'aui-form-field': {requires:['aui-base','aui-component']}, 'aui-form-combobox': {skinnable:true, requires:['aui-form-textarea','aui-toolbar']}, 'aui-form-base': {requires:['aui-base','aui-data-set','aui-form-field','querystring-parse','io-form']} }, skinnable:false, use:['aui-form-base','aui-form-combobox','aui-form-field','aui-form-select','aui-form-textarea','aui-form-textfield']},
						'aui-image-cropper': {skinnable:true, requires:['widget','aui-base','resize','dd-constrain']},
						'aui-image-viewer': {submodules: {'aui-media-viewer-plugin': {skinnable:false, requires:['aui-image-viewer-base']}, 'aui-image-viewer-gallery': {skinnable:true, requires:['aui-image-viewer-base','aui-paginator','aui-toolbar']}, 'aui-image-viewer-base': {skinnable:true, requires:['anim','aui-overlay-mask']} }, skinnable:true, use:['aui-image-viewer-base','aui-image-viewer-gallery','aui-media-viewer-plugin']},
						'aui-io': {submodules: {'aui-io-plugin': {requires:['aui-overlay-base','aui-parse-content','aui-io-request','aui-loading-mask']}, 'aui-io-request': {requires:['aui-base','io-base','json','plugin','querystring-stringify']} }, skinnable:false, use:['aui-io-request','aui-io-plugin']},
						'aui-live-search': {skinnable:false, requires:['aui-base']},
						'aui-loading-mask': {skinnable:true, requires:['aui-overlay-mask','plugin']},
						'aui-messaging': {skinnable:false, requires:['aui-base','aui-task-manager','querystring']},
						'aui-nested-list': {skinnable:false, requires:['aui-base','dd-drag','dd-drop','dd-proxy']},
						'aui-node': {submodules: {'aui-node-html5-print': {requires:['aui-node-html5']}, 'aui-node-html5': {requires:['collection','aui-base']}, 'aui-node-base': {requires:['array-extras','aui-base-lang','aui-classnamemanager','node']} }, skinnable:false, use:['aui-node-base','aui-node-html5','aui-node-html5-print']},
						'aui-overlay': {submodules: {'aui-overlay-mask': {skinnable:true, requires:['aui-base','aui-overlay-base','event-resize']}, 'aui-overlay-manager': {requires:['aui-base','aui-overlay-base','overlay','plugin']}, 'aui-overlay-context-panel': {skinnable:true, requires:['aui-overlay-context','anim']}, 'aui-overlay-context': {requires:['aui-overlay-manager','aui-delayed-task','aui-aria']}, 'aui-overlay-base': {requires:['aui-component','widget-position','widget-stack','widget-position-align','widget-position-constrain','widget-stdmod']} }, skinnable:true, use:['aui-overlay-base','aui-overlay-context','aui-overlay-context-panel','aui-overlay-manager','aui-overlay-mask']},
						'aui-paginator': {skinnable:true, requires:['aui-base']},
						'aui-panel': {skinnable:true, requires:['aui-component','widget-stdmod','aui-toolbar','aui-aria']},
						'aui-parse-content': {skinnable:false, requires:['async-queue','aui-base','plugin']},
						'aui-portal-layout': {skinnable:true, requires:['aui-base','dd-drag','dd-delegate','dd-drop','dd-proxy']},
						'aui-progressbar': {skinnable:true, requires:['aui-base','aui-aria']},
						'aui-property-list': {skinnable:true, requires:['aui-datatable','datatable-scroll','datatable-sort']},
						'aui-rating': {skinnable:true, requires:['aui-base']},
						'aui-resize-iframe': {skinnable:true, requires:['aui-base','aui-task-manager','plugin']},
						'aui-resize': {submodules: {'aui-resize-constrain': {skinnable:false, requires:['aui-resize-base','dd-constrain','plugin']}, 'aui-resize-base': {skinnable:true, requires:['aui-base','dd-drag','dd-delegate','dd-drop']} }, skinnable:true, use:['aui-resize-base','aui-resize-constrain']},
						'aui-scheduler': {submodules: {'aui-scheduler-event-recorder': {skinnable:true, requires:['aui-scheduler-base','aui-template','aui-toolbar','io-form','querystring','overlay']}, 'aui-scheduler-view-agenda': {skinnable:true, requires:['aui-scheduler-base']}, 'aui-scheduler-view-month': {skinnable:true, requires:['aui-scheduler-view-table']}, 'aui-scheduler-view-table-dd': {skinnable:false, requires:['aui-scheduler-view-table','dd-drag','dd-delegate','dd-drop']}, 'aui-scheduler-view-table': {skinnable:true, requires:['aui-scheduler-base','overlay']}, 'aui-scheduler-view-week': {skinnable:true, requires:['aui-scheduler-view-day']}, 'aui-scheduler-view-day': {skinnable:true, requires:['aui-scheduler-view-table','dd-drag','dd-delegate','dd-drop','dd-constrain']}, 'aui-scheduler-base': {skinnable:true, requires:['aui-base','aui-color-util','aui-datatype','button-group','model','model-list','widget-stdmod']} }, skinnable:false, use:['aui-scheduler-base','aui-scheduler-view-day','aui-scheduler-view-week','aui-scheduler-view-table','aui-scheduler-view-table-dd','aui-scheduler-view-month','aui-scheduler-view-agenda','aui-scheduler-event-recorder']},
						'aui-scroller': {skinnable:true, requires:['aui-base','aui-simple-anim']},
						'aui-search-ternary-search-tree': {skinnable:false, requires:['aui-base']},
						'aui-selector': {skinnable:false, requires:['selector-css3']},
						'aui-simple-anim': {skinnable:false, requires:['aui-base']},
						'aui-skin-base': {type: 'css', path: 'aui-skin-base/css/aui-skin-base.css'},
						'aui-skin-classic-all': {type: 'css', path: 'aui-skin-classic/css/aui-skin-classic-all.css'},
						'aui-skin-classic': {type: 'css', requires:['aui-skin-base'], path: 'aui-skin-classic/css/aui-skin-classic.css'},
						'aui-sortable': {skinnable:true, requires:['aui-base','dd-constrain','dd-drag','dd-drop','dd-proxy']},
						'aui-state-interaction': {skinnable:false, requires:['aui-base','plugin']},
						'aui-swf': {skinnable:false, requires:['aui-base','querystring-parse-simple','querystring-stringify-simple']},
						'aui-tabs': {submodules: {'aui-tabs-menu-plugin': {requires:['aui-component','aui-state-interaction','aui-tabs-base','aui-overlay-context','plugin']}, 'aui-tabs-base': {skinnable:true, requires:['aui-component','aui-state-interaction']} }, skinnable:true, use:['aui-tabs-base','aui-tabs-menu-plugin']},
						'aui-task-manager': {skinnable:false, requires:['aui-base']},
						'aui-template': {skinnable:false, requires:['aui-base']},
						'aui-text': {submodules: {'aui-text-unicode': {skinnable:false, requires:['aui-text-data-unicode']}, 'aui-text-data-unicode': {skinnable:false, requires:['text']} }, skinnable:false, use:['aui-text-data-unicode', 'aui-text-unicode']},
						'aui-textboxlist': {skinnable:true, requires:['anim-node-plugin','aui-autocomplete','node-focusmanager']},
						'aui-toggler': {submodules: {'aui-toggler-delegate': {skinnable:false, requires:['aui-toggler-base']}, 'aui-toggler-base': {skinnable:true, requires:['aui-base','transition']} }, skinnable:true, use:['aui-toggler-base','aui-toggler-delegate']},
						'aui-toolbar': {skinnable:true, requires:['aui-base','aui-button-item','aui-data-set','widget-parent']},
						'aui-tooltip': {skinnable:true, requires:['aui-overlay-context-panel']},
						'aui-tpl-snippets': {submodules: {'aui-tpl-snippets-checkbox': {skinnable:false, requires:['aui-tpl-snippets-base']}, 'aui-tpl-snippets-textarea': {skinnable:false, requires:['aui-tpl-snippets-base']}, 'aui-tpl-snippets-input': {skinnable:false, requires:['aui-tpl-snippets-base']}, 'aui-tpl-snippets-select': {skinnable:false, requires:['aui-tpl-snippets-base']}, 'aui-tpl-snippets-base': {skinnable:false, requires:['aui-template']} }, skinnable:false, use:['aui-tpl-snippets-base','aui-tpl-snippets-select','aui-tpl-snippets-input','aui-tpl-snippets-textarea','aui-tpl-snippets-checkbox']},
						'aui-tree': {submodules: {'aui-tree-io': {skinnable:false, requires:['aui-io','json']}, 'aui-tree-view': {skinnable:true, requires:['aui-tree-node','aui-tree-paginator','aui-tree-io','dd-delegate','dd-proxy']}, 'aui-tree-paginator': {skinnable:false, requires:['aui-base']}, 'aui-tree-node': {skinnable:false, requires:['aui-tree-data','aui-tree-io','aui-tree-paginator','json','querystring-stringify']}, 'aui-tree-data': {skinnable:false, requires:['aui-base','aui-task-manager']} }, skinnable:true, use:['aui-tree-data', 'aui-tree-node', 'aui-tree-io', 'aui-tree-paginator', 'aui-tree-view']},
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
