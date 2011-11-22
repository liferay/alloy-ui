AUI.add('aui-viewport', function(A) {
var Lang = A.Lang,
	getClassName = A.getClassName,

	defaults = YUI.AUI.namespace('defaults.viewport'),

	NAME = 'view',

	CSS_PREFIX = getClassName(NAME) + A.config.classNameDelimiter,

	DEFAULTS_COLUMNS = defaults.columns || (defaults.columns = {
		12: 960,
		9: 720,
		6: 480,
		4: 320
	}),

	DEFAULTS_MIN_COLUMNS = defaults.minColumns || (defaults.minColumns = 4),

	DOC_EL = A.config.doc.documentElement,

	WIN = A.getWin(),

	REGEX_CLASSNAMES = new RegExp('(\\s|\\b)+' + CSS_PREFIX + '(lt|gt)*\\d+(\\b|\\s)+', 'g'),

	STR_BLANK = ' ',
	STR_EMPTY = '',

	STR_GT = 'gt',
	STR_LT = 'lt';

	var viewportChange = function(event) {
		var buffer = [];

		var oldClassNames = DOC_EL.className.replace(REGEX_CLASSNAMES, STR_EMPTY);
		var classNames = oldClassNames;
		var viewportWidth = DOC_EL.clientWidth;

		var viewportMaxColumns = DEFAULTS_MIN_COLUMNS;

		var gtLt;
		var col;

		for (var i in DEFAULTS_COLUMNS) {
			col = DEFAULTS_COLUMNS[i];

			if (viewportWidth >= col) {
				gtLt = STR_GT;

				viewportMaxColumns = Math.max(viewportMaxColumns, col);
			}
			else {
				gtLt = STR_LT;
			}

			buffer.push(CSS_PREFIX + gtLt + col);
		}

		buffer.push(CSS_PREFIX + viewportMaxColumns);

		classNames += STR_BLANK + buffer.join(STR_BLANK);

		if (oldClassNames != classNames) {
			DOC_EL.className = classNames;
		}
	};

	var resizeHandle = WIN.on('resize', A.debounce(viewportChange, 50));
	var orientationHandle = WIN.on('orientationchange', viewportChange);

	viewportChange();

A.Viewport = {
	viewportChange: viewportChange,
	_orientationHandle: orientationHandle,
	_resizeHandle: resizeHandle
};

}, '@VERSION@' ,{requires:['aui-base'], skinnable:false});
