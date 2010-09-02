<%
final String CSS_CLEAR_FIX = MarkupUtil.getClassName("helper", "clearfix");
final String CSS_COMPONENT = MarkupUtil.getClassName("component");
final String CSS_RATING = MarkupUtil.getClassName("rating");
final String CSS_RATING_CONTENT = MarkupUtil.getClassName("rating", "content");
final String CSS_RATING_EL = MarkupUtil.getClassName("rating", "element");
final String CSS_RATING_EL_ON = MarkupUtil.getClassName("rating", "element", "on");
final String CSS_RATING_LABEL_EL = MarkupUtil.getClassName("rating", "label", "element");
final String CSS_WIDGET = MarkupUtil.getClassName("widget");

final String BOUNDING_BOX_CLASS = StringUtil.merge(new String[] { CSS_WIDGET, CSS_COMPONENT, CSS_RATING }, StringPool.SPACE);
final String CONTENT_BOX_CLASS = StringUtil.merge(new String[] { CSS_RATING_CONTENT, CSS_CLEAR_FIX }, StringPool.SPACE);

String elementTitle = GetterUtil.getString((String)dynamicAttributes.get("elementTitle"), "Rate this {0} stars out of {1}.");
%>