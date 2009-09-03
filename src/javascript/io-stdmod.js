AUI.add('io-stdmod', function(A) {

var L = A.Lang,
	isString = L.isString,

	FORMATTER = 'formatter',
	HOST = 'host',
	ICON = 'icon',
	IO_CFG = 'cfg',
	LOADING = 'loading',
	SECTION = 'section',
	URI = 'uri',

	getCN = A.ClassNameManager.getClassName,

	CSS_ICON_LOADING = getCN(ICON, LOADING);

var StdMod = A.WidgetStdMod;

/* Standard Module IO Plugin Constructor */
function StdModIOPlugin(config) {
	StdModIOPlugin.superclass.constructor.apply(this, arguments);
}

A.mix(StdModIOPlugin, {
	NAME: 'stdModIOPlugin',

	NS: 'io',

	ATTRS: {

		uri : {
			value: null
		},

		cfg : {
			value: null
		},

		/*
		* The default formatter to use when formatting response data. The default
		* implementation simply passes back the response data passed in.
		*/
		formatter : {
			valueFn: function() {
				return this._defFormatter;
			}
		},

		/*
		* The Standard Module section to which the io plugin instance is bound.
		* Response data will be used to populate this section, after passing through
		* the configured formatter.
		*/
		section: {
			value: StdMod.BODY,
			validator: function(val) {
				return (!val || val == StdMod.BODY || val == StdMod.HEADER || val == StdMod.FOOTER);
			}
		},

		loading: {
			value: '<div class="' + CSS_ICON_LOADING + '"></div>'
		}
	}
});

A.extend(StdModIOPlugin, A.Plugin.Base, {
	destructor: function() {
		if (this._activeIO) {
			A.io.abort(this._activeIO);
			this._activeIO = null;
		}
	},

	/*
	* IO Plugin specific method, use to initiate a new io request using the current
	* io configuration settings.
	*/
	refresh: function() {
		section = this.get(SECTION);

		if (section && !this._activeIO) {
			var uri = this.get(URI);

			if (uri) {
				cfg = this.get(IO_CFG) || {};

				cfg.on = cfg.on || {};

				cfg.on.start = cfg.on.start || A.bind(this._defStartHandler, this);
				cfg.on.complete = cfg.on.complete || A.bind(this._defCompleteHandler, this);

				cfg.on.success = cfg.on.success || A.bind(this._defSuccessHandler, this);
				cfg.on.failure = cfg.on.failure || A.bind(this._defFailureHandler, this);

				cfg.method = cfg.method || 'POST';

				A.io(uri, cfg);
			}
		}
	},

	_defSuccessHandler: function(id, o) {
		var response = o.responseText || '';
		var section = this.get(SECTION);
		var formatter = this.get(FORMATTER);

		this.get(HOST).setStdModContent(section, formatter(response));
	},

	_defFailureHandler: function(id, o) {
		this.get(HOST).setStdModContent(this.get(SECTION), 'Failed to retrieve content');
	},

	_defStartHandler: function(id, o) {
		this._activeIO = o;
		this.get(HOST).setStdModContent(this.get(SECTION), this.get(LOADING));
	},

	_defCompleteHandler: function(id, o) {
		this._activeIO = null;
	},

	_defFormatter: function(val) {
		return val;
	}
});

A.namespace('Plugin');
A.Plugin.StdModIOPlugin = StdModIOPlugin;

}, '@VERSION', { requires: [ 'overlay', 'io', 'plugin' ] });