YUI.add('aui-base-html5-shiv', function (A, NAME) {

A.HTML5_ELEMENTS = [
    'abbr',
    'article',
    'aside',
    'audio',
    'canvas',
    'command',
    'datalist',
    'details',
    'figure',
    'figcaption',
    'footer',
    'header',
    'hgroup',
    'keygen',
    'mark',
    'meter',
    'nav',
    'output',
    'progress',
    'section',
    'source',
    'summary',
    'time',
    'video'
];

A.html5shiv = function(frag) {
    var DOC = frag || A.config.doc;

    if (A.UA.ie && DOC && DOC.createElement) {
        var elements = A.HTML5_ELEMENTS,
            length = elements.length;

        while (length--) {
            DOC.createElement(elements[length]);
        }
    }

    return frag;
};


}, '3.0.1');
