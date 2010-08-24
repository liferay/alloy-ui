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

java.lang.String _boundingBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:boundingBox"));
java.lang.String _contentBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:contentBox"));
java.lang.String _cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:cssClass"));
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:progress-bar:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:progress-bar:disabled"), false);
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:progress-bar:focused"), false);
java.lang.Integer _height = GetterUtil.getInteger((java.lang.String)request.getAttribute("alloy:progress-bar:height"), 25);
java.lang.String _hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:hideClass"), "aui-helper-hidden");
java.lang.String _progressbarId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:progressbarId"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:progress-bar:initialized"), false);
java.lang.String _label = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:label"));
java.lang.Integer _max = GetterUtil.getInteger((java.lang.String)request.getAttribute("alloy:progress-bar:max"), 100);
java.lang.Integer _min = GetterUtil.getInteger((java.lang.String)request.getAttribute("alloy:progress-bar:min"), 0);
java.lang.String _orientation = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:orientation"), "horizontal");
java.lang.Number _ratio = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:progress-bar:ratio"), 0);
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:progress-bar:render"), false);
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:progress-bar:rendered"), false);
java.lang.String _srcNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:srcNode"));
java.lang.String _statusNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:statusNode"));
java.lang.Number _step = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:progress-bar:step"), 0);
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:progress-bar:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:progress-bar:tabIndex"), 0);
java.lang.String _textNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:textNode"));
java.lang.Integer _progressbarValue = GetterUtil.getInteger((java.lang.String)request.getAttribute("alloy:progress-bar:progressbarValue"), 0);
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:progress-bar:visible"), true);
java.lang.String _width = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:width"));
java.lang.String _afterBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterBoundingBoxChange"));
java.lang.String _afterContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterContentBoxChange"));
java.lang.String _afterCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterCssClassChange"));
java.lang.String _afterDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterDestroy"));
java.lang.String _afterDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterDestroyedChange"));
java.lang.String _afterDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterDisabledChange"));
java.lang.String _afterFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterFocusedChange"));
java.lang.String _afterHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterHeightChange"));
java.lang.String _afterHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterHideClassChange"));
java.lang.String _afterIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterIdChange"));
java.lang.String _afterInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterInit"));
java.lang.String _afterInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterInitializedChange"));
java.lang.String _afterLabelChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterLabelChange"));
java.lang.String _afterMaxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterMaxChange"));
java.lang.String _afterMinChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterMinChange"));
java.lang.String _afterOrientationChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterOrientationChange"));
java.lang.String _afterRatioChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterRatioChange"));
java.lang.String _afterRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterRenderChange"));
java.lang.String _afterRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterRenderedChange"));
java.lang.String _afterSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterSrcNodeChange"));
java.lang.String _afterStatusNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterStatusNodeChange"));
java.lang.String _afterStepChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterStepChange"));
java.lang.String _afterStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterStringsChange"));
java.lang.String _afterTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterTabIndexChange"));
java.lang.String _afterTextNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterTextNodeChange"));
java.lang.String _afterValueChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterValueChange"));
java.lang.String _afterVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterVisibleChange"));
java.lang.String _afterContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterContentUpdate"));
java.lang.String _afterRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterRender"));
java.lang.String _afterWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterWidthChange"));
java.lang.String _onBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onBoundingBoxChange"));
java.lang.String _onContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onContentBoxChange"));
java.lang.String _onCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onCssClassChange"));
java.lang.String _onDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onDestroy"));
java.lang.String _onDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onDestroyedChange"));
java.lang.String _onDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onDisabledChange"));
java.lang.String _onFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onFocusedChange"));
java.lang.String _onHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onHeightChange"));
java.lang.String _onHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onHideClassChange"));
java.lang.String _onIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onIdChange"));
java.lang.String _onInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onInit"));
java.lang.String _onInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onInitializedChange"));
java.lang.String _onLabelChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onLabelChange"));
java.lang.String _onMaxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onMaxChange"));
java.lang.String _onMinChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onMinChange"));
java.lang.String _onOrientationChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onOrientationChange"));
java.lang.String _onRatioChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onRatioChange"));
java.lang.String _onRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onRenderChange"));
java.lang.String _onRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onRenderedChange"));
java.lang.String _onSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onSrcNodeChange"));
java.lang.String _onStatusNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onStatusNodeChange"));
java.lang.String _onStepChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onStepChange"));
java.lang.String _onStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onStringsChange"));
java.lang.String _onTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onTabIndexChange"));
java.lang.String _onTextNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onTextNodeChange"));
java.lang.String _onValueChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onValueChange"));
java.lang.String _onVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onVisibleChange"));
java.lang.String _onContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onContentUpdate"));
java.lang.String _onRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onRender"));
java.lang.String _onWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onWidthChange"));
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