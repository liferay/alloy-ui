<%
final String CSS_CLEAR_FIX = MarkupUtil.getClassName("helper", "clearfix");
final String CSS_COMPONENT = MarkupUtil.getClassName("component");
final String CSS_RATING = MarkupUtil.getClassName("rating");
final String CSS_RATING_CONTENT = MarkupUtil.getClassName("rating", "content");
final String CSS_RATING_EL = MarkupUtil.getClassName("rating", "element");
final String CSS_RATING_EL_ON = MarkupUtil.getClassName("rating", "element", "on");
final String CSS_RATING_EL_OFF = MarkupUtil.getClassName("rating", "element", "off");
final String CSS_RATING_LABEL_EL = MarkupUtil.getClassName("rating", "label", "element");
final String CSS_RATING_THUMB_DOWN = MarkupUtil.getClassName("rating", "thumb", "down");
final String CSS_RATING_THUMB_UP = MarkupUtil.getClassName("rating", "thumb", "up");
final String CSS_THUMBRATING = MarkupUtil.getClassName("thumbrating");
final String CSS_THUMBRATING_CONTENT = MarkupUtil.getClassName("thumbrating", "content");
final String CSS_WIDGET = MarkupUtil.getClassName("widget");

final String BOUNDING_BOX_CLASS = StringUtil.merge(new String[] { CSS_WIDGET, CSS_COMPONENT, CSS_RATING, CSS_THUMBRATING }, StringPool.SPACE);
final String CONTENT_BOX_CLASS = StringUtil.merge(new String[] { CSS_RATING_CONTENT, CSS_THUMBRATING_CONTENT, CSS_CLEAR_FIX }, StringPool.SPACE);

final String RATING_EL_DOWN_CLASS = StringUtil.merge(new String[] {CSS_RATING_EL, CSS_RATING_THUMB_DOWN, CSS_RATING_EL_OFF}, StringPool.SPACE);
final String RATING_EL_UP_CLASS = StringUtil.merge(new String[] {CSS_RATING_EL, CSS_RATING_THUMB_UP, CSS_RATING_EL_OFF}, StringPool.SPACE);

String elementTitle = GetterUtil.getString((String)dynamicAttributes.get("elementTitle"), "Rate this {0}.");
%>