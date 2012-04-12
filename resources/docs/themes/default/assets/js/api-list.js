AUI.add('api-list', function (A) {

var Lang= A.Lang,
	AArray = A.Array,

	APIList = A.namespace('APIList'),

	classesNode = A.one('#api-classes'),
	inputNode= A.one('#api-filter'),
	modulesNode = A.one('#api-modules'),
	everythingNode = A.one('#api-everything'),
	tabviewNode = A.one('#api-tabview'),

	tabs = APIList.tabs = {},

	filter = APIList.filter = new A.APIFilter({
		inputNode : inputNode,
		maxResults: 1000,

		on: {
			results: onFilterResults
		}
	}),

	search = APIList.search = new A.APISearch({
		inputNode : inputNode,
		maxResults: 100,

		on: {
			clear: onSearchClear,
			results: onSearchResults
		}
	}),

	tabview = APIList.tabview = new A.TabView({
        srcNode  : tabviewNode,
        panelNode: '#api-tabview-panel',
        render   : true,

        on: {
            selectionChange: onTabSelectionChange
        }
    }),

	focusManager = APIList.focusManager = tabviewNode.plug(A.Plugin.NodeFocusManager, {
		circular: true,
		descendants: '#api-filter, .yui3-tab-panel-selected .api-list-item a, .yui3-tab-panel-selected .result a',
		keys : {next: 'down:40', previous: 'down:38'}
	}).focusManager,

	LIST_ITEM_TEMPLATE =
		'<li class="api-list-item {typeSingular}">' +
			'<a href="{rootPath}{typePlural}/{name}.html">{displayName}</a>' +
		'</li>';

// -- Init ---------------------------------------------------------------------

// Duckpunch FocusManager's key event handling to prevent it from handling key
// events when a modifier is pressed.
A.before(function (e, activeDescendant) {
	if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
		return new A.Do.Prevent();
	}
}, focusManager, '_focusPrevious', focusManager);

A.before(function (e, activeDescendant) {
	if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
		return new A.Do.Prevent();
	}
}, focusManager, '_focusNext', focusManager);

// Create a mapping of tabs in the tabview so we can refer to them easily later.
tabview.each(function (tab, index) {
	var name = tab.get('label').toLowerCase();

	tabs[name] = {
		index: index,
		name : name,
		tab: tab
	};
});

// Switch tabs on Ctrl/Cmd-Left/Right arrows.
tabviewNode.on('key', onTabSwitchKey, 'down:37,39');

// Focus the filter input when the `/` key is pressed.
A.one(A.config.doc).on('key', onSearchKey, 'down:83');

// Keep the Focus Manager up to date.
inputNode.on('focus', function () {
	focusManager.set('activeDescendant', inputNode);
});

// -- Private Functions --------------------------------------------------------
function getFilterResultNode() {
	var queryType = filter.get('queryType');
	var resultNode = modulesNode;

	if (queryType == 'classes') {
		resultNode = classesNode;
	}
	else if (queryType == 'everything') {
		resultNode = everythingNode;
	}
	return resultNode;
	//return filter.get('queryType') === 'classes' ? classesNode : modulesNode;
}

// -- Event Handlers -----------------------------------------------------------
function onFilterResults(e) {
	var frag= A.one(A.config.doc.createDocumentFragment()),
		resultNode= getFilterResultNode(),
		queryType = filter.get('queryType'),
		typePlural= queryType,
		typeSingular = typePlural === 'classes' ? 'class' : 'module';

		var meta = A.YUIDoc.meta;
		var docData = meta.DOC_DATA;

		var metaClasses = docData.classes;
		var metaModules = docData.modules;

	if (e.results.length) {
		AArray.each(e.results, function (result) {
			var name = result.text;

			if (queryType == 'everything') {
				typePlural = metaClasses[name] ? 'classes' : 'modules';
			}

			frag.append(Lang.sub(LIST_ITEM_TEMPLATE, {
				rootPath : APIList.rootPath,
				displayName : filter.getDisplayName(result.highlighted),
				name: name,
				typePlural: typePlural,
				typeSingular: typeSingular
			}));
		});
	} else {
		frag.append(
			'<li class="message">' +
				'No ' + typePlural + ' found.' +
			'</li>'
		);
	}

	resultNode.empty(true);
	resultNode.append(frag);

	focusManager.refresh();
}

function onSearchClear(e) {

	focusManager.refresh();
}

function onSearchKey(e) {
	var target = e.target;

	if (target.test('input,select,textarea')
			|| target.get('isContentEditable')) {
		return;
	}

	e.preventDefault();

	inputNode.focus();
	focusManager.refresh();
}

function onSearchResults(e) {
	var frag = A.one(A.config.doc.createDocumentFragment());

	if (e.results.length) {
		AArray.each(e.results, function (result) {
			frag.append(result.display);
		});
	} else {
		frag.append(
			'<li class="message">' +
				'No results found. Maybe you\'ll have better luck with a ' +
				'different query?' +
			'</li>'
		);
	}

	focusManager.refresh();
}

function onTabSelectionChange(e) {
	var tab = e.newVal,
		name = tab.get('label').toLowerCase();

	tabs.selected = {
		index: tab.get('index'),
		name : name,
		tab: tab
	};

	switch (name) {
	case 'classes': // fallthru
	case 'modules':
	case 'everything':
		filter.setAttrs({
			minQueryLength: 0,
			queryType: name
		});

		search.set('minQueryLength', -1);

		// Only send a request if this isn't the initially-selected tab.
		var inputVal = A.Lang.trim(filter.get('value'));

		if (e.prevVal && inputVal) {
			filter.sendRequest(inputVal);
		}
		break;

	default:
		// WTF? We shouldn't be here!
		filter.set('minQueryLength', -1);
		search.set('minQueryLength', -1);
	}

	if (focusManager) {
		setTimeout(function () {
			focusManager.refresh();
		}, 1);
	}
}

function onTabSwitchKey(e) {
	var currentTabIndex = tabs.selected.index;

	if (!(e.ctrlKey || e.metaKey)) {
		return;
	}

	e.preventDefault();

	switch (e.keyCode) {
	case 37: // left arrow
		if (currentTabIndex > 0) {
			tabview.selectChild(currentTabIndex - 1);
			inputNode.focus();
		}
		break;

	case 39: // right arrow
		if (currentTabIndex < (A.Object.size(tabs) - 2)) {
			tabview.selectChild(currentTabIndex + 1);
			inputNode.focus();
		}
		break;
	}
}

}, '3.4.0', {requires: [
	'api-filter', 'api-search', 'event-key', 'node-focusmanager', 'tabview'
]});
