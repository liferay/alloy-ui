AUI.add('api-filter', function (A) {
window.A = A;
A.APIFilter = A.Base.create('apiFilter', A.Base, [A.AutoCompleteBase], {
	// -- Initializer ----------------------------------------------------------
	initializer: function () {
		this._bindUIACBase();
		this._syncUIACBase();
	},
	getDisplayName: function(name) {
		A.each(A.YUIDoc.meta.allModules, function(i) {
			if (i.name === name && i.displayName) {
				name = i.displayName;
			}
		});

		return name;
	}

}, {
	// -- Attributes -----------------------------------------------------------
	ATTRS: {
		resultHighlighter: {
			value: 'phraseMatch'
		},

		// May be set to "classes" or "modules".
		queryType: {
			value: 'classes'
		},

		source: {
			valueFn: function() {
				var self = this;
				return function(q) {
					var queryType = self.get('queryType');

					var meta = A.YUIDoc.meta;

					var everything = [].concat(meta.modules, meta.classes);

					everything.sort(function(x,y){
						var a = String(x).toUpperCase();
						var b = String(y).toUpperCase();
						if (a > b) {
							return 1;
						}
						if (a < b) {
							return -1;
						}
						return 0;
	});

					meta.everything = everything;

					var data = A.YUIDoc.meta[queryType];
					var out = [];
					A.each(data, function(v) {
						if (v.toLowerCase().indexOf(q.toLowerCase()) > -1) {
							out.push(v);
						}
					});
					return out;
				};
			}
		}
	}
});

}, '3.4.0', {requires: [
	'autocomplete-base', 'autocomplete-highlighters', 'autocomplete-sources'
]});
