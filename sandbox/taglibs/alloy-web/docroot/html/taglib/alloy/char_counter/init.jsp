<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:char-counter:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:char-counter:scopedAttributes");

java.lang.String _counter = (java.lang.String)request.getAttribute("alloy:char-counter:counter");
java.lang.Boolean _destroyed = (java.lang.Boolean)request.getAttribute("alloy:char-counter:destroyed");
java.lang.Boolean _initialized = (java.lang.Boolean)request.getAttribute("alloy:char-counter:initialized");
java.lang.String _input = (java.lang.String)request.getAttribute("alloy:char-counter:input");
java.lang.Number _maxLength = (java.lang.Number)request.getAttribute("alloy:char-counter:maxLength");
java.lang.String _afterCounterChange = (java.lang.String)request.getAttribute("alloy:char-counter:afterCounterChange");
java.lang.String _afterDestroy = (java.lang.String)request.getAttribute("alloy:char-counter:afterDestroy");
java.lang.String _afterDestroyedChange = (java.lang.String)request.getAttribute("alloy:char-counter:afterDestroyedChange");
java.lang.String _afterInit = (java.lang.String)request.getAttribute("alloy:char-counter:afterInit");
java.lang.String _afterInitializedChange = (java.lang.String)request.getAttribute("alloy:char-counter:afterInitializedChange");
java.lang.String _afterInputChange = (java.lang.String)request.getAttribute("alloy:char-counter:afterInputChange");
java.lang.String _afterMaxLengthChange = (java.lang.String)request.getAttribute("alloy:char-counter:afterMaxLengthChange");
java.lang.String _onCounterChange = (java.lang.String)request.getAttribute("alloy:char-counter:onCounterChange");
java.lang.String _onDestroy = (java.lang.String)request.getAttribute("alloy:char-counter:onDestroy");
java.lang.String _onDestroyedChange = (java.lang.String)request.getAttribute("alloy:char-counter:onDestroyedChange");
java.lang.String _onInit = (java.lang.String)request.getAttribute("alloy:char-counter:onInit");
java.lang.String _onInitializedChange = (java.lang.String)request.getAttribute("alloy:char-counter:onInitializedChange");
java.lang.String _onInputChange = (java.lang.String)request.getAttribute("alloy:char-counter:onInputChange");
java.lang.String _onMaxLengthChange = (java.lang.String)request.getAttribute("alloy:char-counter:onMaxLengthChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (_counter != null) {
	scopedAttributes.put("counter", _counter);
}

if (_destroyed != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (_initialized != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (_input != null) {
	scopedAttributes.put("input", _input);
}

if (_maxLength != null) {
	scopedAttributes.put("maxLength", _maxLength);
}

if (_afterCounterChange != null) {
	scopedAttributes.put("afterCounterChange", _afterCounterChange);
}

if (_afterDestroy != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (_afterDestroyedChange != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (_afterInit != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (_afterInitializedChange != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (_afterInputChange != null) {
	scopedAttributes.put("afterInputChange", _afterInputChange);
}

if (_afterMaxLengthChange != null) {
	scopedAttributes.put("afterMaxLengthChange", _afterMaxLengthChange);
}

if (_onCounterChange != null) {
	scopedAttributes.put("onCounterChange", _onCounterChange);
}

if (_onDestroy != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (_onDestroyedChange != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (_onInit != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (_onInitializedChange != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (_onInputChange != null) {
	scopedAttributes.put("onInputChange", _onInputChange);
}

if (_onMaxLengthChange != null) {
	scopedAttributes.put("onMaxLengthChange", _onMaxLengthChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>