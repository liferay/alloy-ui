AUI.add('aui-editor-tools-plugin', function(A) {
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

	TPL_JUSTIFY = '<div style="text-align: {0};">{1}</div>';

var EditorTools = {};

A.namespace('Plugin');

A.mix(
	A.Plugin.ExecCommand.COMMANDS,
	{
		justify: function(cmd, val) {
			var instance = this;

			var host = instance.get('host'),
				frame = host.getInstance();

			var selection = new frame.Selection(),
				items = selection.getSelected(),
				insertHtml = false;

			if (selection.isCollapsed || !items.size()) {
				var anchorTextNode = selection.anchorTextNode;

				items = [anchorTextNode];

				insertHtml = true;
			}

			A.each(
				items,
				function(node) {
					var tagName = node.get('tagName'),
						parent = node.ancestor(),
						wrapper = null;

					if (tagName) {
						tagName = tagName.toLowerCase();
					}

					if (!node.test('body') && node.getComputedStyle('textAlign') == val) {
						return;
					}

					if (BLOCK_TAGS[tagName] || node.getComputedStyle('display') == 'block') {
						wrapper = node;
					}
					else if (!parent.get('childNodes').item(1)) {
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

							parent.insert(wrapper, node);

							wrapper.append(node);
						}
					}

					wrapper.setStyle('textAlign', val);
				}
			);
		},

		justifycenter: function() {
			var instance = this;

			var host = instance.get('host');

			return host.execCommand(JUSTIFY, 'center');
		},

		justifyleft: function() {
			var instance = this;

			var host = instance.get('host');

			return host.execCommand(JUSTIFY, 'left');
		},

		justifyright: function() {
			var instance = this;

			var host = instance.get('host');

			return host.execCommand(JUSTIFY, 'right');
		},

		subscript: function() {
			var instance = this;

			var host = instance.get('host');

			return host.execCommand('wrap', 'sub');
		},

		superscript: function() {
			var instance = this;

			var host = instance.get('host');

			return host.execCommand('wrap', 'sup');
		},

		wraphtml: function(cmd, val) {
			var instance = this;

			var host = instance.get('host'),
				frame = host.getInstance();

			var selection = new frame.Selection(),
				items = selection.getSelected();

			if (!selection.isCollapsed && items.size()) {
				items.each(
					function(node) {
						var parent = node.ancestor();

						var wrapper = A.Node.create(val);

						if (wrapper.html() != '') {
							if (wrapper.html() == '{0}') {
								wrapper.html('');
							}
							else {
								function findInsert(node) {
									var found = null;
									var childNodes = node.get('childNodes');

									childNodes.some(
										function (node) {
											if (node.get('innerHTML') == '{0}') {
												found.html('');

												found = node;

												return true;
											}

											return findInsert(node);
										}
									);

									if (found) {
										wrapper = found;

										return true;
									}

									return false;
								}

								findInsert(wrapper);
							}
						}

						parent.insert(wrapper, node);

						wrapper.append(node);
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

}, '@VERSION@' ,{requires:['aui-base','editor-base']});
