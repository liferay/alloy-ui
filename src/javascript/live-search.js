AUI.add('live-search', function(A) {

var L = A.Lang,
	isString = L.isString,
	isObject = L.isObject,
	isFunction = L.isFunction,

	BLANK = '',
	DATA = 'data',
	DELAY = 'delay',
	EXCLUDE = 'exclude',
	HIDE = 'hide',
	INDEX = 'index',
	INPUT = 'input',
	LIVE_SEARCH = 'live-search',
	MATCH_REGEX = 'matchRegex',
	NODES = 'nodes',
	ROWS = 'rows',
	SHOW = 'show',
	STAR = '*',

	KEY_ENTER = 13,

	isNodeList = function(v) {
		return (v instanceof A.NodeList);
	};

function LiveSearch(config) {
	LiveSearch.superclass.constructor.apply(this, arguments);
}

A.mix(LiveSearch, {
	NAME: LIVE_SEARCH,

	ATTRS: {
		data: {
			value: function(node) {
				return node.html();
			},
			validator: isFunction
		},

		delay: {
			value: 250
		},

		exclude: {
			validator: isFunction
		},

		hide: {
			value: function(node) {
				return node.hide();
			},
			validator: isFunction
		},

		index: {
			value: [],
			validator: isObject
		},

		input: {
			setter: function(v) {
				return A.get(v);
			}
		},

		matchRegex: {
			validator: function(v) {
				return (v instanceof RegExp);
			},
			value: /(\w|\s|[*])*/g
		},

		nodes: {
			setter: function(v) {
				return this._setNodes(v);
			}
		},

		rows: {
			value: [],
			validator: isObject
		},

		show: {
			value: function(node) {
				return node.show();
			},
			validator: isFunction
		}
	}
});

A.extend(LiveSearch, A.Base, {
	normalizedQuery: BLANK,

	query: BLANK,

	timer: null,

	/*
	* Lifecycle
	*/
	initializer: function() {
		var instance = this;

		instance.refreshIndex();

		instance.bindUI();
	},

	bindUI: function() {
		var instance = this;
		var input = instance.get(INPUT);

		input.on('keyup', A.bind(instance._inputKeyUp, instance));

		instance.publish('search', { defaultFn: instance.search });
	},

	/*
	* Methods
	*/
	filter: function(query) {
		var instance = this;
		var results = [];
		var rows = instance.get(ROWS);
		var index = instance.get(INDEX);
		var exclude = instance.get(EXCLUDE);

		instance.query = query;
		instance.normalizedQuery = instance._normalizeQuery(query);

		var regex = new RegExp(
			instance.normalizedQuery
		);

		A.each(index, function(content, index) {
			var node = rows[index];

			var excludeCondition = isFunction(exclude) &&
				exclude.apply(instance, [node]);

			results.push({
				content: content,
				excluded: excludeCondition,
				match: regex.test(content),
				node: node
			});
		});

		return results;
	},

	refreshIndex: function() {
		var instance = this;
		var index = [];
		var rows = [];

		instance.get(NODES).each(function(node) {
			var content = L.trim(
				instance.get(DATA).apply(instance, [node]).toLowerCase()
			);

			index.push(content);
			rows.push(node);
		});

		instance.set(INDEX, index);
		instance.set(ROWS, rows);
	},

	search: function(event) {
		var instance = this;
		var value = instance.get(INPUT).val();

		var results = instance.filter(value);

		A.each(results, function(search) {
			var node = search.node;

			if (!search.excluded) {
				if (search.match) {
					instance.get(SHOW).apply(instance, [node]);
				}
				else {
					instance.get(HIDE).apply(instance, [node]);
				}
			}
		});

		event.liveSearch.results = results;
	},

	_normalizeQuery: function(query) {
		var instance = this;
		var matchRegex = instance.get(MATCH_REGEX);

		// trim the user query and lowercase it
		query = L.trim( query.toLowerCase() );

		// match with the matchRegex to be only alphanumeric (default regex)
		query = query.match(matchRegex).join(BLANK);

		// replace on the query '*' to '', on a regex empty match with everything like *
		query = query.replace(STAR, BLANK);

		return query;
	},

	/*
	* Listeners
	*/
	_inputKeyUp: function(event) {
		var instance = this;
		var delay = instance.get(DELAY);
		var keyCode = event.keyCode;

		if (keyCode = KEY_ENTER) {
			event.halt();
		}

		if (isObject(instance.timer)) {
			instance.timer.cancel();
		}

		instance.timer = A.later(delay, instance, function() {
			instance.fire('search', {
				liveSearch: {
					inputEvent: event
				}
			});
		});
	},

	/*
	* Setters
	*/
	_setNodes: function(v) {
		var instance = this;

		if (isNodeList(v)) {
			return v;
		}
		else if (isString(v)) {
			return A.all(v);
		}

		return new A.NodeList([v]);
	}
});

A.LiveSearch = LiveSearch;

}, '@VERSION', { requires: [ 'aui-base' ] });