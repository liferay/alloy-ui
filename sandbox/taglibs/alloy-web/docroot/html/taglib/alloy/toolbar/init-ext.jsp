<%
final String CSS_COMPONENT = MarkupUtil.getClassName("component");
final String CSS_TOOLBAR = MarkupUtil.getClassName("toolbar");
final String CSS_TOOLBAR_CONTENT = MarkupUtil.getClassName("toolbar", "content");
final String CSS_TOOLBAR_ORIENTATION = MarkupUtil.getClassName("toolbar", GetterUtil.getString((String)_orientation, "horizontal"));
final String CSS_WIDGET = MarkupUtil.getClassName("widget");

final String BOUNDING_BOX_CLASS = StringUtil.merge(new String[] { CSS_WIDGET, CSS_COMPONENT, CSS_TOOLBAR, CSS_TOOLBAR_ORIENTATION }, StringPool.SPACE);

String bodyContent = (String)request.getAttribute("alloy:toolbar:bodyContent");
%>