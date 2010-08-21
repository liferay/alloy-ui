<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:char-counter:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:char-counter:scopedAttributes");

String uniqueId = StringPool.BLANK;
String srcNode = StringPool.BLANK;

boolean useMarkup = GetterUtil.getBoolean((java.io.Serializable)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId));
}

java.lang.String _counter = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:char-counter:counter"));
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:char-counter:destroyed"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:char-counter:initialized"));
java.lang.String _input = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:char-counter:input"));
java.lang.Number _maxLength = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:char-counter:maxLength"));
java.lang.String _afterCounterChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:char-counter:afterCounterChange"));
java.lang.String _afterDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:char-counter:afterDestroy"));
java.lang.String _afterDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:char-counter:afterDestroyedChange"));
java.lang.String _afterInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:char-counter:afterInit"));
java.lang.String _afterInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:char-counter:afterInitializedChange"));
java.lang.String _afterInputChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:char-counter:afterInputChange"));
java.lang.String _afterMaxLengthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:char-counter:afterMaxLengthChange"));
java.lang.String _onCounterChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:char-counter:onCounterChange"));
java.lang.String _onDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:char-counter:onDestroy"));
java.lang.String _onDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:char-counter:onDestroyedChange"));
java.lang.String _onInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:char-counter:onInit"));
java.lang.String _onInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:char-counter:onInitializedChange"));
java.lang.String _onInputChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:char-counter:onInputChange"));
java.lang.String _onMaxLengthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:char-counter:onMaxLengthChange"));
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