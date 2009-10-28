AUI.add('paginator', function(A) {

var L = A.Lang,
	isArray = L.isArray,
	isBoolean = L.isBoolean,
	isNumber = L.isNumber,
	isObject = L.isObject,
	isString = L.isString,

	ALWAYS_VISIBLE = 'alwaysVisible',
	CONTAINER = 'container',
	CONTAINERS = 'containers',
	CONTENT = 'content',
	CURRENT = 'current',
	DOT = '.',
	FIRST = 'first',
	FIRST_PAGE_LINK = 'firstPageLink',
	FIRST_PAGE_LINK_LABEL = 'firstPageLinkLabel',
	LAST = 'last',
	LAST_PAGE_LINK = 'lastPageLink',
	LAST_PAGE_LINK_LABEL = 'lastPageLinkLabel',
	LINK = 'link',
	MAX_PAGE_LINKS = 'maxPageLinks',
	NEXT = 'next',
	NEXT_PAGE_LINK = 'nextPageLink',
	NEXT_PAGE_LINK_LABEL = 'nextPageLinkLabel',
	PAGE = 'page',
	PAGE_REPORT_EL = 'pageReportEl',
	PAGE_REPORT_LABEL_TEMPLATE = 'pageReportLabelTemplate',
	PAGINATOR = 'paginator',
	PER = 'per',
	PREV = 'prev',
	PREV_PAGE_LINK = 'prevPageLink',
	PREV_PAGE_LINK_LABEL = 'prevPageLinkLabel',
	REPORT = 'report',
	ROWS = 'rows',
	ROWS_PER_PAGE = 'rowsPerPage',
	ROWS_PER_PAGE_EL = 'rowsPerPageEl',
	ROWS_PER_PAGE_OPTIONS = 'rowsPerPageOptions',
	SELECT = 'select',
	SPACE = ' ',
	STATE = 'state',
	TEMPLATE = 'template',
	TOTAL = 'total',
	TOTAL_EL = 'totalEl',
	TOTAL_LABEL = 'totalLabel',
	TOTAL_PAGES = 'totalPages',

	nodeSetter = function(v) {
		return A.get(v);
	},

	concat = function() {
		return Array.prototype.slice.call(arguments).join(SPACE);
	},

	isNodeList = function(v) {
		return (v instanceof A.NodeList);
	},

	num = function(n) {
		return parseInt(n, 10) || 0;
	},

	getCN = A.ClassNameManager.getClassName,

	CSS_PAGINATOR = getCN(PAGINATOR),
	CSS_PAGINATOR_CONTAINER = getCN(PAGINATOR, CONTAINER),
	CSS_PAGINATOR_CONTENT = getCN(PAGINATOR, CONTENT),
	CSS_PAGINATOR_CURRENT_PAGE = getCN(PAGINATOR, CURRENT, PAGE),
	CSS_PAGINATOR_FIRST_LINK = getCN(PAGINATOR, FIRST, LINK),
	CSS_PAGINATOR_LAST_LINK = getCN(PAGINATOR, LAST, LINK),
	CSS_PAGINATOR_LINK = getCN(PAGINATOR, LINK),
	CSS_PAGINATOR_NEXT_LINK = getCN(PAGINATOR, NEXT, LINK),
	CSS_PAGINATOR_PAGE_CONTAINER = getCN(PAGINATOR, PAGE, CONTAINER),
	CSS_PAGINATOR_PAGE_LINK = getCN(PAGINATOR, PAGE, LINK),
	CSS_PAGINATOR_PAGE_REPORT = getCN(PAGINATOR, CURRENT, PAGE, REPORT),
	CSS_PAGINATOR_PREV_LINK = getCN(PAGINATOR, PREV, LINK),
	CSS_PAGINATOR_ROWS_PER_PAGE = getCN(PAGINATOR, ROWS, PER, PAGE),
	CSS_PAGINATOR_TOTAL = getCN(PAGINATOR, TOTAL),

	TOTAL_LABEL_TPL = '(Total {total})',
	PAGE_REPORT_LABEL_TPL = '({page} of {totalPages})',
	DEFAULT_OUTPUT_TPL = '{FirstPageLink} {PrevPageLink} {PageLinks} {NextPageLink} {LastPageLink} {CurrentPageReport} {Total} {RowsPerPageSelect}',

	GT_TPL = '&gt;',
	LT_TPL = '&lt;',
	FIRST_LINK_TPL = '<a href="#" class="'+concat(CSS_PAGINATOR_LINK, CSS_PAGINATOR_FIRST_LINK)+'"></a>',
	LAST_LINK_TPL = '<a href="#" class="'+concat(CSS_PAGINATOR_LINK, CSS_PAGINATOR_LAST_LINK)+'"></a>',
	NEXT_LINK_TPL = '<a href="#" class="'+concat(CSS_PAGINATOR_LINK, CSS_PAGINATOR_NEXT_LINK)+'"></a>',
	PAGE_CONTAINER_TPL = '<span class="'+concat(CSS_PAGINATOR_PAGE_CONTAINER)+'"></span>',
	PAGE_LINK_TPL = '<a href="#" class="'+concat(CSS_PAGINATOR_LINK, CSS_PAGINATOR_PAGE_LINK)+'"></a>',
	PAGE_REPORT_TPL = '<span class="'+concat(CSS_PAGINATOR_PAGE_REPORT)+'"></span>',
	PREV_LINK_TPL = '<a href="#" class="'+concat(CSS_PAGINATOR_LINK, CSS_PAGINATOR_PREV_LINK)+'"></a>',
	ROWS_PER_PAGE_TPL = '<select class="'+CSS_PAGINATOR_ROWS_PER_PAGE+'"></select>',
	TOTAL_TPL = '<span class="'+concat(CSS_PAGINATOR_TOTAL)+'"></span>';

function Paginator(config) {
	Paginator.superclass.constructor.apply(this, arguments);
}

A.mix(Paginator, {
	NAME: PAGINATOR,

	ATTRS: {
		alwaysVisible: {
			value: true,
			validator: isBoolean
		},

		containers: {
			writeOnce: true,
			setter: function(v) {
				var instance = this;

				if (isNodeList(v)) {
					return v;
				}
				else if (isString(v)) {
					return A.all(v);
				}

				return new A.NodeList([v]);
			}
		},

		page: {
			setter: function(v) {
				return num(v);
			},
			value: 1
		},

		pageReportEl: {
			setter: nodeSetter,
			valueFn: function() {
				var label = this.get(PAGE_REPORT_LABEL_TEMPLATE);

				return A.Node.create(PAGE_REPORT_TPL).html(label);
			}
		},

		pageReportLabelTemplate: {
			getter: function() {
				var instance = this;

				return A.substitute(PAGE_REPORT_LABEL_TPL, {
					page: instance.get(PAGE),
					totalPages: instance.get(TOTAL_PAGES)
				});
			},
			validator: isString
		},

		firstPageLink: {
			setter: nodeSetter,
			valueFn: function() {
				var label = this.get(FIRST_PAGE_LINK_LABEL);

				return A.Node.create(FIRST_LINK_TPL).html(label);
			}
		},

		firstPageLinkLabel: {
			value: FIRST,
			validator: isString
		},

		maxPageLinks: {
			value: 10,
			getter: function(v) {
				var totalPages = this.get(TOTAL_PAGES);

				return Math.min(totalPages, v);
			},
			validator: isNumber
		},

		prevPageLink: {
			setter: nodeSetter,
			valueFn: function() {
				var label = this.get(PREV_PAGE_LINK_LABEL);

				return A.Node.create(PREV_LINK_TPL).html(label);
			}
		},

		prevPageLinkLabel: {
			value: concat(LT_TPL, PREV),
			validator: isString
		},

		nextPageLink: {
			setter: nodeSetter,
			valueFn: function() {
				var label = this.get(NEXT_PAGE_LINK_LABEL);

				return A.Node.create(NEXT_LINK_TPL).html(label);
			}
		},

		nextPageLinkLabel: {
			value: concat(NEXT, GT_TPL),
			validator: isString
		},

		lastPageLink: {
			setter: nodeSetter,
			valueFn: function() {
				var label = this.get(LAST_PAGE_LINK_LABEL);

				return A.Node.create(LAST_LINK_TPL).html(label);
			}
		},

		lastPageLinkLabel: {
			value: LAST,
			validator: isString
		},

		rowsPerPageOptions: {
			value: {},
			validator: isArray
		},

		rowsPerPage: {
			setter: function(v) {
				return num(v);
			},
			value: 1
		},

		rowsPerPageEl: {
			setter: nodeSetter,
			valueFn: function() {
				return A.Node.create(ROWS_PER_PAGE_TPL);
			}
		},

		template: {
			getter: function(v) {
				return this._getTemplate(v);
			},
			writeOnce: true,
			value: DEFAULT_OUTPUT_TPL,
			validator: isString
		},

		total: {
			setter: function(v) {
				return this._setTotal(v);
			},
			value: 0,
			validator: isNumber
		},

		totalEl: {
			setter: nodeSetter,
			valueFn: function() {
				var label = this.get(TOTAL_LABEL);

				return A.Node.create(TOTAL_TPL).html(label);
			}
		},

		totalLabel: {
			getter: function() {
				var instance = this;

				return A.substitute(TOTAL_LABEL_TPL, {
					total: instance.get(TOTAL)
				});
			},
			validator: isString
		},

		totalPages: {
			readOnly: true,
			getter: function(v) {
				return Math.ceil(
					this.get(TOTAL) / this.get(ROWS_PER_PAGE)
				);
			}
		},

		state: {
			setter: function(v) {
				return this._setState(v);
			},
			getter: function(v) {
				return this._getState(v);
			},
			value: {},
			validator: isObject
		}
	}
});

A.extend(Paginator, A.Widget, {
	lastState: null,
	templatesCache: null,

	/*
	* Lifecycle
	*/
	renderUI: function() {
		var instance = this;
		var containers = instance.get(CONTAINERS);

		instance._renderRowsPerPageOptions();

		instance._renderTemplateUI();

		containers.addClass(CSS_PAGINATOR_CONTAINER);
	},

	bindUI: function() {
		var instance = this;

		instance._delegateDOM();
		instance._bindDOMEvents();

		instance.publish('changeRequest');
		instance.after('pageChange', A.bind(instance._afterSetPage, instance));
		instance.after('stateChange', A.bind(instance._afterSetState, instance));
		instance.before('stateChange', A.bind(instance._beforeSetState, instance));

		// invoke _renderTemplateUI to recreate the template markup
		instance.after('maxPageLinksChange', A.bind(instance._renderTemplateUI, instance));
		instance.after('rowsPerPageChange', A.bind(instance._renderTemplateUI, instance));
		instance.after('totalChange', A.bind(instance._renderTemplateUI, instance));
	},

	syncUI: function() {
		var instance = this;

		// fire changeRequest to the first state
		instance._afterSetPage();
	},

	_syncPageUI: function() {
		var instance = this;
		var containers = instance.get(CONTAINERS);
		var page = instance.get(PAGE);

		// creating range to show on the pageLinks, keep the current page on center
		var range = instance.calculateRange(page);

		// loop all containers
		containers.each(function(node) {
			var index = 0;
			var pageNumber = range.start;
			// query all anchor that represents the page links
			var pageLinks = node.all(DOT+CSS_PAGINATOR_PAGE_LINK);

			if (pageLinks) {
				pageLinks.removeClass(CSS_PAGINATOR_CURRENT_PAGE);

				// loop all pages from range.start to range.end
				while (pageNumber <= range.end) {
					// get the anchor pageEl and set the label to be the number of the current page
					var pageEl = pageLinks.item(index).html(pageNumber);

					// uset an attribute page on the anchor to retrieve later when _onClickPageLinkEl fires
					pageEl.setAttribute(PAGE, pageNumber);

					if (pageNumber == page) {
						// search for the current page and addClass saying it's the current
						pageEl.addClass(CSS_PAGINATOR_CURRENT_PAGE);
					}

					index++;
					pageNumber++;
				};
			}
		});
	},

	_syncPageReportUI: function(event) {
		var instance = this;
		var containers = instance.get(CONTAINERS);

		containers.each(function(node) {
			// search for the respective pageReportEl
			var pageReportEl = node.one(DOT+CSS_PAGINATOR_PAGE_REPORT);

			if (pageReportEl) {
				// update its label with the page report template, eg. (1 of 100)
				pageReportEl.html(
					instance.get(PAGE_REPORT_LABEL_TEMPLATE)
				);
			}
		});
	},

	/*
	* Methods
	*/
	calculateRange: function(page) {
		var instance = this;
		var totalPages = instance.get(TOTAL_PAGES);
		var maxPageLinks = instance.get(MAX_PAGE_LINKS);
		// calculates the center page link index
		var offset = Math.ceil(maxPageLinks/2);

		// find the start range to show on the page links
		// Math.min pick the minimum value when the page number is near totalPages value
		// this fixes when the offset is small and generates less than [maxPageLinks] page links
		var start = Math.min(
			// Math.max(x, 1) doesn't allow negative or zero values
			Math.max(page - offset, 1), (totalPages - maxPageLinks + 1)
		);

		// find the end range, the range has always maxPageLinks size
		// so, (start + maxPageLinks - 1) try to find the end range
		// Math.min with totalPages doesn't allow values bigger than totalPages
		var end = Math.min(start + maxPageLinks - 1, totalPages);

		return {
			start: start,
			end: end
		};
	},

	hasNextPage: function() {
		var instance = this;

		return instance.hasPage(
			instance.get(PAGE) + 1
		);
	},

	hasPrevPage: function() {
		var instance = this;

		return instance.hasPage(
			instance.get(PAGE) - 1
		);
	},

	hasPage: function(page) {
		var instance = this;
		var totalPages = instance.get(TOTAL_PAGES);

		return ( (page > 0) && (page <= totalPages) );
	},

	_renderTemplateUI: function() {
		var instance = this;
		var containers = instance.get(CONTAINERS);

		instance.templatesCache = null;

		// loading HTML template on the containers
		containers.html(
			instance.get(TEMPLATE)
		);

		// sync pageLinks
		instance._syncPageUI();

		// sync page report, eg. (1 of 100)
		instance._syncPageReportUI();

		// bind the DOM events after _renderTemplateUI
		instance._bindDOMEvents();
	},

	_renderRowsPerPageOptions: function() {
		var instance = this;
		var i = 0;
		var rowsPerPageEl = instance.get(ROWS_PER_PAGE_EL);
		var rowsPerPageOptions = instance.get(ROWS_PER_PAGE_OPTIONS);

		A.each(rowsPerPageOptions, function(value) {
			rowsPerPageEl.getDOM().options[i++] = new Option(value, value);
		});
	},

	/*
	* Getters & Setters
	*/
	setState: function(v) {
		var instance = this;

		instance.set(STATE, v);
	},

	_setState: function(v) {
		var instance = this;

		A.each(v, function(value, key) {
			instance.set(key, value);
		});

		return v;
	},

	_setTotal: function(v) {
		var instance = this;
		var alwaysVisible = instance.get(ALWAYS_VISIBLE);
		var containers = instance.get(CONTAINERS);

		// if !alwaysVisible and there is nothing to show, hide it
		if (!alwaysVisible && (v == 0)) {
			containers.hide();
		}
		else {
			containers.show();
		}

		return v;
	},

	_getState: function(v) {
		var instance = this;

		return {
			before: instance.lastState,
			paginator: instance,
			page: instance.get(PAGE),
			total: instance.get(TOTAL),
			totalPages: instance.get(TOTAL_PAGES),
			rowsPerPage: instance.get(ROWS_PER_PAGE)
		};
	},

	_getTemplate: function(v) {
		var instance = this;

		var outer = function(key) {
			return instance.get(key).outerHTML();
		};

		// if template is not cached...
		if (!instance.templatesCache) {
			var page = 0;
			var totalPages = instance.get(TOTAL_PAGES);
			var maxPageLinks = instance.get(MAX_PAGE_LINKS);
			var pageContainer = A.Node.create(PAGE_CONTAINER_TPL);

			// crate the anchor to be the page links
			while (page++ < maxPageLinks) {
				pageContainer.append(
					A.Node.create(PAGE_LINK_TPL)
				)
			};

			// substitute the {keys} on the templates with the real outerHTML templates
			instance.templatesCache = A.substitute(v, {
				CurrentPageReport: outer(PAGE_REPORT_EL),
				FirstPageLink: outer(FIRST_PAGE_LINK),
				LastPageLink: outer(LAST_PAGE_LINK),
				NextPageLink: outer(NEXT_PAGE_LINK),
				PageLinks: pageContainer.outerHTML(),
				PrevPageLink: outer(PREV_PAGE_LINK),
				RowsPerPageSelect: outer(ROWS_PER_PAGE_EL),
				Total: outer(TOTAL_EL)
			});
		}

		return instance.templatesCache;
	},

	/*
	* Listeners
	*/
	_afterSetPage: function(event) {
		var instance = this;
		var state = instance.get(STATE);

		// fires changeRequest, this is the most important event to the user
		// the user needs to invoke .setState(newState) to update the UI
		instance.fire('changeRequest', { state: state });
	},

	_afterSetState: function(event) {
		var instance = this;

		instance._syncPageUI();
		instance._syncPageReportUI();
	},

	_beforeSetState: function(event) {
		var instance = this;

		instance.lastState = event.prevVal;
	},

	_onClickFirstLinkEl: function(event) {
		var instance = this;

		instance.set(PAGE, 1);

		event.halt();
	},

	_onClickPrevLinkEl: function(event) {
		var instance = this;

		if (instance.hasPrevPage()) {
			var page = instance.get(PAGE);

			instance.set(PAGE, page - 1);
		}

		event.halt();
	},

	_onClickPageLinkEl: function(event) {
		var instance = this;
		var pageNumber = event.target.attr(PAGE);

		instance.set(PAGE, pageNumber);

		event.halt();
	},

	_onClickNextLinkEl: function(event) {
		var instance = this;

		if (instance.hasNextPage()) {
			var page = instance.get(PAGE);

			instance.set(PAGE, page + 1);
		}

		event.halt();
	},

	_onClickLastLinkEl: function(event) {
		var instance = this;
		var totalPages = instance.get(TOTAL_PAGES);

		instance.set(PAGE, totalPages);

		event.halt();
	},

	_bindDOMEvents: function() {
		var instance = this;
		var containers = instance.get(CONTAINERS);

		// loop all containers...
		containers.each(function(node) {
			// search for selects rows per page elements
			var rowsPerPageEl = node.one(DOT+CSS_PAGINATOR_ROWS_PER_PAGE);

			if (rowsPerPageEl) {
				// update the value with the current rowsPerPage
				rowsPerPageEl.val(
					instance.get(ROWS_PER_PAGE)
				);

				// bind change event to update the rowsPerPage
				rowsPerPageEl.on('change', function(event) {
					var rowsPerPage = event.target.val();

					// reset the page before render the pageLinks again
					instance.set(PAGE, 1);

					// set rowsPerPage, this will render the UI again
					instance.set(ROWS_PER_PAGE, rowsPerPage);
				});
			}
		});
	},

	_delegateDOM: function() {
		var instance = this;
		var containers = instance.get(CONTAINERS);

		containers.each(function(node, i) {
			node.delegate('click', A.bind(instance._onClickFirstLinkEl, instance), DOT+CSS_PAGINATOR_FIRST_LINK);
			node.delegate('click', A.bind(instance._onClickPrevLinkEl, instance), DOT+CSS_PAGINATOR_PREV_LINK);
			node.delegate('click', A.bind(instance._onClickPageLinkEl, instance), DOT+CSS_PAGINATOR_PAGE_LINK);
			node.delegate('click', A.bind(instance._onClickNextLinkEl, instance), DOT+CSS_PAGINATOR_NEXT_LINK);
			node.delegate('click', A.bind(instance._onClickLastLinkEl, instance), DOT+CSS_PAGINATOR_LAST_LINK);
		});
	}
});

A.Paginator = Paginator;

}, '@VERSION', { requires: [ 'aui-base', 'substitute' ] });