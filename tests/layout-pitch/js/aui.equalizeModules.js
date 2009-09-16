/*
	A function I wrote to keep columns the same height, fun but perhaps disregardable.
	I think it's cool.
	It doesn't affect the width or position of the columns, it's just an added bonus for height.
*/

(function ($) {
	var doc = document,
	win = window;

	function styleInt (elem, styleName) {
		return parseInt((elem.currentStyle || doc.defaultView.getComputedStyle(elem, null))[styleName], 10) || 0;
	}

	function equalizeModules(elem) {
		var dim = arguments.callee.dim = arguments.callee.dim || [0, 0];

		if (win.innerHeight != dim[0] || win.innerWidth != dim[1]) {
			elem.each(
				function () {
					var maxHeight = 0;

					$(this).children().children('.aui-mod').each(
						function () {
							this.parentNode.style.zoom = 0;

							this.style.height = '1%';

							maxHeight = Math.max(maxHeight, this.offsetHeight || 0);
						}
					).each(
						function () {
							var shave = styleInt(this, 'paddingTop') + styleInt(this, 'paddingBottom') + styleInt(this, 'borderTopWidth') + styleInt(this, 'borderBottomWidth');

							this.style.height = (maxHeight - shave) + 'px';

							this.parentNode.style.zoom = 1;
						}
					);
				}
			);

			dim = [win.innerHeight, win.innerWidth];
		}
	}

	function unequalizeModules(elem) {
		elem.each(
			function () {
				$(this).children().children('.aui-mod').css(
					{
						height: 'auto',
						zoom: 1
					}
				);
			}
		);
	}

	$.fn.auiEqualizeModules = function () {
		var elem = this,
		fn = function() {
			equalizeModules(elem);
		};

		equalizeModules(elem);

		$(win).bind(
			'resize',
			fn
		);
	};

	$.fn.auiUnequalizeModules = function () {
		var elem = this;

		unequalizeModules(elem);

		$(win).unbind(
			'resize'
		);
	};
}(jQuery));