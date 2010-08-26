<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:char-counter:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:char-counter:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	if ((String)request.getAttribute("alloy:char-counter:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

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
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:char-counter:counter") != null) {
	scopedAttributes.put("counter", _counter);
}

if (request.getAttribute("alloy:char-counter:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:char-counter:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:char-counter:input") != null) {
	scopedAttributes.put("input", _input);
}

if (request.getAttribute("alloy:char-counter:maxLength") != null) {
	scopedAttributes.put("maxLength", _maxLength);
}

if (request.getAttribute("alloy:char-counter:afterCounterChange") != null) {
	scopedAttributes.put("afterCounterChange", _afterCounterChange);
}

if (request.getAttribute("alloy:char-counter:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:char-counter:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:char-counter:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:char-counter:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:char-counter:afterInputChange") != null) {
	scopedAttributes.put("afterInputChange", _afterInputChange);
}

if (request.getAttribute("alloy:char-counter:afterMaxLengthChange") != null) {
	scopedAttributes.put("afterMaxLengthChange", _afterMaxLengthChange);
}

if (request.getAttribute("alloy:char-counter:onCounterChange") != null) {
	scopedAttributes.put("onCounterChange", _onCounterChange);
}

if (request.getAttribute("alloy:char-counter:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:char-counter:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:char-counter:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:char-counter:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:char-counter:onInputChange") != null) {
	scopedAttributes.put("onInputChange", _onInputChange);
}

if (request.getAttribute("alloy:char-counter:onMaxLengthChange") != null) {
	scopedAttributes.put("onMaxLengthChange", _onMaxLengthChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes,useMarkup"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>