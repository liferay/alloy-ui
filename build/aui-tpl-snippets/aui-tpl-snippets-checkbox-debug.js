AUI.add('aui-tpl-snippets-checkbox', function(A) {
A.Template.register(
	'checkbox',
	[
		'<input class="{[A.TplSnippets.getClassName(values.auiCssClass, values.cssClass)]}" <tpl if="values.disabled">disabled="disabled"</tpl> id="{id}" name="{name}" placeholder="{placeholder}" size="{size}" style="{style}" type="checkbox" value="{value}" />',
		'<tpl if="values.label !== undefined">',
			'<label class="{[A.TplSnippets.getClassName(values.auiLabelCssClass, values.labelCssClass)]}" for="{id}" id="{labelId}" name="{labelName}" style="{labelStyle}">{label}</label>',
		'</tpl>'
	]
);

}, '@VERSION@' ,{requires:['aui-tpl-snippets-base'], skinnable:false});
