AUI.add('aui-tpl-snippets-base', function(A) {
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

}, '@VERSION@' ,{skinnable:false, requires:['aui-template']});
AUI.add('aui-tpl-snippets-select', function(A) {
A.Template.register(
	'select',
	[
		'<select class="{[A.TplSnippets.getClassName(values.auiCssClass, values.cssClass)]}" name="{name}">',
				'<tpl for="options">',
					'<option value="{value}">{label}</option>',
				'</tpl>',
		'</select>'
	]
);

}, '@VERSION@' ,{skinnable:false, requires:['aui-tpl-snippets-base']});


AUI.add('aui-tpl-snippets', function(A){}, '@VERSION@' ,{use:['aui-tpl-snippets-base','aui-tpl-snippets-select'], skinnable:false});

