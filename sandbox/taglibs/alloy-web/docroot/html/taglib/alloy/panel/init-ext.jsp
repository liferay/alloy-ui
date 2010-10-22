<%@page import="com.liferay.portal.kernel.util.StringPool"%>
<%@page import="javax.servlet.jsp.tagext.BodyContent"%>

<%
final String CSS_CLEAR_FIX = MarkupUtil.getClassName("helper", "clearfix");
final String CSS_COMPONENT = MarkupUtil.getClassName("component");
final String CSS_PANEL = MarkupUtil.getClassName("panel");
final String CSS_PANEL_CONTENT = MarkupUtil.getClassName("panel", "content");
final String CSS_PANEL_BD = MarkupUtil.getClassName("panel", "bd");
final String CSS_PANEL_HD = MarkupUtil.getClassName("panel", "hd");
final String CSS_PANEL_HD_TEXT = MarkupUtil.getClassName("panel", "hd", "text");
final String CSS_PANEL_ICONS = MarkupUtil.getClassName("panel", "icons");
final String CSS_TOOLBAR = MarkupUtil.getClassName("toolbar");
final String CSS_TOOLBAR_CONTENT = MarkupUtil.getClassName("toolbar", "content");
final String CSS_TOOLBAR_HORIZONTAL = MarkupUtil.getClassName("toolbar", "horizontal");
final String CSS_WIDGET = MarkupUtil.getClassName("widget");
final String CSS_WIDGET_BD = MarkupUtil.getClassName("widget", "bd");
final String CSS_WIDGET_HD = MarkupUtil.getClassName("widget", "hd");
final String CSS_WIDGET_STDMOD = MarkupUtil.getClassName("widget", "stdmod");

final String BOUNDING_BOX_CLASS = StringUtil.merge(new String[] { CSS_COMPONENT, CSS_PANEL, CSS_WIDGET }, StringPool.SPACE);
final String CONTENT_BOX_CLASS = StringUtil.merge(new String[] { CSS_PANEL_CONTENT, CSS_WIDGET_STDMOD }, StringPool.SPACE);

final String BODY_CLASS = StringUtil.merge(new String[] { CSS_WIDGET_BD, CSS_PANEL_BD }, StringPool.SPACE);
final String HEADER_CLASS = StringUtil.merge(new String[] { CSS_WIDGET_HD, CSS_CLEAR_FIX, CSS_PANEL_HD }, StringPool.SPACE);
final String TOOLBAR_CLASS = StringUtil.merge(new String[] { CSS_WIDGET, CSS_COMPONENT, CSS_TOOLBAR, CSS_TOOLBAR_HORIZONTAL, CSS_PANEL_ICONS }, StringPool.SPACE);

BodyContent _bodyContent = (BodyContent)request.getAttribute("alloy:panel:bodyContent");

String bodyContentString = StringPool.BLANK;

if (_bodyContent != null) {
	bodyContentString = _bodyContent.getString();
}
%>