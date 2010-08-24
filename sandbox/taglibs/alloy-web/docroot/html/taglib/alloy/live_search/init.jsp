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

java.lang.String _data = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:data"));
java.lang.Number _delay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:live-search:delay"), 250);
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:live-search:destroyed"), false);
java.lang.String _hide = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:hide"));
java.lang.Object _index = (java.lang.Object)request.getAttribute("alloy:live-search:index");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:live-search:initialized"), false);
java.lang.String _input = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:input"));
java.lang.String _matchRegex = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:matchRegex"), "(.)*");
java.lang.String _nodes = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:nodes"));
java.lang.String _show = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:show"));
java.lang.String _afterDataChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:afterDataChange"));
java.lang.String _afterDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:afterDelayChange"));
java.lang.String _afterDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:afterDestroy"));
java.lang.String _afterDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:afterDestroyedChange"));
java.lang.String _afterHideChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:afterHideChange"));
java.lang.String _afterIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:afterIndexChange"));
java.lang.String _afterInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:afterInit"));
java.lang.String _afterInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:afterInitializedChange"));
java.lang.String _afterInputChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:afterInputChange"));
java.lang.String _afterMatchRegexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:afterMatchRegexChange"));
java.lang.String _afterNodesChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:afterNodesChange"));
java.lang.String _afterShowChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:afterShowChange"));
java.lang.String _onDataChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:onDataChange"));
java.lang.String _onDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:onDelayChange"));
java.lang.String _onDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:onDestroy"));
java.lang.String _onDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:onDestroyedChange"));
java.lang.String _onHideChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:onHideChange"));
java.lang.String _onIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:onIndexChange"));
java.lang.String _onInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:onInit"));
java.lang.String _onInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:onInitializedChange"));
java.lang.String _onInputChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:onInputChange"));
java.lang.String _onMatchRegexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:onMatchRegexChange"));
java.lang.String _onNodesChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:onNodesChange"));
java.lang.String _onShowChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:live-search:onShowChange"));
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