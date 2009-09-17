(function () {
	var win = window,
	doc = document,
	winxy = [0, 0],
	$node;

	function styleInt (node, styleName) {
		return parseInt((node.currentStyle || doc.defaultView.getComputedStyle(node, null))[styleName], 10) || 0;
	}

	function equalizeColumns () {
		var maxHeight = 0,
		shave;

		if (win.innerHeight != winxy[0] || win.innerWidth != winxy[1]) {
			($node = $node || $('.aui-row')).each(
				function () {
					maxHeight = 0;

					$(this.childNodes).each(
						function () {
							if (!this.nextSibling) {
								var index = -1,
								childOffsetWidth = 0,
								offset;
				
								while (++index < this.parentNode.childNodes.length) {
									childOffsetWidth += (this.parentNode.childNodes[index].offsetWidth || 0);
								}
				
								offset = this.parentNode.offsetWidth - childOffsetWidth;
				
								if (offset < 0) {
									this.style.marginRight = offset + 'px';
								}
							}
							else {
								return 0;
							}
						}
					).children().each(
						function () {
							this.parentNode.style.zoom = 0;
			
							this.style.height = '1%';
			
							maxHeight = Math.max(maxHeight, this.offsetHeight || 0);
						}
					).each(
						function () {
							shave = styleInt(this, 'paddingTop') + styleInt(this, 'paddingBottom') + styleInt(this, 'borderTopWidth') + styleInt(this, 'borderBottomWidth');
			
							this.style.height = (maxHeight - shave) + 'px';
			
							this.parentNode.style.zoom = 1;
						}
					);
				}
			);
		}
	}

	$(doc).bind(
		'ready',
		equalizeColumns
	);

	$(win).bind(
		'resize',
		equalizeColumns
	);
}());