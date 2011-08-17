var Lang = A.Lang,

	AArray = A.Array,

	_SPACE = ' ',
	_EMPTY_STR = '';

A.TplSnippets = {
	getClassName: function(auiCssClass, cssClass) {
		var prefix = _SPACE + A.getClassName(_EMPTY_STR);

		return  A.Array(cssClass).join(_SPACE) + (auiCssClass ? (prefix + A.Array(auiCssClass).join(prefix)) : _EMPTY_STR);
	}
};