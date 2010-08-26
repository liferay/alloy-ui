<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:progress-bar:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:progress-bar:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	if ((String)request.getAttribute("alloy:progress-bar:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:progress-bar:boundingBox");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:progress-bar:contentBox");
java.lang.Object _cssClass = (java.lang.Object)request.getAttribute("alloy:progress-bar:cssClass");
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:progress-bar:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:progress-bar:disabled"), false);
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:progress-bar:focused"), false);
java.lang.Integer _height = GetterUtil.getInteger((java.lang.String)request.getAttribute("alloy:progress-bar:height"), 25);
java.lang.Object _hideClass = (java.lang.Object)request.getAttribute("alloy:progress-bar:hideClass");
java.lang.Object _progressbarId = (java.lang.Object)request.getAttribute("alloy:progress-bar:progressbarId");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:progress-bar:initialized"), false);
java.lang.Object _label = (java.lang.Object)request.getAttribute("alloy:progress-bar:label");
java.lang.Integer _max = GetterUtil.getInteger((java.lang.String)request.getAttribute("alloy:progress-bar:max"), 100);
java.lang.Integer _min = GetterUtil.getInteger((java.lang.String)request.getAttribute("alloy:progress-bar:min"), 0);
java.lang.Object _orientation = (java.lang.Object)request.getAttribute("alloy:progress-bar:orientation");
java.lang.Number _ratio = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:progress-bar:ratio"), 0);
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:progress-bar:render"), false);
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:progress-bar:rendered"), false);
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:progress-bar:srcNode");
java.lang.Object _statusNode = (java.lang.Object)request.getAttribute("alloy:progress-bar:statusNode");
java.lang.Number _step = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:progress-bar:step"), 0);
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:progress-bar:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:progress-bar:tabIndex"), 0);
java.lang.Object _textNode = (java.lang.Object)request.getAttribute("alloy:progress-bar:textNode");
java.lang.Integer _progressbarValue = GetterUtil.getInteger((java.lang.String)request.getAttribute("alloy:progress-bar:progressbarValue"), 0);
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:progress-bar:visible"), true);
java.lang.Object _width = (java.lang.Object)request.getAttribute("alloy:progress-bar:width");
java.lang.Object _afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterBoundingBoxChange");
java.lang.Object _afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterContentBoxChange");
java.lang.Object _afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterCssClassChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterDestroyedChange");
java.lang.Object _afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterDisabledChange");
java.lang.Object _afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterFocusedChange");
java.lang.Object _afterHeightChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterHeightChange");
java.lang.Object _afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterHideClassChange");
java.lang.Object _afterIdChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterIdChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterInitializedChange");
java.lang.Object _afterLabelChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterLabelChange");
java.lang.Object _afterMaxChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterMaxChange");
java.lang.Object _afterMinChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterMinChange");
java.lang.Object _afterOrientationChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterOrientationChange");
java.lang.Object _afterRatioChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterRatioChange");
java.lang.Object _afterRenderChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterRenderChange");
java.lang.Object _afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterRenderedChange");
java.lang.Object _afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterSrcNodeChange");
java.lang.Object _afterStatusNodeChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterStatusNodeChange");
java.lang.Object _afterStepChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterStepChange");
java.lang.Object _afterStringsChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterStringsChange");
java.lang.Object _afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterTabIndexChange");
java.lang.Object _afterTextNodeChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterTextNodeChange");
java.lang.Object _afterValueChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterValueChange");
java.lang.Object _afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterVisibleChange");
java.lang.Object _afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterContentUpdate");
java.lang.Object _afterRender = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterRender");
java.lang.Object _afterWidthChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterWidthChange");
java.lang.Object _onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onBoundingBoxChange");
java.lang.Object _onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onContentBoxChange");
java.lang.Object _onCssClassChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onCssClassChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:progress-bar:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onDestroyedChange");
java.lang.Object _onDisabledChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onDisabledChange");
java.lang.Object _onFocusedChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onFocusedChange");
java.lang.Object _onHeightChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onHeightChange");
java.lang.Object _onHideClassChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onHideClassChange");
java.lang.Object _onIdChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onIdChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:progress-bar:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onInitializedChange");
java.lang.Object _onLabelChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onLabelChange");
java.lang.Object _onMaxChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onMaxChange");
java.lang.Object _onMinChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onMinChange");
java.lang.Object _onOrientationChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onOrientationChange");
java.lang.Object _onRatioChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onRatioChange");
java.lang.Object _onRenderChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onRenderChange");
java.lang.Object _onRenderedChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onRenderedChange");
java.lang.Object _onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onSrcNodeChange");
java.lang.Object _onStatusNodeChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onStatusNodeChange");
java.lang.Object _onStepChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onStepChange");
java.lang.Object _onStringsChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onStringsChange");
java.lang.Object _onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onTabIndexChange");
java.lang.Object _onTextNodeChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onTextNodeChange");
java.lang.Object _onValueChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onValueChange");
java.lang.Object _onVisibleChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onVisibleChange");
java.lang.Object _onContentUpdate = (java.lang.Object)request.getAttribute("alloy:progress-bar:onContentUpdate");
java.lang.Object _onRender = (java.lang.Object)request.getAttribute("alloy:progress-bar:onRender");
java.lang.Object _onWidthChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onWidthChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:progress-bar:boundingBox") != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (request.getAttribute("alloy:progress-bar:contentBox") != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (request.getAttribute("alloy:progress-bar:cssClass") != null) {
	scopedAttributes.put("cssClass", _cssClass);
}

if (request.getAttribute("alloy:progress-bar:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:progress-bar:disabled") != null) {
	scopedAttributes.put("disabled", _disabled);
}

if (request.getAttribute("alloy:progress-bar:focused") != null) {
	scopedAttributes.put("focused", _focused);
}

if (request.getAttribute("alloy:progress-bar:height") != null) {
	scopedAttributes.put("height", _height);
}

if (request.getAttribute("alloy:progress-bar:hideClass") != null) {
	scopedAttributes.put("hideClass", _hideClass);
}

if (request.getAttribute("alloy:progress-bar:progressbarId") != null) {
	scopedAttributes.put("progressbarId", _progressbarId);
}

if (request.getAttribute("alloy:progress-bar:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:progress-bar:label") != null) {
	scopedAttributes.put("label", _label);
}

if (request.getAttribute("alloy:progress-bar:max") != null) {
	scopedAttributes.put("max", _max);
}

if (request.getAttribute("alloy:progress-bar:min") != null) {
	scopedAttributes.put("min", _min);
}

if (request.getAttribute("alloy:progress-bar:orientation") != null) {
	scopedAttributes.put("orientation", _orientation);
}

if (request.getAttribute("alloy:progress-bar:ratio") != null) {
	scopedAttributes.put("ratio", _ratio);
}

if (request.getAttribute("alloy:progress-bar:render") != null) {
	scopedAttributes.put("render", _render);
}

if (request.getAttribute("alloy:progress-bar:rendered") != null) {
	scopedAttributes.put("rendered", _rendered);
}

if (request.getAttribute("alloy:progress-bar:srcNode") != null) {
	scopedAttributes.put("srcNode", _srcNode);
}

if (request.getAttribute("alloy:progress-bar:statusNode") != null) {
	scopedAttributes.put("statusNode", _statusNode);
}

if (request.getAttribute("alloy:progress-bar:step") != null) {
	scopedAttributes.put("step", _step);
}

if (request.getAttribute("alloy:progress-bar:strings") != null) {
	scopedAttributes.put("strings", _strings);
}

if (request.getAttribute("alloy:progress-bar:tabIndex") != null) {
	scopedAttributes.put("tabIndex", _tabIndex);
}

if (request.getAttribute("alloy:progress-bar:textNode") != null) {
	scopedAttributes.put("textNode", _textNode);
}

if (request.getAttribute("alloy:progress-bar:progressbarValue") != null) {
	scopedAttributes.put("progressbarValue", _progressbarValue);
}

if (request.getAttribute("alloy:progress-bar:visible") != null) {
	scopedAttributes.put("visible", _visible);
}

if (request.getAttribute("alloy:progress-bar:width") != null) {
	scopedAttributes.put("width", _width);
}

if (request.getAttribute("alloy:progress-bar:afterBoundingBoxChange") != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
}

if (request.getAttribute("alloy:progress-bar:afterContentBoxChange") != null) {
	scopedAttributes.put("afterContentBoxChange", _afterContentBoxChange);
}

if (request.getAttribute("alloy:progress-bar:afterCssClassChange") != null) {
	scopedAttributes.put("afterCssClassChange", _afterCssClassChange);
}

if (request.getAttribute("alloy:progress-bar:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:progress-bar:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:progress-bar:afterDisabledChange") != null) {
	scopedAttributes.put("afterDisabledChange", _afterDisabledChange);
}

if (request.getAttribute("alloy:progress-bar:afterFocusedChange") != null) {
	scopedAttributes.put("afterFocusedChange", _afterFocusedChange);
}

if (request.getAttribute("alloy:progress-bar:afterHeightChange") != null) {
	scopedAttributes.put("afterHeightChange", _afterHeightChange);
}

if (request.getAttribute("alloy:progress-bar:afterHideClassChange") != null) {
	scopedAttributes.put("afterHideClassChange", _afterHideClassChange);
}

if (request.getAttribute("alloy:progress-bar:afterIdChange") != null) {
	scopedAttributes.put("afterIdChange", _afterIdChange);
}

if (request.getAttribute("alloy:progress-bar:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:progress-bar:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:progress-bar:afterLabelChange") != null) {
	scopedAttributes.put("afterLabelChange", _afterLabelChange);
}

if (request.getAttribute("alloy:progress-bar:afterMaxChange") != null) {
	scopedAttributes.put("afterMaxChange", _afterMaxChange);
}

if (request.getAttribute("alloy:progress-bar:afterMinChange") != null) {
	scopedAttributes.put("afterMinChange", _afterMinChange);
}

if (request.getAttribute("alloy:progress-bar:afterOrientationChange") != null) {
	scopedAttributes.put("afterOrientationChange", _afterOrientationChange);
}

if (request.getAttribute("alloy:progress-bar:afterRatioChange") != null) {
	scopedAttributes.put("afterRatioChange", _afterRatioChange);
}

if (request.getAttribute("alloy:progress-bar:afterRenderChange") != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (request.getAttribute("alloy:progress-bar:afterRenderedChange") != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
}

if (request.getAttribute("alloy:progress-bar:afterSrcNodeChange") != null) {
	scopedAttributes.put("afterSrcNodeChange", _afterSrcNodeChange);
}

if (request.getAttribute("alloy:progress-bar:afterStatusNodeChange") != null) {
	scopedAttributes.put("afterStatusNodeChange", _afterStatusNodeChange);
}

if (request.getAttribute("alloy:progress-bar:afterStepChange") != null) {
	scopedAttributes.put("afterStepChange", _afterStepChange);
}

if (request.getAttribute("alloy:progress-bar:afterStringsChange") != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (request.getAttribute("alloy:progress-bar:afterTabIndexChange") != null) {
	scopedAttributes.put("afterTabIndexChange", _afterTabIndexChange);
}

if (request.getAttribute("alloy:progress-bar:afterTextNodeChange") != null) {
	scopedAttributes.put("afterTextNodeChange", _afterTextNodeChange);
}

if (request.getAttribute("alloy:progress-bar:afterValueChange") != null) {
	scopedAttributes.put("afterValueChange", _afterValueChange);
}

if (request.getAttribute("alloy:progress-bar:afterVisibleChange") != null) {
	scopedAttributes.put("afterVisibleChange", _afterVisibleChange);
}

if (request.getAttribute("alloy:progress-bar:afterContentUpdate") != null) {
	scopedAttributes.put("afterContentUpdate", _afterContentUpdate);
}

if (request.getAttribute("alloy:progress-bar:afterRender") != null) {
	scopedAttributes.put("afterRender", _afterRender);
}

if (request.getAttribute("alloy:progress-bar:afterWidthChange") != null) {
	scopedAttributes.put("afterWidthChange", _afterWidthChange);
}

if (request.getAttribute("alloy:progress-bar:onBoundingBoxChange") != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
}

if (request.getAttribute("alloy:progress-bar:onContentBoxChange") != null) {
	scopedAttributes.put("onContentBoxChange", _onContentBoxChange);
}

if (request.getAttribute("alloy:progress-bar:onCssClassChange") != null) {
	scopedAttributes.put("onCssClassChange", _onCssClassChange);
}

if (request.getAttribute("alloy:progress-bar:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:progress-bar:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:progress-bar:onDisabledChange") != null) {
	scopedAttributes.put("onDisabledChange", _onDisabledChange);
}

if (request.getAttribute("alloy:progress-bar:onFocusedChange") != null) {
	scopedAttributes.put("onFocusedChange", _onFocusedChange);
}

if (request.getAttribute("alloy:progress-bar:onHeightChange") != null) {
	scopedAttributes.put("onHeightChange", _onHeightChange);
}

if (request.getAttribute("alloy:progress-bar:onHideClassChange") != null) {
	scopedAttributes.put("onHideClassChange", _onHideClassChange);
}

if (request.getAttribute("alloy:progress-bar:onIdChange") != null) {
	scopedAttributes.put("onIdChange", _onIdChange);
}

if (request.getAttribute("alloy:progress-bar:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:progress-bar:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:progress-bar:onLabelChange") != null) {
	scopedAttributes.put("onLabelChange", _onLabelChange);
}

if (request.getAttribute("alloy:progress-bar:onMaxChange") != null) {
	scopedAttributes.put("onMaxChange", _onMaxChange);
}

if (request.getAttribute("alloy:progress-bar:onMinChange") != null) {
	scopedAttributes.put("onMinChange", _onMinChange);
}

if (request.getAttribute("alloy:progress-bar:onOrientationChange") != null) {
	scopedAttributes.put("onOrientationChange", _onOrientationChange);
}

if (request.getAttribute("alloy:progress-bar:onRatioChange") != null) {
	scopedAttributes.put("onRatioChange", _onRatioChange);
}

if (request.getAttribute("alloy:progress-bar:onRenderChange") != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (request.getAttribute("alloy:progress-bar:onRenderedChange") != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
}

if (request.getAttribute("alloy:progress-bar:onSrcNodeChange") != null) {
	scopedAttributes.put("onSrcNodeChange", _onSrcNodeChange);
}

if (request.getAttribute("alloy:progress-bar:onStatusNodeChange") != null) {
	scopedAttributes.put("onStatusNodeChange", _onStatusNodeChange);
}

if (request.getAttribute("alloy:progress-bar:onStepChange") != null) {
	scopedAttributes.put("onStepChange", _onStepChange);
}

if (request.getAttribute("alloy:progress-bar:onStringsChange") != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (request.getAttribute("alloy:progress-bar:onTabIndexChange") != null) {
	scopedAttributes.put("onTabIndexChange", _onTabIndexChange);
}

if (request.getAttribute("alloy:progress-bar:onTextNodeChange") != null) {
	scopedAttributes.put("onTextNodeChange", _onTextNodeChange);
}

if (request.getAttribute("alloy:progress-bar:onValueChange") != null) {
	scopedAttributes.put("onValueChange", _onValueChange);
}

if (request.getAttribute("alloy:progress-bar:onVisibleChange") != null) {
	scopedAttributes.put("onVisibleChange", _onVisibleChange);
}

if (request.getAttribute("alloy:progress-bar:onContentUpdate") != null) {
	scopedAttributes.put("onContentUpdate", _onContentUpdate);
}

if (request.getAttribute("alloy:progress-bar:onRender") != null) {
	scopedAttributes.put("onRender", _onRender);
}

if (request.getAttribute("alloy:progress-bar:onWidthChange") != null) {
	scopedAttributes.put("onWidthChange", _onWidthChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes,useMarkup"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>