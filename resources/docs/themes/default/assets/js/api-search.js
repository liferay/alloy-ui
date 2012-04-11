AUI.add('api-search', function (A) {

var Lang   = A.Lang,
    Node   = A.Node,
    AArray = A.Array;

A.APISearch = A.Base.create('apiSearch', A.Base, [A.AutoCompleteBase], {
    // -- Public Properties ----------------------------------------------------
    RESULT_TEMPLATE:
        '<li class="result {resultType}">' +
            '<a href="{url}">' +
                '<h3 class="title">{name}</h3>' +
                '<span class="type">{resultType}</span>' + 
                '<div class="description">{description}</div>' +
                '<span class="className">{class}</span>' +
            '</a>' +
        '</li>',

    // -- Initializer ----------------------------------------------------------
    initializer: function () {
        this._bindUIACBase();
        this._syncUIACBase();
    },

    // -- Protected Methods ----------------------------------------------------
    _apiResultFilter: function (query, results) {
        // Filter components out of the results.
        return AArray.filter(results, function (result) {
            return result.raw.resultType === 'component' ? false : result;
        });
    },

    _apiResultFormatter: function (query, results) {
        return AArray.map(results, function (result) {
            var raw  = A.merge(result.raw), // create a copy
                desc = raw.description || '';

            // Convert description to text and truncate it if necessary.
            desc = Node.create('<div>' + desc + '</div>').get('text');

            if (desc.length > 65) {
                desc = A.Escape.html(desc.substr(0, 65)) + ' &hellip;';
            } else {
                desc = A.Escape.html(desc);
            }

            raw['class'] || (raw['class'] = '');
            raw.description = desc;

            // Use the highlighted result name.
            raw.name = result.highlighted;

            return Lang.sub(this.RESULT_TEMPLATE, raw);
        }, this);
    },

    _apiTextLocator: function (result) {
        return result.displayName || result.name;
    }
}, {
    // -- Attributes -----------------------------------------------------------
    ATTRS: {
        resultFormatter: {
            valueFn: function () {
                return this._apiResultFormatter;
            }
        },

        resultFilters: {
            valueFn: function () {
                return this._apiResultFilter;
            }
        },

        resultHighlighter: {
            value: 'phraseMatch'
        },

        resultListLocator: {
            value: 'data.results'
        },

        resultTextLocator: {
            valueFn: function () {
                return this._apiTextLocator;
            }
        },

        source: {
            value: '/api/v1/search?q={query}&count={maxResults}'
        }
    }
});

}, '3.4.0', {requires: [
    'autocomplete-base', 'autocomplete-highlighters', 'autocomplete-sources',
    'escape'
]});
