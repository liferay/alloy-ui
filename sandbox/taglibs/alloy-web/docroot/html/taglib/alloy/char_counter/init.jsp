<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:char-counter:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:char-counter:scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:date-picker-select:boundingBox");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:date-picker-select:contentBox");
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:date-picker-select:srcNode");

boolean hasBoundingBox = GetterUtil.getBoolean(String.valueOf(_boundingBox));
boolean hasContentBox = GetterUtil.getBoolean(String.valueOf(_contentBox));
boolean hasSrcNode = GetterUtil.getBoolean(String.valueOf(_srcNode));

java.lang.Object _counter = (java.lang.Object)request.getAttribute("alloy:char-counter:counter");
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:char-counter:destroyed"), false);
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:char-counter:initialized"), false);
java.lang.Object _input = (java.lang.Object)request.getAttribute("alloy:char-counter:input");
java.lang.Number _maxLength = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:char-counter:maxLength"), 0);
java.lang.Object _afterCounterChange = (java.lang.Object)request.getAttribute("alloy:char-counter:afterCounterChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:char-counter:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:char-counter:afterDestroyedChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:char-counter:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:char-counter:afterInitializedChange");
java.lang.Object _afterInputChange = (java.lang.Object)request.getAttribute("alloy:char-counter:afterInputChange");
java.lang.Object _afterMaxLengthChange = (java.lang.Object)request.getAttribute("alloy:char-counter:afterMaxLengthChange");
java.lang.Object _onCounterChange = (java.lang.Object)request.getAttribute("alloy:char-counter:onCounterChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:char-counter:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:char-counter:onDestroyedChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:char-counter:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:char-counter:onInitializedChange");
java.lang.Object _onInputChange = (java.lang.Object)request.getAttribute("alloy:char-counter:onInputChange");
java.lang.Object _onMaxLengthChange = (java.lang.Object)request.getAttribute("alloy:char-counter:onMaxLengthChange");

String uniqueId = StringPool.BLANK;

boolean useMarkup = GetterUtil.getBoolean(String.valueOf(dynamicAttributes.get("useMarkup")));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	String prefix = StringPool.POUND.concat(uniqueId);

	if (!hasBoundingBox) {
		_boundingBox = prefix.concat("BoundingBox");

		options.put("boundingBox", _boundingBox);
	}

	if (!hasSrcNode && !hasContentBox) {
		_srcNode = prefix.concat("SrcNode");

		options.put("srcNode", _srcNode);
	}

	if (!hasSrcNode && hasContentBox) {
		_contentBox = prefix.concat("ContentBox");

		options.put("contentBox", _contentBox);
	}
}
%>

<%@ include file="init-ext.jsp" %>

<%
_updateOptions(options, "counter", _counter);
_updateOptions(options, "destroyed", _destroyed);
_updateOptions(options, "initialized", _initialized);
_updateOptions(options, "input", _input);
_updateOptions(options, "maxLength", _maxLength);
_updateOptions(options, "afterCounterChange", _afterCounterChange);
_updateOptions(options, "afterDestroy", _afterDestroy);
_updateOptions(options, "afterDestroyedChange", _afterDestroyedChange);
_updateOptions(options, "afterInit", _afterInit);
_updateOptions(options, "afterInitializedChange", _afterInitializedChange);
_updateOptions(options, "afterInputChange", _afterInputChange);
_updateOptions(options, "afterMaxLengthChange", _afterMaxLengthChange);
_updateOptions(options, "onCounterChange", _onCounterChange);
_updateOptions(options, "onDestroy", _onDestroy);
_updateOptions(options, "onDestroyedChange", _onDestroyedChange);
_updateOptions(options, "onInit", _onInit);
_updateOptions(options, "onInitializedChange", _onInitializedChange);
_updateOptions(options, "onInputChange", _onInputChange);
_updateOptions(options, "onMaxLengthChange", _onMaxLengthChange);
%>