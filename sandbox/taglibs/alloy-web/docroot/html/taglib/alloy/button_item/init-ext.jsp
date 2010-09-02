<%
String _iconTypeClass = StringPool.BLANK;

if (Validator.isNull(_label) && Validator.isNotNull(_icon)) {
	_iconTypeClass = "aui-buttonitem-icon-only";
}
else if (Validator.isNotNull(_label) && Validator.isNull(_icon)) {
	_iconTypeClass = "aui-buttonitem-label-only";
}

final String CSS_BUTTON_ITEM = MarkupUtil.getClassName("buttonitem");
final String CSS_BUTTON_ITEM_CONTENT = MarkupUtil.getClassName("buttonitem", "content");
final String CSS_BUTTON_ITEM_LABEL  = MarkupUtil.getClassName("buttonitem", "label");
final String CSS_BUTTON_ITEM_ICON = MarkupUtil.getClassName("buttonitem", "icon");
final String CSS_BUTTON_ITEM_ICON_TYPE  = _iconTypeClass;
final String CSS_COMPONENT = MarkupUtil.getClassName("component");
final String CSS_CUSTOM_ICON = MarkupUtil.getClassName("icon", _icon);
final String CSS_ICON = MarkupUtil.getClassName("icon");
final String CSS_STATE_DEFAULT = MarkupUtil.getClassName("state", "default");
final String CSS_TOOLBAR_ITEM = MarkupUtil.getClassName("toolbar", "item");
final String CSS_WIDGET = MarkupUtil.getClassName("widget");

String BOUNDING_BOX_CLASS = StringUtil.merge(new String[] { CSS_WIDGET, CSS_COMPONENT, CSS_BUTTON_ITEM, CSS_BUTTON_ITEM_CONTENT, CSS_STATE_DEFAULT, CSS_BUTTON_ITEM_ICON_TYPE }, StringPool.SPACE);

if (Validator.isNotNull(_cssClass)) {
	BOUNDING_BOX_CLASS = StringUtil.merge(new String[] { BOUNDING_BOX_CLASS, (String)_cssClass }, StringPool.SPACE);
}
%>