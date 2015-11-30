YUI.add('aui-viewport', function (A, NAME) {

var getClassName = A.getClassName,

    defaults = A.namespace('config.viewport'),

    CSS_PREFIX = getClassName('view') + A.config.classNameDelimiter,

    DEFAULTS_COLUMNS = defaults.columns || (defaults.columns = {
        12: 960,
        9: 720,
        6: 480,
        4: 320
    }),

    DEFAULTS_MIN_COLUMNS = defaults.minColumns || (defaults.minColumns = 4),

    DOC_EL = A.config.doc.documentElement,

    WIN = A.getWin(),

    REGEX_CLASSNAMES = new RegExp('(\\s|\\b)+' + CSS_PREFIX + '(lt|gt)*\\d+(\\b|\\s)+', 'g');

var viewportChange = function() {
    var buffer = [];

    var oldClassNames = DOC_EL.className.replace(REGEX_CLASSNAMES, '');
    var classNames = oldClassNames;
    var viewportWidth = DOC_EL.clientWidth;

    var viewportMaxColumns = DEFAULTS_MIN_COLUMNS;

    var gtLt;
    var col;

    for (var i in DEFAULTS_COLUMNS) {
        if (DEFAULTS_COLUMNS.hasOwnProperty(i)) {
            col = DEFAULTS_COLUMNS[i];

            if (viewportWidth >= col) {
                gtLt = 'gt';

                viewportMaxColumns = Math.max(viewportMaxColumns, col);
            }
            else {
                gtLt = 'lt';
            }

            buffer.push(CSS_PREFIX + gtLt + col);
        }
    }

    buffer.push(CSS_PREFIX + viewportMaxColumns);

    classNames += ' ' + buffer.join(' ');

    if (oldClassNames !== classNames) {
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


}, '3.0.1', {"requires": ["aui-node", "aui-component"]});
