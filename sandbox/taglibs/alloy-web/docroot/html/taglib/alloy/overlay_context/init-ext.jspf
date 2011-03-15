<%@page import="javax.servlet.jsp.tagext.BodyContent"%>

<%
final String CSS_OVERLAYCONTEXT_HIDDEN = MarkupUtil.getClassName("overlaycontext", "hidden");

final String BOUNDING_BOX_CLASS = StringUtil.merge(new String[] { CSS_OVERLAYCONTEXT_HIDDEN }, StringPool.SPACE);
final String CONTENT_BOX_CLASS = StringUtil.merge(new String[] {  }, StringPool.SPACE);

BodyContent _bodyContent = (BodyContent)request.getAttribute("alloy:overlay-context:bodyContent");

String bodyContentString = StringPool.BLANK;

if (_bodyContent != null) {
	bodyContentString = _bodyContent.getString();
}
%>