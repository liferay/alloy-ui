<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:live-search:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:live-search:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	if ((String)request.getAttribute("alloy:live-search:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

java.lang.Object _data = (java.lang.Object)request.getAttribute("alloy:live-search:data");
java.lang.Number _delay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:live-search:delay"), 250);
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:live-search:destroyed"), false);
java.lang.Object _hide = (java.lang.Object)request.getAttribute("alloy:live-search:hide");
java.lang.Object _index = (java.lang.Object)request.getAttribute("alloy:live-search:index");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:live-search:initialized"), false);
java.lang.Object _input = (java.lang.Object)request.getAttribute("alloy:live-search:input");
java.lang.Object _matchRegex = (java.lang.Object)request.getAttribute("alloy:live-search:matchRegex");
java.lang.Object _nodes = (java.lang.Object)request.getAttribute("alloy:live-search:nodes");
java.lang.Object _show = (java.lang.Object)request.getAttribute("alloy:live-search:show");
java.lang.Object _afterDataChange = (java.lang.Object)request.getAttribute("alloy:live-search:afterDataChange");
java.lang.Object _afterDelayChange = (java.lang.Object)request.getAttribute("alloy:live-search:afterDelayChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:live-search:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:live-search:afterDestroyedChange");
java.lang.Object _afterHideChange = (java.lang.Object)request.getAttribute("alloy:live-search:afterHideChange");
java.lang.Object _afterIndexChange = (java.lang.Object)request.getAttribute("alloy:live-search:afterIndexChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:live-search:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:live-search:afterInitializedChange");
java.lang.Object _afterInputChange = (java.lang.Object)request.getAttribute("alloy:live-search:afterInputChange");
java.lang.Object _afterMatchRegexChange = (java.lang.Object)request.getAttribute("alloy:live-search:afterMatchRegexChange");
java.lang.Object _afterNodesChange = (java.lang.Object)request.getAttribute("alloy:live-search:afterNodesChange");
java.lang.Object _afterShowChange = (java.lang.Object)request.getAttribute("alloy:live-search:afterShowChange");
java.lang.Object _onDataChange = (java.lang.Object)request.getAttribute("alloy:live-search:onDataChange");
java.lang.Object _onDelayChange = (java.lang.Object)request.getAttribute("alloy:live-search:onDelayChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:live-search:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:live-search:onDestroyedChange");
java.lang.Object _onHideChange = (java.lang.Object)request.getAttribute("alloy:live-search:onHideChange");
java.lang.Object _onIndexChange = (java.lang.Object)request.getAttribute("alloy:live-search:onIndexChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:live-search:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:live-search:onInitializedChange");
java.lang.Object _onInputChange = (java.lang.Object)request.getAttribute("alloy:live-search:onInputChange");
java.lang.Object _onMatchRegexChange = (java.lang.Object)request.getAttribute("alloy:live-search:onMatchRegexChange");
java.lang.Object _onNodesChange = (java.lang.Object)request.getAttribute("alloy:live-search:onNodesChange");
java.lang.Object _onShowChange = (java.lang.Object)request.getAttribute("alloy:live-search:onShowChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:live-search:data") != null) {
	scopedAttributes.put("data", _data);
}

if (request.getAttribute("alloy:live-search:delay") != null) {
	scopedAttributes.put("delay", _delay);
}

if (request.getAttribute("alloy:live-search:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:live-search:hide") != null) {
	scopedAttributes.put("hide", _hide);
}

if (request.getAttribute("alloy:live-search:index") != null) {
	scopedAttributes.put("index", _index);
}

if (request.getAttribute("alloy:live-search:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:live-search:input") != null) {
	scopedAttributes.put("input", _input);
}

if (request.getAttribute("alloy:live-search:matchRegex") != null) {
	scopedAttributes.put("matchRegex", _matchRegex);
}

if (request.getAttribute("alloy:live-search:nodes") != null) {
	scopedAttributes.put("nodes", _nodes);
}

if (request.getAttribute("alloy:live-search:show") != null) {
	scopedAttributes.put("show", _show);
}

if (request.getAttribute("alloy:live-search:afterDataChange") != null) {
	scopedAttributes.put("afterDataChange", _afterDataChange);
}

if (request.getAttribute("alloy:live-search:afterDelayChange") != null) {
	scopedAttributes.put("afterDelayChange", _afterDelayChange);
}

if (request.getAttribute("alloy:live-search:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:live-search:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:live-search:afterHideChange") != null) {
	scopedAttributes.put("afterHideChange", _afterHideChange);
}

if (request.getAttribute("alloy:live-search:afterIndexChange") != null) {
	scopedAttributes.put("afterIndexChange", _afterIndexChange);
}

if (request.getAttribute("alloy:live-search:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:live-search:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:live-search:afterInputChange") != null) {
	scopedAttributes.put("afterInputChange", _afterInputChange);
}

if (request.getAttribute("alloy:live-search:afterMatchRegexChange") != null) {
	scopedAttributes.put("afterMatchRegexChange", _afterMatchRegexChange);
}

if (request.getAttribute("alloy:live-search:afterNodesChange") != null) {
	scopedAttributes.put("afterNodesChange", _afterNodesChange);
}

if (request.getAttribute("alloy:live-search:afterShowChange") != null) {
	scopedAttributes.put("afterShowChange", _afterShowChange);
}

if (request.getAttribute("alloy:live-search:onDataChange") != null) {
	scopedAttributes.put("onDataChange", _onDataChange);
}

if (request.getAttribute("alloy:live-search:onDelayChange") != null) {
	scopedAttributes.put("onDelayChange", _onDelayChange);
}

if (request.getAttribute("alloy:live-search:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:live-search:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:live-search:onHideChange") != null) {
	scopedAttributes.put("onHideChange", _onHideChange);
}

if (request.getAttribute("alloy:live-search:onIndexChange") != null) {
	scopedAttributes.put("onIndexChange", _onIndexChange);
}

if (request.getAttribute("alloy:live-search:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:live-search:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:live-search:onInputChange") != null) {
	scopedAttributes.put("onInputChange", _onInputChange);
}

if (request.getAttribute("alloy:live-search:onMatchRegexChange") != null) {
	scopedAttributes.put("onMatchRegexChange", _onMatchRegexChange);
}

if (request.getAttribute("alloy:live-search:onNodesChange") != null) {
	scopedAttributes.put("onNodesChange", _onNodesChange);
}

if (request.getAttribute("alloy:live-search:onShowChange") != null) {
	scopedAttributes.put("onShowChange", _onShowChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes,useMarkup"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>