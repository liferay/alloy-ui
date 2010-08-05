<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:live-search:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:live-search:scopedAttributes");

java.lang.String _data = (java.lang.String)request.getAttribute("alloy:live-search:data");
java.lang.Number _delay = (java.lang.Number)request.getAttribute("alloy:live-search:delay");
java.lang.Boolean _destroyed = (java.lang.Boolean)request.getAttribute("alloy:live-search:destroyed");
java.lang.String _hide = (java.lang.String)request.getAttribute("alloy:live-search:hide");
java.lang.String _index = (java.lang.String)request.getAttribute("alloy:live-search:index");
java.lang.Boolean _initialized = (java.lang.Boolean)request.getAttribute("alloy:live-search:initialized");
java.lang.String _input = (java.lang.String)request.getAttribute("alloy:live-search:input");
java.lang.String _matchRegex = (java.lang.String)request.getAttribute("alloy:live-search:matchRegex");
java.lang.String _nodes = (java.lang.String)request.getAttribute("alloy:live-search:nodes");
java.lang.String _show = (java.lang.String)request.getAttribute("alloy:live-search:show");
java.lang.String _afterDataChange = (java.lang.String)request.getAttribute("alloy:live-search:afterDataChange");
java.lang.String _afterDelayChange = (java.lang.String)request.getAttribute("alloy:live-search:afterDelayChange");
java.lang.String _afterDestroy = (java.lang.String)request.getAttribute("alloy:live-search:afterDestroy");
java.lang.String _afterDestroyedChange = (java.lang.String)request.getAttribute("alloy:live-search:afterDestroyedChange");
java.lang.String _afterHideChange = (java.lang.String)request.getAttribute("alloy:live-search:afterHideChange");
java.lang.String _afterIndexChange = (java.lang.String)request.getAttribute("alloy:live-search:afterIndexChange");
java.lang.String _afterInit = (java.lang.String)request.getAttribute("alloy:live-search:afterInit");
java.lang.String _afterInitializedChange = (java.lang.String)request.getAttribute("alloy:live-search:afterInitializedChange");
java.lang.String _afterInputChange = (java.lang.String)request.getAttribute("alloy:live-search:afterInputChange");
java.lang.String _afterMatchRegexChange = (java.lang.String)request.getAttribute("alloy:live-search:afterMatchRegexChange");
java.lang.String _afterNodesChange = (java.lang.String)request.getAttribute("alloy:live-search:afterNodesChange");
java.lang.String _afterShowChange = (java.lang.String)request.getAttribute("alloy:live-search:afterShowChange");
java.lang.String _onDataChange = (java.lang.String)request.getAttribute("alloy:live-search:onDataChange");
java.lang.String _onDelayChange = (java.lang.String)request.getAttribute("alloy:live-search:onDelayChange");
java.lang.String _onDestroy = (java.lang.String)request.getAttribute("alloy:live-search:onDestroy");
java.lang.String _onDestroyedChange = (java.lang.String)request.getAttribute("alloy:live-search:onDestroyedChange");
java.lang.String _onHideChange = (java.lang.String)request.getAttribute("alloy:live-search:onHideChange");
java.lang.String _onIndexChange = (java.lang.String)request.getAttribute("alloy:live-search:onIndexChange");
java.lang.String _onInit = (java.lang.String)request.getAttribute("alloy:live-search:onInit");
java.lang.String _onInitializedChange = (java.lang.String)request.getAttribute("alloy:live-search:onInitializedChange");
java.lang.String _onInputChange = (java.lang.String)request.getAttribute("alloy:live-search:onInputChange");
java.lang.String _onMatchRegexChange = (java.lang.String)request.getAttribute("alloy:live-search:onMatchRegexChange");
java.lang.String _onNodesChange = (java.lang.String)request.getAttribute("alloy:live-search:onNodesChange");
java.lang.String _onShowChange = (java.lang.String)request.getAttribute("alloy:live-search:onShowChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (_data != null) {
	scopedAttributes.put("data", _data);
}

if (_delay != null) {
	scopedAttributes.put("delay", _delay);
}

if (_destroyed != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (_hide != null) {
	scopedAttributes.put("hide", _hide);
}

if (_index != null) {
	scopedAttributes.put("index", _index);
}

if (_initialized != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (_input != null) {
	scopedAttributes.put("input", _input);
}

if (_matchRegex != null) {
	scopedAttributes.put("matchRegex", _matchRegex);
}

if (_nodes != null) {
	scopedAttributes.put("nodes", _nodes);
}

if (_show != null) {
	scopedAttributes.put("show", _show);
}

if (_afterDataChange != null) {
	scopedAttributes.put("afterDataChange", _afterDataChange);
}

if (_afterDelayChange != null) {
	scopedAttributes.put("afterDelayChange", _afterDelayChange);
}

if (_afterDestroy != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (_afterDestroyedChange != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (_afterHideChange != null) {
	scopedAttributes.put("afterHideChange", _afterHideChange);
}

if (_afterIndexChange != null) {
	scopedAttributes.put("afterIndexChange", _afterIndexChange);
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

if (_afterMatchRegexChange != null) {
	scopedAttributes.put("afterMatchRegexChange", _afterMatchRegexChange);
}

if (_afterNodesChange != null) {
	scopedAttributes.put("afterNodesChange", _afterNodesChange);
}

if (_afterShowChange != null) {
	scopedAttributes.put("afterShowChange", _afterShowChange);
}

if (_onDataChange != null) {
	scopedAttributes.put("onDataChange", _onDataChange);
}

if (_onDelayChange != null) {
	scopedAttributes.put("onDelayChange", _onDelayChange);
}

if (_onDestroy != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (_onDestroyedChange != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (_onHideChange != null) {
	scopedAttributes.put("onHideChange", _onHideChange);
}

if (_onIndexChange != null) {
	scopedAttributes.put("onIndexChange", _onIndexChange);
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

if (_onMatchRegexChange != null) {
	scopedAttributes.put("onMatchRegexChange", _onMatchRegexChange);
}

if (_onNodesChange != null) {
	scopedAttributes.put("onNodesChange", _onNodesChange);
}

if (_onShowChange != null) {
	scopedAttributes.put("onShowChange", _onShowChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>