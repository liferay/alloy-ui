<%
final String CSS_COMPONENT = MarkupUtil.getClassName("component");
final String CSS_TREEVIEW = MarkupUtil.getClassName("toolbar");
final String CSS_TOOLBAR_CONTENT = MarkupUtil.getClassName("toolbar", "content");
final String CSS_WIDGET = MarkupUtil.getClassName("widget");

final String BOUNDING_BOX_CLASS = StringUtil.merge(new String[] { CSS_WIDGET, CSS_COMPONENT }, StringPool.SPACE);
%>