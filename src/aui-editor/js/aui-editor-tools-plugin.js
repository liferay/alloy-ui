var Lang = A.Lang,

	JUSTIFY = 'justify',

	BLOCK_TAGS = {
		div: true,
		h1: true,
		h2: true,
		h3: true,
		h4: true,
		h5: true,
		h6: true,
		p: true
	},

	IGNORE_TAGS = {
		br: true
	},

	ITEM_TAGS = {
		li: true
	},

	TPL_JUSTIFY = '<div style="text-align: {0};">{1}</div>';

function findInsert(item) {
	var found = null;

	var childNodes = item.get('childNodes');

	childNodes.some(
		function(item, index, collection) {
			if (item.get('innerHTML') == '{0}') {
				item.html('');

				found = item;

				return true;
			}

			return findInsert(item);
		}
	);

	return found;
}

var EditorTools = {};

A.mix(
	A.Plugin.ExecCommand.COMMANDS,
	{
		justify: function(cmd, val) {
			var instance = this;

			var host = instance.get('host');
			var frame = host.getInstance();

			var selection = new frame.Selection();
			var items = selection.getSelected();
			var insertHtml = false;

			if (selection.isCollapsed || !items.size()) {
				var anchorTextNode = selection.anchorTextNode;

				items = [anchorTextNode];

				insertHtml = true;
			}

			items.each(
				function(item, index, collection) {
					var tagName = item.get('tagName');

					if (tagName) {
						tagName = tagName.toLowerCase();
					}

					if (IGNORE_TAGS[tagName]) {
						return;
					}

					if (tagName == 'font') {
						var tempNode = item.get('parentNode');

						if (!tempNode.test('body')) {
							item = tempNode;

							tagName = item.get('tagName').toLowerCase();
						}
					}

					if (!item.test('body') && item.getComputedStyle('textAlign') == val) {
						return;
					}

					var parent = item.get('parentNode');
					var wrapper;

					if (BLOCK_TAGS[tagName] || item.getComputedStyle('display') == 'block') {
						wrapper = item;
					}
					else if (!parent.get('childNodes').item(1) || ITEM_TAGS[tagName]) {
						tagName = parent.get('tagName').toLowerCase();

						if (BLOCK_TAGS[tagName] || parent.getComputedStyle('display') == 'block') {
							wrapper = parent;
						}
					}
					else {
						if (insertHtml) {
							host.execCommand('inserthtml', Lang.sub(TPL_JUSTIFY, [val, frame.Selection.CURSOR]));

							selection.focusCursor(true, true);

							return;
						}
						else {
							wrapper = A.Node.create(Lang.sub(TPL_JUSTIFY, [val, '']));

							parent.insert(wrapper, item);

							wrapper.append(item);
						}
					}

					if (wrapper) {
						wrapper.setStyle('textAlign', val);
					}
				}
			);
		},

		justifycenter: function() {
			var instance = this;

			return instance.get('host').execCommand(JUSTIFY, 'center');
		},

		justifyleft: function() {
			var instance = this;

			return instance.get('host').execCommand(JUSTIFY, 'left');
		},

		justifyright: function() {
			var instance = this;

			return instance.get('host').execCommand(JUSTIFY, 'right');
		},

		subscript: function() {
			var instance = this;

			return instance.get('host').execCommand('wrap', 'sub');
		},

		superscript: function() {
			var instance = this;

			return instance.get('host').execCommand('wrap', 'sup');
		},

		wraphtml: function(cmd, val) {
			var instance = this;

			var host = instance.get('host');
			var frame = host.getInstance();

			var selection = new frame.Selection();
			var items = selection.getSelected();

			if (!selection.isCollapsed && items.size()) {
				items.each(
					function(item, index, collection) {
						var parent = item.ancestor();

						var wrapper = A.Node.create(val);

						parent.insert(wrapper, item);

						if (wrapper.html() != '') {
							if (wrapper.html() == '{0}') {
								wrapper.html('');
							}
							else {
								var insert = findInsert(wrapper);

								if (insert) {
									wrapper = insert;
								}
							}
						}

						wrapper.append(item);
					}
				);
			}
			else {
				host.execCommand('inserthtml', Lang.sub(val, [frame.Selection.CURSOR]));

				if (val.indexOf('{0}') != -1) {
					selection.focusCursor(true, true);
				}
			}
		}
	}
);

A.Plugin.EditorTools = EditorTools;