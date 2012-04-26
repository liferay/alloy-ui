var NAME = 'AutocompleteSearchList',

	ADD = 'add',
	BLANK = "''",
	SEARCH = "'Search'",
	CHECKED = 'checked',
	CLICK = 'click',
	COMMA_SPACE = ', ',
	DEMO = 'demo',
	DOC = A.config.doc,
	PHRASE_MATCH = 'phraseMatch',
	REMOVE = 'remove',
	RENDER = 'render',
	SEARCH_INITIALLY = 'searchInitially',
	STR_BLANK = '',
	VALUE = 'value',

	TPL_AC_SEARCH_LIST = '<div class="aui-autocomplete-search-list" />',
	TPL_AC_CONTAINER = '<span class="aui-field-content aui-autocomplete-search-list-ac-container">',
	TPL_AC_INPUT = '<input class="aui-field-input aui-field-input-text" id="ac-input" type="text" name="test-input" value="Search" autocomplete="off" onfocus="if(this.value==' + SEARCH + ') {this.value=' + BLANK + '};" onblur="if(!this.value) {this.value=' + SEARCH + '};this._haschanged=false;"/></span>',
	TPL_CHECKED = ' checked="checked" ',

	CSS_NO_MATCHES = 'no-matches';

var AutocompleteSearchList = function() {};

A.mix(AutocompleteSearchList, {
		NAME: NAME,

		NS: NAME,

		EXTENDS: A.Plugin.Base,

		AUGMENTS: [A.AutoCompleteBase],

		ATTRS: {
			entries: {
				value: null
			},

			entriesNode: {
				value: null
			},

			initialResult: {
				value: null
			},

			inputNode: {
				value: '#ac-input'
			},

			inputSelector: {
				value: null
			},

			minQueryLength: {
				value: 0
			},

			mode: {
				value: null
			},

			noResultsMessage: {
				value: null
			},

			resultFilters: {
				value: PHRASE_MATCH
			},

			searchInitially: {
				value: true
			},

			source: {
				value: null
			},

			tagsSelector: {
				value: null
			},

			template: {
				valueFn: function() {
					var instance = this;

					var templateType = instance.get('templateType');

					switch (templateType) {
						case 'asset-tags-selector':
						default:

							return A.AutocompleteSearchList.TPL || new A.Template(
								'<fieldset class="{[(!values.results || !values.results.length) ? "', CSS_NO_MATCHES, '" : "', STR_BLANK ,'" ]}">',
									'<tpl for="results">',
										'<label title="{text}"><input {[values.checked ? "checked" : ""]} type="checkbox" value="{text}" />{text}</label>',
									'</tpl>',
									'<div class="lfr-tag-message">{noResultsMessage}</div>',
								'</fieldset>'
							 );

						break;
					}
				}
			},

			templateType: {
				value: 'asset-tags-selector'
			}
		},

		prototype: {
			initializer: function(config) {
				var instance = this;

				var inputSelector = instance.get('inputSelector');

				var tagsSelector = instance.get('tagsSelector');

				if (tagsSelector) {
					instance.tagsSelector = tagsSelector;

					instance.entries = tagsSelector.entries;
				}

				this.afterHostEvent(
					RENDER,
					function()
					{
						instance._createNodes(config.host.bodyNode);

						instance.bindUI();

						if (instance.get(SEARCH_INITIALLY)) {
							instance._initialSearch();
						}
						
						if (tagsSelector || inputSelector) {
							var onCheckboxClick = A.bind(instance._onCheckboxClick, instance);

							instance.entriesNode.delegate(CLICK, onCheckboxClick, 'input[type=checkbox]');
						}
					}
				);
			},

			bindUI: function() {
				var instance = this;

				instance.before(
					'results',
					function(event)
					{
						var result_data = instance._formatEventResults(event);

						instance._renderResults(result_data);
					}
				);

				if (instance.entries) {
					instance.entries.after('add', instance._updateHiddenInput, instance);
				}
			},

			refreshEntries: function(entries) {
				var instance = this;

				var data = instance.initialResult;

				if (entries){
					instance.entries = entries;
				}

				data = instance._getHiddenResultsInput(data);

				instance._renderResults(
					{
						results: data
					}
				);
			},

			_createNodes: function(bodyNode) {
				var instance = this;

				var entriesNode = A.Node.create(TPL_AC_SEARCH_LIST);
				var inputNode = A.Node.create(TPL_AC_CONTAINER + TPL_AC_INPUT);

				bodyNode.append(inputNode);
				bodyNode.append(entriesNode);
				
				instance.inputNode = inputNode;
				instance.entriesNode = entriesNode;
			},

			_formatInitialSearch: function() {
				var instance = this;

				var initialResult = instance.get('initialResult');

				A.Array.map(
					initialResult,
					function(item, index, collection)
					{
						item.text = item.name;
						item.checked = item.assetCount;
					}
				);

				instance.initialResult = initialResult;

				return {
					results: initialResult
				};
			},

			_formatEventResults: function(event) {
				var instance = this;

				var formattedResults = A.Array.map(
					event.results, 
					function(item, index, collection)
					{
						var entries = instance.entries;

						if (entries) {

							if (instance.tagsSelector) {
								item.raw.checked = entries.indexOfKey(item.text) > -1 ? TPL_CHECKED : STR_BLANK;
							}
							else {
								item.raw.checked = entries.indexOf(item.text) > -1 ? TPL_CHECKED : STR_BLANK;
							}
						}

						return item.raw;
					}
				);

				return {
					results: formattedResults
				};
			},

			_getHiddenResultsInput: function(data) {
				var instance = this;

				var keys = instance.entries.keys;

				A.Array.map(
					data,
					function(item, index, collection)
					{
						item.checked = !!(keys.indexOf(item.text) + 1);
					}
				);

				return data;
			},

			_initialSearch: function() {
				var instance = this;

				if (instance.tagsSelector) {
					var initial_data = instance._formatInitialSearch();

					instance._renderResults(initial_data);
				}
				else {
					instance.sendRequest(STR_BLANK);
				}
			},

			_onCheckboxClick: function(event) {
				var instance = this;

				var checkbox = event.currentTarget;
				var checked = checkbox.get(CHECKED);
				var checkboxValue = checkbox.val();

				var tagsSelector = instance.get('tagsSelector');
				
				if (tagsSelector) {
					var action = checked ? ADD : REMOVE;

					instance.tagsSelector[action](checkboxValue);
				}
				else if (instance.get('inputSelector')) {
					var inputSelector = instance.get('inputSelector');

					var inputSelectorNode = A.one(inputSelector);
					
					var nodeValue = inputSelectorNode.val();

					var entries = instance.entries;

					if (!entries) {
						entries = [];
					}

					if (checked) {
						nodeValue = nodeValue ? nodeValue + COMMA_SPACE + checkboxValue : checkboxValue;

						entries.push(checkboxValue);
					}
					else {
						var re = new RegExp(COMMA_SPACE + checkboxValue);
						nodeValue = nodeValue.replace(re, STR_BLANK);

						re = new RegExp(checkboxValue);
						nodeValue = nodeValue.replace(re, STR_BLANK);

						if (nodeValue.indexOf(COMMA_SPACE) === 0) {
							nodeValue = nodeValue.substring(2);
						}

						var index = entries.indexOf(checkboxValue);

						var updatedEntries = entries.splice(index, 1);
					}

					inputSelectorNode.set(VALUE, nodeValue);

					instance.entries = entries;
				}
			},

			_renderResults: function(data) {
				var instance = this;

				data.noResultsMessage = instance.get('noResultsMessage');

				template = instance.get('template');

				template.render(data, instance.entriesNode);
			},

			_updateHiddenInput: function(event) {
				var instance = this;

				var initialResult = instance.initialResult;

				var name = event.attrName;

				var values = instance.entries.values;

				var lastEntry = values[values.length - 1];

				var test = A.Array.map(
					initialResult,
					function(item, index, collection) {
						return item.text;
					}
				);

				if (test.indexOf(name) < 0) {
					lastEntry.assetCount = 1;
					lastEntry.checked = true;
					lastEntry.entry = event.item.entry;
					lastEntry.name = name;
					lastEntry.text = name;
					lastEntry.value = name;

					initialResult.push(lastEntry);	

					// instance.set('initialResult', initialResult);
				}

				instance.refreshEntries(null);
			}
		}
	},
	true
);

A.AutocompleteSearchList = A.Component.build(NAME, A.Plugin.Base, [A.AutoCompleteBase, AutocompleteSearchList]);

A.AutocompleteSearchList.NS = NAME;