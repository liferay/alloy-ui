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
						'aui-ace-autocomplete': {submodules: {'aui-ace-autocomplete-freemarker': {requires:['aui-ace-autocomplete-base','aui-search-ternary-search-tree']}, 'aui-ace-autocomplete-plugin': {requires:['plugin','aui-ace-autocomplete-list']}, 'aui-ace-autocomplete-list': {requires:['aui-overlay-base','widget-autohide','aui-ace-autocomplete-base'], skinnable:true}, 'aui-ace-autocomplete-base': {requires:['aui-ace-editor']} }, use:['aui-ace-autocomplete-base','aui-ace-autocomplete-list','aui-ace-autocomplete-plugin']},
						'aui-ace-editor': {requires:['aui-base'], skinnable:false},
						'aui-aria': {requires:['aui-base','plugin'], skinnable:false},
						'aui-arraysort': {requires:['arraysort'], skinnable:false},
						'aui-audio': {requires:['aui-base','querystring-stringify-simple'], skinnable:true},
						'aui-autocomplete': {requires:['aui-base','aui-overlay-base','datasource','dataschema','aui-form-combobox'], skinnable:true},
						'aui-autosize': {requires:['aui-base','event-valuechange','plugin'], skinnable:true},
						'aui-base': {submodules: {'aui-base-lang': {skinnable:false}, 'aui-base-core': {requires:['aui-classnamemanager','aui-node','aui-component','aui-debounce','aui-delayed-task','aui-selector','aui-event-base','oop','yui-throttle'], skinnable:false} }, use:['aui-base-core','aui-base-lang'], skinnable:false},
						'aui-button-item': {requires:['aui-base','aui-state-interaction','widget-child'], skinnable:true},
						'aui-calendar': {requires:['aui-base','aui-datatype','widget-stdmod','datatype-date','widget-locale'], skinnable:true},
						'aui-carousel': {requires:['aui-base','aui-template','anim'], skinnable:true},
						'aui-char-counter': {requires:['aui-base','aui-event-input'], skinnable:false},
						'aui-chart': {requires:['datasource','aui-swf','json'], skinnable:false},
						'aui-classnamemanager': {requires:['classnamemanager'], skinnable:false},
						'aui-color-picker': {submodules: {'aui-color-picker-grid-plugin': {requires:['aui-color-picker-base','plugin'], skinnable:true}, 'aui-color-picker-base': {requires:['aui-overlay-context','dd-drag','slider','aui-button-item','aui-color-util','aui-form-base','aui-panel'], skinnable:true} }, skinnable:true, use:['aui-color-picker-base','aui-color-picker-grid-plugin']},
						'aui-color-util': {skinnable:false},
						'aui-component': {requires:['aui-classnamemanager','base-build','widget'], skinnable:false},
						'aui-data-browser': {requires:['aui-base','aui-datasource-control-base','aui-input-text-control','aui-tree','aui-panel'], skinnable:true},
						'aui-data-set': {requires:['oop','collection','base'], skinnable:false},
						'aui-datasource-control': {submodules: {'aui-input-text-control': {requires:['aui-base','aui-datasource-control-base','aui-form-combobox']}, 'aui-datasource-control-base': {requires:['aui-base','datasource','dataschema']} }, skinnable:true, use:['aui-datasource-control-base','aui-input-text-control']},
						'aui-datatable': {submodules: {'aui-datatable-highlight': {requires:['aui-datatable-selection'], skinnable:true}, 'aui-datatable-selection': {requires:['datatable-base'], skinnable:true}, 'aui-datatable-edit': {requires:['datatable-base','calendar','aui-datatype','aui-toolbar','aui-form-validator','overlay','sortable'], skinnable:true} }, skinnable:true, use:['aui-datatable-edit','aui-datatable-selection','aui-datatable-highlight']},
						'aui-datatype': {requires:['aui-base','datatype'], skinnable:false},
						'aui-datepicker-deprecated': {submodules: {'aui-datepicker-select-deprecated': {requires:['aui-datepicker-base-deprecated','aui-button-item'], skinnable:true}, 'aui-datepicker-base-deprecated': {requires:['aui-calendar','aui-overlay-context'], skinnable:true} }, skinnable:true, use:['aui-datepicker-base-deprecated','aui-datepicker-select-deprecated']},
						'aui-datepicker': {submodules: {'aui-datepicker-select': {requires:['aui-datepicker-base','aui-button-item'], skinnable:true}, 'aui-datepicker-base': {requires:['aui-datatype','calendar','aui-overlay-context'], skinnable:true} }, skinnable:true, use:['aui-datepicker-base','aui-datepicker-select']},
						'aui-debounce': {skinnable:false},
						'aui-delayed-task': {skinnable:false},
						'aui-diagram-builder': {submodules: {'aui-diagram-builder-connector': {requires:['aui-base','aui-template','arraylist-add','arraylist-filter','json','graphics','dd'], skinnable:true}, 'aui-diagram-builder-impl': {requires:['aui-data-set','aui-diagram-builder-base','aui-diagram-builder-connector','overlay'], skinnable:true}, 'aui-diagram-builder-base': {requires:['aui-tabs','aui-property-list','collection','dd'], skinnable:true} }, skinnable:true, use:['aui-diagram-builder-base','aui-diagram-builder-impl']},
						'aui-dialog-iframe': {requires:['aui-base','aui-loading-mask','aui-resize-iframe','plugin'], skinnable:true},
						'aui-dialog': {requires:['aui-panel','dd-constrain','aui-button-item','aui-overlay-manager','aui-overlay-mask','aui-io-plugin','aui-resize'], skinnable:true},
						'aui-drawing-safari': {requires:['aui-drawing-base'], condition: {name: 'aui-drawing-safari', trigger: 'aui-drawing-base',test: function(A){var UA = A.UA; return UA.safari && (UA.version.major < 4 || (UA.iphone || UA.ipad));}}},
						'aui-drawing-svg': {requires:['aui-drawing-base'], condition: {name: 'aui-drawing-svg', trigger: 'aui-drawing-base',test: function(A){return A.UA.svg;}}},
						'aui-drawing-vml': {requires:['aui-drawing-base'], condition: {name: 'aui-drawing-vml', trigger: 'aui-drawing-base',test: function(A){return A.UA.vml;}}},
						'aui-drawing': {submodules: {'aui-drawing-fonts': {requires:['aui-drawing-base']}, 'aui-drawing-drag': {requires:['aui-drawing-base','event-gestures']}, 'aui-drawing-animate': {requires:['aui-drawing-base']}, 'aui-drawing-base': {requires:['aui-base','aui-color-util','substitute']} }, skinnable:false, use:['aui-drawing-base', 'aui-drawing-animate', 'aui-drawing-drag', 'aui-drawing-fonts']},
						'aui-editable': {requires:['aui-base','aui-form-combobox'], skinnable:true},
						'aui-editor': {submodules: {'aui-editor-creole-plugin': {requires:['aui-base','editor-base','aui-editor-html-creole','aui-editor-creole-parser']}, 'aui-editor-html-creole': {requires:['aui-editor-base']}, 'aui-editor-creole-parser': {requires:['aui-base']}, 'aui-editor-bbcode-plugin': {requires:['aui-base','editor-base']}, 'aui-editor-toolbar-plugin': {requires:['aui-base','aui-button-item','aui-color-picker','aui-editor-menu-plugin','aui-editor-tools-plugin','aui-form-select','aui-overlay-context-panel','aui-panel','aui-toolbar','createlink-base','editor-lists','editor-base','plugin'], skinnable:true}, 'aui-editor-menu-plugin': {requires:['aui-base','editor-base','aui-overlay-context','aui-panel','aui-editor-tools-plugin']}, 'aui-editor-tools-plugin': {requires:['aui-base','editor-base']}, 'aui-editor-base': {requires:['aui-base','editor-base','aui-editor-toolbar-plugin']} }, skinnable:true, use:['aui-editor-base','aui-editor-tools-plugin','aui-editor-menu-plugin','aui-editor-toolbar-plugin','aui-editor-bbcode-plugin','aui-editor-creole-parser','aui-editor-creole-plugin']},
						'aui-event': {submodules: {'aui-event-delegate-submit': {condition: {name: 'aui-event-delegate-submit', trigger: 'event-base-ie', ua: 'ie'}, requires:['aui-node-base','aui-event-base']}, 'aui-event-delegate-change': {condition: {name: 'aui-event-delegate-change', trigger: 'event-base-ie', ua: 'ie'}, requires:['aui-node-base','aui-event-base']}, 'aui-event-input': {requires:['aui-base']}, 'aui-event-base': {requires:['event']} }, skinnable:false, use:['aui-event-base','aui-event-input']},
						'aui-form-builder': {submodules: {'aui-form-builder-field': {requires:['aui-datatype','aui-panel','aui-tooltip'], skinnable:true}, 'aui-form-builder-base': {requires:['aui-base','aui-button-item','aui-data-set','aui-diagram-builder-base','aui-nested-list','aui-tabs'], skinnable:true} }, skinnable:true, use:['aui-form-builder-base','aui-form-builder-field']},
						'aui-form-validator': {requires:['aui-base','aui-event-input','selector-css3','escape'], skinnable:false},
						'aui-form': {submodules: {'aui-form-textfield': {requires:['aui-form-field']}, 'aui-form-textarea': {requires:['aui-autosize','aui-form-textfield'], skinnable:true}, 'aui-form-select': {requires:['aui-form-field']}, 'aui-form-field': {requires:['aui-base','aui-component']}, 'aui-form-combobox': {requires:['aui-form-textarea','aui-toolbar'], skinnable:true}, 'aui-form-base': {requires:['aui-base','aui-data-set','aui-form-field','querystring-parse','io-form']} }, skinnable:false, use:['aui-form-base','aui-form-combobox','aui-form-field','aui-form-select','aui-form-textarea','aui-form-textfield']},
						'aui-image-cropper': {requires:['widget','aui-base','resize','dd-constrain'], skinnable:true},
						'aui-image-viewer': {submodules: {'aui-media-viewer-plugin': {requires:['aui-image-viewer-base'], skinnable:false}, 'aui-image-viewer-gallery': {requires:['aui-image-viewer-base','aui-paginator','aui-toolbar'], skinnable:true}, 'aui-image-viewer-base': {requires:['anim','aui-overlay-mask'], skinnable:true} }, skinnable:true, use:['aui-image-viewer-base','aui-image-viewer-gallery','aui-media-viewer-plugin']},
						'aui-io': {submodules: {'aui-io-plugin': {requires:['aui-overlay-base','aui-parse-content','aui-io-request','aui-loading-mask']}, 'aui-io-request': {requires:['aui-base','io-base','json','plugin','querystring-stringify']} }, skinnable:false, use:['aui-io-request','aui-io-plugin']},
						'aui-live-search': {requires:['aui-base'], skinnable:false},
						'aui-loading-mask': {requires:['aui-overlay-mask','plugin'], skinnable:true},
						'aui-messaging': {requires:['aui-base','aui-task-manager','querystring'], skinnable:false},
						'aui-nested-list': {requires:['aui-base','dd-drag','dd-drop','dd-proxy'], skinnable:false},
						'aui-node': {submodules: {'aui-node-html5-print': {requires:['aui-node-html5']}, 'aui-node-html5': {requires:['collection','aui-base']}, 'aui-node-base': {requires:['array-extras','aui-base-lang','aui-classnamemanager','node']} }, skinnable:false, use:['aui-node-base','aui-node-html5','aui-node-html5-print']},
						'aui-overlay': {submodules: {'aui-overlay-mask': {requires:['aui-base','aui-overlay-base','event-resize'], skinnable:true}, 'aui-overlay-manager': {requires:['aui-base','aui-overlay-base','overlay','plugin']}, 'aui-overlay-context-panel': {requires:['aui-overlay-context','anim'], skinnable:true}, 'aui-overlay-context': {requires:['aui-overlay-manager','aui-delayed-task','aui-aria']}, 'aui-overlay-base': {requires:['aui-component','widget-position','widget-stack','widget-position-align','widget-position-constrain','widget-stdmod']} }, skinnable:true, use:['aui-overlay-base','aui-overlay-context','aui-overlay-context-panel','aui-overlay-manager','aui-overlay-mask']},
						'aui-paginator': {requires:['aui-base'], skinnable:true},
						'aui-panel': {requires:['aui-component','widget-stdmod','aui-toolbar','aui-aria'], skinnable:true},
						'aui-parse-content': {requires:['async-queue','aui-base','plugin'], skinnable:false},
						'aui-portal-layout': {requires:['aui-base','dd-drag','dd-delegate','dd-drop','dd-proxy'], skinnable:true},
						'aui-progressbar': {requires:['aui-base','aui-aria'], skinnable:true},
						'aui-property-list': {requires:['aui-datatable','datatable-scroll','datatable-sort'], skinnable:true},
						'aui-rating': {requires:['aui-base'], skinnable:true},
						'aui-resize-iframe': {requires:['aui-base','aui-task-manager','plugin'], skinnable:true},
						'aui-resize': {submodules: {'aui-resize-constrain': {requires:['aui-resize-base','dd-constrain','plugin'], skinnable:false}, 'aui-resize-base': {requires:['aui-base','dd-drag','dd-delegate','dd-drop'], skinnable:true} }, skinnable:true, use:['aui-resize-base','aui-resize-constrain']},
						'aui-scheduler': {submodules: {'aui-scheduler-event-recorder': {requires:['aui-scheduler-base','aui-template','aui-toolbar','io-form','querystring','overlay'], skinnable:true}, 'aui-scheduler-view-agenda': {requires:['aui-scheduler-base'], skinnable:true}, 'aui-scheduler-view-month': {requires:['aui-scheduler-view-table'], skinnable:true}, 'aui-scheduler-view-table-dd': {requires:['aui-scheduler-view-table','dd-drag','dd-delegate','dd-drop'], skinnable:false}, 'aui-scheduler-view-table': {requires:['aui-scheduler-base','overlay'], skinnable:true}, 'aui-scheduler-view-week': {requires:['aui-scheduler-view-day'], skinnable:true}, 'aui-scheduler-view-day': {requires:['aui-scheduler-view-table','dd-drag','dd-delegate','dd-drop','dd-constrain'], skinnable:true}, 'aui-scheduler-base': {requires:['aui-base','aui-color-util','aui-datatype','button-group','model','model-list','widget-stdmod'], skinnable:true} }, skinnable:false, use:['aui-scheduler-base','aui-scheduler-view-day','aui-scheduler-view-week','aui-scheduler-view-table','aui-scheduler-view-table-dd','aui-scheduler-view-month','aui-scheduler-view-agenda','aui-scheduler-event-recorder']},
						'aui-scroller': {requires:['aui-base','aui-simple-anim'], skinnable:true},
						'aui-search-ternary-search-tree': {requires:['aui-base'], skinnable:false},
						'aui-selector': {requires:['selector-css3'], skinnable:false},
						'aui-simple-anim': {requires:['aui-base'], skinnable:false},
						'aui-skin-base': {type: 'css', path: 'aui-skin-base/css/aui-skin-base.css'},
						'aui-skin-classic-all': {type: 'css', path: 'aui-skin-classic/css/aui-skin-classic-all.css'},
						'aui-skin-classic': {path: 'aui-skin-classic/css/aui-skin-classic.css', type: 'css', requires:['aui-skin-base']},
						'aui-sortable': {requires:['aui-base','dd-constrain','dd-drag','dd-drop','dd-proxy'], skinnable:true},
						'aui-state-interaction': {requires:['aui-base','plugin'], skinnable:false},
						'aui-swf': {requires:['aui-base','querystring-parse-simple','querystring-stringify-simple'], skinnable:false},
						'aui-tabs': {submodules: {'aui-tabs-menu-plugin': {requires:['aui-component','aui-state-interaction','aui-tabs-base','aui-overlay-context','plugin']}, 'aui-tabs-base': {requires:['aui-component','aui-state-interaction'], skinnable:true} }, skinnable:true, use:['aui-tabs-base','aui-tabs-menu-plugin']},
						'aui-task-manager': {requires:['aui-base'], skinnable:false},
						'aui-template': {requires:['aui-base'], skinnable:false},
						'aui-text': {submodules: {'aui-text-unicode': {requires:['aui-text-data-unicode'], skinnable:false}, 'aui-text-data-unicode': {requires:['text'], skinnable:false} }, skinnable:false, use:['aui-text-data-unicode', 'aui-text-unicode']},
						'aui-textboxlist': {requires:['anim-node-plugin','aui-autocomplete','node-focusmanager'], skinnable:true},
						'aui-toggler': {submodules: {'aui-toggler-delegate': {requires:['aui-toggler-base'], skinnable:false}, 'aui-toggler-base': {requires:['aui-base','transition'], skinnable:true} }, skinnable:true, use:['aui-toggler-base','aui-toggler-delegate']},
						'aui-toolbar': {requires:['aui-base','aui-button-item','aui-data-set','widget-parent'], skinnable:true},
						'aui-tooltip': {requires:['aui-overlay-context-panel'], skinnable:true},
						'aui-tpl-snippets': {submodules: {'aui-tpl-snippets-checkbox': {requires:['aui-tpl-snippets-base'], skinnable:false}, 'aui-tpl-snippets-textarea': {requires:['aui-tpl-snippets-base'], skinnable:false}, 'aui-tpl-snippets-input': {requires:['aui-tpl-snippets-base'], skinnable:false}, 'aui-tpl-snippets-select': {requires:['aui-tpl-snippets-base'], skinnable:false}, 'aui-tpl-snippets-base': {requires:['aui-template'], skinnable:false} }, skinnable:false, use:['aui-tpl-snippets-base','aui-tpl-snippets-select','aui-tpl-snippets-input','aui-tpl-snippets-textarea','aui-tpl-snippets-checkbox']},
						'aui-tree': {submodules: {'aui-tree-io': {requires:['aui-io','json'], skinnable:false}, 'aui-tree-view': {requires:['aui-tree-node','aui-tree-paginator','aui-tree-io','dd-delegate','dd-proxy'], skinnable:true}, 'aui-tree-paginator': {requires:['aui-base'], skinnable:false}, 'aui-tree-node': {requires:['aui-tree-data','aui-tree-io','aui-tree-paginator','json','querystring-stringify'], skinnable:false}, 'aui-tree-data': {requires:['aui-base','aui-task-manager'], skinnable:false} }, skinnable:true, use:['aui-tree-data', 'aui-tree-node', 'aui-tree-io', 'aui-tree-paginator', 'aui-tree-view']},
						'aui-video': {requires:['aui-base','querystring-stringify-simple'], skinnable:true},
						'aui-viewport': {requires:['aui-base'], skinnable:false}
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
