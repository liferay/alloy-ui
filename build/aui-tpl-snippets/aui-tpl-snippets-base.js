AUI.add('aui-tpl-snippets-base', function(A) {
var Lang = A.Lang,

	AArray = A.Array,

	STR_BLANK = '',
	STR_SPACE = ' ';

A.TplSnippets = {
	getClassName: function(auiCssClass, cssClass) {
		var prefix = STR_SPACE + A.getClassName(STR_BLANK);

		return  AArray(cssClass).join(STR_SPACE) + (auiCssClass ? (prefix + AArray(auiCssClass).join(prefix)) : STR_BLANK);
	}
};

}, '@VERSION@' ,{requires:['aui-template'], skinnable:false});
