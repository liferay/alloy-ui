AUI.add('aui-tpl-snippets-textarea', function(A) {
A.Template.register(
	'textarea',
	[
		'<tpl if="values.label !== undefined">',
			'<label class="{[A.TplSnippets.getClassName(values.auiLabelCssClass, values.labelCssClass)]}" for="{id}" id="{labelId}" name="{labelName}">{label}</label>',
		'</tpl>',
		'<textarea class="{[A.TplSnippets.getClassName(values.auiCssClass, values.cssClass)]}" id="{id}" name="{name}" placeholder="{placeholder}" value="{valueAttr}">{value}</textarea>'
	]
);

}, '@VERSION@' ,{skinnable:false, requires:['aui-tpl-snippets-base']});
