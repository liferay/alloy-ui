<%
final String CSS_BUTTON_ITEM = MarkupUtil.getClassName("buttonitem");
final String CSS_BUTTON_ITEM_CONTENT = MarkupUtil.getClassName("buttonitem", "content");
final String CSS_BUTTON_ITEM_ICON = MarkupUtil.getClassName("buttonitem", "icon");
final String CSS_BUTTON_ITEM_ICON_ONLY = MarkupUtil.getClassName("buttonitem", "icon", "only");
final String CSS_CLEAR_FIX = MarkupUtil.getClassName("helper", "clearfix");
final String CSS_COMPONENT = MarkupUtil.getClassName("component");
final String CSS_CUSTOM_FIELD = MarkupUtil.getClassName("custom", "field");
final String CSS_DATEPICKER = MarkupUtil.getClassName("datepicker");
final String CSS_DATEPICKER_BUTTON_WRAPPER = MarkupUtil.getClassName("datepicker", "button", "wrapper");
final String CSS_DATEPICKER_CONTENT = MarkupUtil.getClassName("datepicker", "content");
final String CSS_DATEPICKER_DAY = MarkupUtil.getClassName("datepicker", "day");
final String CSS_DATEPICKER_DISPLAY = MarkupUtil.getClassName("datepicker", "display");
final String CSS_DATEPICKER_MONTH = MarkupUtil.getClassName("datepicker", "month");
final String CSS_DATEPICKER_SELECT_WRAPPER = MarkupUtil.getClassName("datepicker", "select", "wrapper");
final String CSS_DATEPICKER_YEAR = MarkupUtil.getClassName("datepicker", "year");
final String CSS_ICON = MarkupUtil.getClassName("icon");
final String CSS_ICON_CALENDAR = MarkupUtil.getClassName("icon", "calendar");
final String CSS_STATE_DEFAULT = MarkupUtil.getClassName("state", "default");
final String CSS_WIDGET = MarkupUtil.getClassName("widget");

final String CSS_DATEPICKER_BUTTON_BOUNDING_BOX_CLASS = StringUtil.merge(new String[] { CSS_WIDGET, CSS_COMPONENT, CSS_BUTTON_ITEM, CSS_BUTTON_ITEM_CONTENT, CSS_STATE_DEFAULT, CSS_BUTTON_ITEM_ICON_ONLY }, StringPool.SPACE);
final String CSS_DATEPICKER_BUTTON_ICON_CLASS = StringUtil.merge(new String[] { CSS_BUTTON_ITEM_ICON, CSS_ICON, CSS_ICON_CALENDAR }, StringPool.SPACE);

final String BOUNDING_BOX_CLASS = StringUtil.merge(new String[] { CSS_DATEPICKER, CSS_DATEPICKER_DISPLAY, CSS_CLEAR_FIX }, StringPool.SPACE);
final String CONTENT_BOX_CLASS = StringUtil.merge(new String[] { CSS_DATEPICKER_CONTENT }, StringPool.SPACE);

final String DAY_NODE_CLASS = StringUtil.merge(new String[] { CSS_CUSTOM_FIELD, CSS_DATEPICKER_DAY }, StringPool.SPACE);
final String MONTH_NODE_CLASS = StringUtil.merge(new String[] { CSS_CUSTOM_FIELD, CSS_DATEPICKER_MONTH }, StringPool.SPACE);
final String YEAR_NODE_CLASS = StringUtil.merge(new String[] { CSS_CUSTOM_FIELD, CSS_DATEPICKER_YEAR }, StringPool.SPACE);
%>