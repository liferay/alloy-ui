YUI.add('aui-tpl-snippets-select-deprecated', function (A, NAME) {

A.Template.register(
    'select', [
  '<tpl if="values.label !== undefined">',
   '<label class="{[A.TplSnippets.getClassName(values.auiLabelCssClass, values.labelCssClass)]}" for="{id}" id="{labelId}" name="{labelName}" style="{labelStyle}">{label}</label>',
  '</tpl>',
  '<select class="{[A.TplSnippets.getClassName(values.auiCssClass, values.cssClass)]}" <tpl if="values.disabled">disabled="disabled"</tpl> id="{id}" name="{name}" style="{style}">',
    '<tpl for="options">',
     '<option value="{value}">{label}</option>',
    '</tpl>',
  '</select>'
 ]
);


}, '3.0.1', {"requires": ["aui-tpl-snippets-base-deprecated"]});
