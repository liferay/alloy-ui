AUI({
	insertBefore: 'site_styles'
}).use('aui-tabs', function(A) {
	var classdocs = A.one('#classdocs'),
		tabviewIndexTable = {};
	if (classdocs) {
		if (classdocs.all('li').size()) {
			var tabview = new A.TabView({ contentBox: classdocs, contentNode: '#api-class-tabview-panel', listNode: '#api-class-tabview-list' });
			tabview.render();
			classdocs.all('li a').each(function (item, index) {
				var hash = item.get(['hash']);
					type = hash.substring(1);
				if (!tabviewIndexTable[type]) {
					tabviewIndexTable[type] = index;
				}
			});
			A.all('.sidebox.on-page').each(function (item, index) {
				var children = item.all('li a');
				children.each(function (cItem, cIndex) {
					return function () {
						var handleClick = function (e) {
							var node = A.one(this),
								hash = node.get(['hash']),
								hashValue = hash.substring(1).split('_'),
								type = hashValue.shift(),
								ogKey = hashValue.join('_'); // in case the hash had other underscores
							if (tabviewIndexTable[type] > -1 && tabviewIndexTable[type] !== currentTab) {
								currentTab = tabviewIndexTable[type];
								tabview.selectChild(tabviewIndexTable[type]);
							}
						};
						A.on('click', handleClick, cItem);
					}();
				});
			});
		}
	}
});
