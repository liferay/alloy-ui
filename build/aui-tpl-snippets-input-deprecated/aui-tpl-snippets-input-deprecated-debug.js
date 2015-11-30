YUI.add('aui-tpl-snippets-input-deprecated', function (A, NAME) {

A.Template.register(
    'input', [
  '<tpl if="values.label !== undefined">',
   '<label class="{[A.TplSnippets.getClassName(values.auiLabelCssClass, values.labelCssClass)]}" for="{id}" id="{labelId}" name="{labelName}" style="{labelStyle}">{label}</label>',
  '</tpl>',
  '<input autocomplete="{autocomplete}" class="{[A.TplSnippets.getClassName(values.auiCssClass, values.cssClass)]}" <tpl if="values.disabled">disabled="disabled"</tpl> id="{id}" name="{name}" placeholder="{placeholder}" size="{size}" style="{style}" type="{type}" value="{value}" />'
 ]
);


}, '3.0.1', {"requires": ["aui-tpl-snippets-base-deprecated"]});
