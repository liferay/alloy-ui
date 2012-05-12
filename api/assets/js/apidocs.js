AUI().use(
    'yuidoc-meta',
    'api-list', 'controller', 'history-hash', 'node-event-delegate',
    'node-load', 'node-screen', 'node-style',
function (Y) {

// Autodetecting the URL we are serving from
var parts = location.href.split('/'),
    url = [],
    baseNum = parts.length;

Y.each(parts, function(v, k) {
    switch (v) {
        case 'classes':
        case 'modules':
        case 'files':
            baseNum = k;
            url.push('');
            break;
        default:
            if (k < baseNum) {
                url.push(v); 
            }
            break
    }
});

url = url.join('/');


var win = Y.config.win,

    bd           = Y.one('#bd'),
    controller   = new Y.Controller({ root: url }),
    contentNode  = Y.one('#docs-main'),
    localStorage = win.localStorage,

    classTabView,
    selectedTab;

    Y.APIList.rootPath = url;

// Note: In the following routes, an ?xhr query string is appended to each URL
// requested via XHR. This has no functional purpose, but works around a bug in
// both WebKit and Gecko browsers that causes XHR requests (and their headers)
// to override normal requests in the cache when the URLs are the same, even if
// the request headers differ.

// -- / ------------------------------------------------------------------------
controller.route('/(index.html)?', function (req) {
    if (req.path === controller._lastPath) {
        return;
    }

    controller._lastPath = req.path;

    bd.addClass('loading');
    contentNode.load(this.root + '/?xhr', null, this.afterLoad);
});

// -- /classes/* ---------------------------------------------------------------
controller.route('/classes/:class.html', function (req, next) {
    if (req.path === controller._lastPath) {
        controller.updateTabState();
        return;
    }

    bd.addClass('loading');
    controller._lastPath = req.path;

    contentNode.load(this.root + '/classes/' + req.params['class'] + '.html?xhr',
        null,
        function () {
            controller.afterLoad();
            controller.initClassTabView();
        }
    );
});

// -- /files/* -----------------------------------------------------------------
controller.route('/files/*file', function (req, next) {
    if (req.path === controller._lastPath) {
        return;
    }

    controller._lastPath = req.path;

    bd.addClass('loading');
    contentNode.load(this.root + '/files/' + req.params.file + '?xhr', null,
        function () {
            controller.afterLoad();
            controller.initLineNumbers();
        });
});

// -- /modules/* ---------------------------------------------------------------
controller.route('/modules/:module.html', function (req, next) {
    if (req.path === controller._lastPath) {
        return;
    }

    controller._lastPath = req.path;

    bd.addClass('loading');
    contentNode.load(this.root + '/modules/' + req.params.module + '.html?xhr',
            null, this.afterLoad);
});

// -- Utility Functions --------------------------------------------------------
controller.afterLoad =  function () {
    var xhrCrumbsNode = Y.one('#xhr-crumbs'),
        xhrTitleNode  = Y.one('#xhr-title');

    // Update the page title.
    if (xhrTitleNode) {
        Y.config.doc.title = xhrTitleNode.get('text');
    }

    // Enable syntax highlighting on the loaded content.
    prettyPrint();

    bd.removeClass('loading');
};

controller.checkVisibility = function (tab) {
    tab || (tab = selectedTab);

    if (!tab) { return; }

    var panelNode = tab.get('panelNode'),
        visibleItems;

    // If no items are visible in the tab panel due to the current visibility
    // settings, display a message to that effect.
    visibleItems = panelNode.all('.item,.index-item').some(function (itemNode) {
        if (itemNode.getComputedStyle('display') !== 'none') {
            return true;
        }
    });

    panelNode.all('.no-visible-items').remove();

    if (!visibleItems) {
        if (Y.one('#index .index-item')) {
            panelNode.append(
                '<div class="no-visible-items">' +
                    '<p>' +
                    'Some items are not shown due to the current visibility ' +
                    'settings. Use the checkboxes at the upper right of this ' +
                    'page to change the visibility settings.' +
                    '</p>' +
                '</div>'
            );
        } else {
            panelNode.append(
                '<div class="no-visible-items">' +
                    '<p>' +
                    'This class doesn\'t provide any methods, properties, ' +
                    'attributes, or events.' +
                    '</p>' +
                '</div>'
            );
        }
    }

    // Hide index sections without any visible items.
    Y.all('.index-section').each(function (section) {
        var items        = 0,
            visibleItems = 0;

        section.all('.index-item').each(function (itemNode) {
            items += 1;

            if (itemNode.getComputedStyle('display') !== 'none') {
                visibleItems += 1;
            }
        });

        section.toggleClass('hidden', !visibleItems);
        section.toggleClass('no-columns', visibleItems < 4);
    });
};

controller.initClassTabView = function () {
    if (!Y.all('#classdocs .api-class-tab').size()) {
        return;
    }

    if (classTabView) {
        classTabView.destroy();
        selectedTab = null;
    }

    classTabView = new Y.TabView({
        srcNode: '#classdocs',

        on: {
            selectionChange: controller.onTabSelectionChange
        }
    });

    controller.updateTabState();
    classTabView.render();
};

controller.initLineNumbers = function () {
    var hash = win.location.hash.substring(1),
        hasLines,
        node;

    // Add ids for each line number in the file source view.
    contentNode.all('.linenums>li').each(function (lineNode, index) {
        lineNode.set('id', 'l' + (index + 1));
        lineNode.addClass('file-line');
        hasLines = true;
    });

    // Scroll to the desired line.
    if (hasLines && /^l\d+$/.test(hash)) {
        if ((node = contentNode.one('#' + hash))) {
            win.scroll(0, node.getY());
        }
    }
};

controller.updateTabState = function (src) {
    var hash = win.location.hash.substring(1),
        defaultTab, node, tab, tabPanel;

    if (!classTabView) {
        return;
    }

    if (src === 'hashchange' && !hash) {
        defaultTab = 'index';
    } else {
        if (localStorage) {
            defaultTab = localStorage.getItem('tab_' + controller.getPath()) ||
                'index';
        } else {
            defaultTab = 'index';
        }
    }

    if (hash && (node = Y.one('#classdocs #' + hash))) {
        if ((tabPanel = node.ancestor('.api-class-tabpanel', true))) {
            if ((tab = Y.one('#classdocs .api-class-tab.' + tabPanel.get('id')))) {
                if (classTabView.get('rendered')) {
                    Y.Widget.getByNode(tab).set('selected', 1);
                } else {
                    tab.addClass('yui3-tab-selected');
                }
            }
        }

        // Scroll to the desired element if this is a hash URL.
        if (node) {
            if (classTabView.get('rendered')) {
                scrollToNode();
            } else {
                classTabView.once('renderedChange', scrollToNode);
            }
        }
    } else {
        tab = Y.one('#classdocs .api-class-tab.' + defaultTab);

        if (classTabView.get('rendered')) {
            Y.Widget.getByNode(tab).set('selected', 1);
        } else {
            tab.addClass('yui3-tab-selected')
        }
    }

    function scrollToNode() {
        if (node.hasClass('protected')) {
            Y.one('#api-show-protected').set('checked', true);
            controller.updateVisibility();
        }

        if (node.hasClass('private')) {
            Y.one('#api-show-private').set('checked', true);
            controller.updateVisibility();
        }

        setTimeout(function () {
            // For some reason, unless we re-get the node instance here,
            // getY() always returns 0.
            var node = Y.one('#classdocs #' + hash);
            win.scrollTo(0, node.getY() - 70);
        }, 1);
    }
};

controller.updateVisibility = function () {
    contentNode.toggleClass('hide-inherited',
            !Y.one('#api-show-inherited').get('checked'));

    contentNode.toggleClass('show-protected',
            Y.one('#api-show-protected').get('checked'));

    contentNode.toggleClass('show-private',
            Y.one('#api-show-private').get('checked'));

    controller.checkVisibility();
};

// -- Event Handlers -----------------------------------------------------------
controller.onLinkClick = function (e) {
    // Allow the native behavior on middle/right-click, or when Ctrl or Command
    // are pressed.
    if (e.button !== 1 || e.ctrlKey || e.metaKey) { return; }

    // Opera currently has bugs when using both HTML5 history and hashchange
    // events. It gets the legacy fallback behavior until we can properly debug
    // it.
    if (Y.UA.opera) { return; }

    var path       = controller.removeRoot(e.currentTarget.get('href')),
        pathNoHash = path.replace(/#.*$/, '');

    if (pathNoHash === controller.getPath()) {
        // Nothing to do.
        return;
    }

    if (controller.hasRoute(pathNoHash)) {
        e.preventDefault();

        controller.save(path);

        // Scroll to the top of the page. The timeout ensures that the scroll
        // happens after navigation begins, so that the current scroll position
        // will be restored if the user clicks the back button.
        setTimeout(function () {
            Y.config.win.scroll(0, 0);
        }, 1);
    }
};

controller.onOptionClick = function (e) {
    controller.updateVisibility();
};

controller.onTabSelectionChange = function (e) {
    var tab   = e.newVal,
        tabId = tab.get('contentBox').getAttribute('href').substring(1);

    selectedTab = tab;

    // If switching from a previous tab (i.e., this is not the default tab),
    // replace the history entry with a hash URL that will cause this tab to
    // be selected if the user navigates away and then returns using the back
    // or forward buttons.
    if (e.prevVal && localStorage) {
        localStorage.setItem('tab_' + controller.getPath(), tabId);
    }

    controller.checkVisibility(tab);
};

// -- Init ---------------------------------------------------------------------
controller.upgrade();

controller.initClassTabView();
controller.initLineNumbers();
controller.updateVisibility();

Y.one('#api-options').delegate('click', controller.onOptionClick, 'input');

// Only intercept link clicks in HTML5 browsers. Supporting both in-page hash
// navigation and hash-based routing would just be too much of a pain, so legacy
// browsers will have to endure full page refreshes.
if (controller.html5) {
    Y.one('#bd').delegate('click', controller.onLinkClick, 'a');
}

Y.on('hashchange', function (e) {
    controller.updateTabState('hashchange');
}, Y.config.win);

});
