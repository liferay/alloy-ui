<%@ include file="../init.tagf" %>

<%@ attribute name="optionsName" required="true" rtexprvalue="false" type="java.lang.String" %>
<%@ attribute name="dynamicAttributes" required="true" type="java.util.HashMap" %>
<%@ attribute name="tagJspContext" required="true" type="javax.servlet.jsp.JspContext" %>
<%@ attribute name="excludeAttributes" required="false" type="java.lang.String" %>
<%@ attribute name="javaScriptAttributes" required="false" type="java.lang.String" %>

<%@ variable alias="optionsMap" name-from-attribute="optionsName" variable-class="java.util.HashMap" scope="AT_BEGIN" %>

<%
HashMap<String, Object> contextAttributes = _getContextAttributes(tagJspContext);
HashMap<String,Object> optionsMap = new HashMap<String,Object>();

_processAttributes(contextAttributes, optionsMap);

_processAttributes(dynamicAttributes, optionsMap);

jspContext.setAttribute("optionsMap", optionsMap);
%>
<%!
private ArrayList<String> _getAttributeValues(String key) {
	String value = (String)jspContext.getAttribute(key);

	return new ArrayList<String>(Arrays.asList(StringUtil.split(value)));
}

private HashMap<String, Object> _getContextAttributes(
	JspContext tagJspContext) {
	HashMap<String, Object> attributesMap = new HashMap<String, Object>();
	
	Enumeration<String> enu = tagJspContext.getAttributeNamesInScope(
		PageContext.PAGE_SCOPE);
	
	while (enu.hasMoreElements()) {
		String key = enu.nextElement();
		
		attributesMap.put(key, tagJspContext.getAttribute(key));
	}
	
	return attributesMap;
}

private Object _getEscapedAttributeValue(String key, Object rawValue) {
	String simpleClassName = rawValue.getClass().getSimpleName();
	
	ArrayList<String> javaScriptValues =
		_getAttributeValues("javaScriptAttributes");

	if (!javaScriptValues.contains(key)) {
		if (simpleClassName.equals("String")) {
			return (StringPool.APOSTROPHE + rawValue + StringPool.APOSTROPHE);
		}
	}

	return rawValue;
}

private boolean _isEventAttribute(String key) {
	Matcher afterMatcher = _EVENT_AFTER_REGEX.matcher(key);
	Matcher onMatcher = _EVENT_ON_REGEX.matcher(key);

	if (afterMatcher.find() || onMatcher.find()){
		return true;
	}

	return false;
}

private boolean _isValidAttribute(String key) {
	ArrayList<String> excludedValues = _getAttributeValues("excludeAttributes");

	if (excludedValues.contains(key) ||
		key.equals(_DYNAMIC_ATTRIBUTES)) {

		return false;
	}

	return true;
}

private void _processAttributes(HashMap<String, Object> sourceMap,
	HashMap<String, Object> optionsMap) {
	
	HashMap<String, String> afterEventOptionsMap = new HashMap<String,String>();
	HashMap<String, String> onEventOptionsMap = new HashMap<String, String>();
	
	for (String key : sourceMap.keySet()) {
		if (_isValidAttribute(key)) {
			Object value = sourceMap.get(key);
			
			if (value instanceof Map) {
				// new map to be populated by recursive method call and put in
				// the current optionsMap
				HashMap<String, Object> childOptionsMap = 
					new HashMap<String, Object>();
				
				_processAttributes((HashMap)value, childOptionsMap);
				
				optionsMap.put(key, childOptionsMap);
				
				continue;
			}
			
			if (_isEventAttribute(key)) {
				_processEventAttribute(
					key, value.toString(), afterEventOptionsMap,
					onEventOptionsMap);
			}
			else {
				optionsMap.put(key, _getEscapedAttributeValue(key, value));
			}
		}
	}
	
	if (afterEventOptionsMap.size() > 0) {
		optionsMap.put(_AFTER, afterEventOptionsMap);
	}

	if (onEventOptionsMap.size() > 0) {
		optionsMap.put(_ON, onEventOptionsMap);
	}
}

private void _processEventAttribute(
	String key, String value, HashMap afterEventOptionsMap,
	HashMap onEventsOptionsMap) {
	
	String event = StringPool.BLANK;

	if (key.startsWith(_AFTER)) {
		
		event = StringUtil.decapitalize(
			key.replaceFirst(_AFTER, StringPool.BLANK));
		
		afterEventOptionsMap.put(event, value);
	}
	else {
		
		event = StringUtil.decapitalize(
			key.replaceFirst(_ON, StringPool.BLANK));
		
		onEventsOptionsMap.put(event, value);
	}
}

private static final String _AFTER = "after";

private static final String _DYNAMIC_ATTRIBUTES = "dynamicAttributes";

private static final Pattern _EVENT_AFTER_REGEX =
	Pattern.compile("after[A-Z]");

private static final Pattern _EVENT_ON_REGEX =
	Pattern.compile("on[A-Z]");

private static final String _ON = "on";
%>