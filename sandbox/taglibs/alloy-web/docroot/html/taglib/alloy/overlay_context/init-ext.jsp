<%
final String CSS_OVERLAYCONTEXT_HIDDEN = MarkupUtil.getClassName("overlaycontext", "hidden");

final String BOUNDING_BOX_CLASS = StringUtil.merge(new String[] { CSS_OVERLAYCONTEXT_HIDDEN }, StringPool.SPACE);
final String CONTENT_BOX_CLASS = StringUtil.merge(new String[] {  }, StringPool.SPACE);

String _bodyContent = (String)request.getAttribute("alloy:overlay-context:bodyContent");
%>