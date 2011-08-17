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