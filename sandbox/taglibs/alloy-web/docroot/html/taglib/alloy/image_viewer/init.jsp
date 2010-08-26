<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:image-viewer:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:image-viewer:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	if ((String)request.getAttribute("alloy:image-viewer:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

java.lang.Object _align = (java.lang.Object)request.getAttribute("alloy:image-viewer:align");
java.lang.Boolean _anim = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-viewer:anim"), true);
java.lang.Object _arrowLeftEl = (java.lang.Object)request.getAttribute("alloy:image-viewer:arrowLeftEl");
java.lang.Object _arrowRightEl = (java.lang.Object)request.getAttribute("alloy:image-viewer:arrowRightEl");
java.lang.Object _imageviewerBodyContent = (java.lang.Object)request.getAttribute("alloy:image-viewer:imageviewerBodyContent");
java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:image-viewer:boundingBox");
java.lang.Object _caption = (java.lang.Object)request.getAttribute("alloy:image-viewer:caption");
java.lang.Object _captionEl = (java.lang.Object)request.getAttribute("alloy:image-viewer:captionEl");
java.lang.Boolean _captionFromTitle = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-viewer:captionFromTitle"), true);
java.lang.Boolean _centered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-viewer:centered"), true);
java.lang.Object _closeEl = (java.lang.Object)request.getAttribute("alloy:image-viewer:closeEl");
java.lang.Object _constrain = (java.lang.Object)request.getAttribute("alloy:image-viewer:constrain");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:image-viewer:contentBox");
java.lang.Object _cssClass = (java.lang.Object)request.getAttribute("alloy:image-viewer:cssClass");
java.lang.Number _currentIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:image-viewer:currentIndex"), 0);
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-viewer:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-viewer:disabled"), false);
java.lang.Object _fillHeight = (java.lang.Object)request.getAttribute("alloy:image-viewer:fillHeight");
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-viewer:focused"), false);
java.lang.Object _footerContent = (java.lang.Object)request.getAttribute("alloy:image-viewer:footerContent");
java.lang.Object _headerContent = (java.lang.Object)request.getAttribute("alloy:image-viewer:headerContent");
java.lang.Object _height = (java.lang.Object)request.getAttribute("alloy:image-viewer:height");
java.lang.Object _hideClass = (java.lang.Object)request.getAttribute("alloy:image-viewer:hideClass");
java.lang.Object _imageviewerId = (java.lang.Object)request.getAttribute("alloy:image-viewer:imageviewerId");
java.lang.Object _image = (java.lang.Object)request.getAttribute("alloy:image-viewer:image");
java.lang.Object _imageAnim = (java.lang.Object)request.getAttribute("alloy:image-viewer:imageAnim");
java.lang.Object _infoEl = (java.lang.Object)request.getAttribute("alloy:image-viewer:infoEl");
java.lang.Object _infoTemplate = (java.lang.Object)request.getAttribute("alloy:image-viewer:infoTemplate");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-viewer:initialized"), false);
java.lang.Object _links = (java.lang.Object)request.getAttribute("alloy:image-viewer:links");
java.lang.Object _loader = (java.lang.Object)request.getAttribute("alloy:image-viewer:loader");
java.lang.Boolean _loading = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-viewer:loading"), false);
java.lang.Object _loadingEl = (java.lang.Object)request.getAttribute("alloy:image-viewer:loadingEl");
java.lang.Number _maxHeight = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:image-viewer:maxHeight"), 0);
java.lang.Number _maxWidth = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:image-viewer:maxWidth"), 0);
java.lang.Object _modal = (java.lang.Object)request.getAttribute("alloy:image-viewer:modal");
java.lang.Boolean _preloadAllImages = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-viewer:preloadAllImages"), false);
java.lang.Boolean _preventOverlap = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-viewer:preventOverlap"), false);
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-viewer:render"), false);
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-viewer:rendered"), false);
java.lang.Boolean _shim = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-viewer:shim"), false);
java.lang.Boolean _showArrows = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-viewer:showArrows"), true);
java.lang.Boolean _showClose = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-viewer:showClose"), true);
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:image-viewer:srcNode");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:image-viewer:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:image-viewer:tabIndex"), 0);
java.lang.Boolean _totalLinks = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-viewer:totalLinks"), true);
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-viewer:visible"), true);
java.lang.Object _width = (java.lang.Object)request.getAttribute("alloy:image-viewer:width");
java.lang.Number _x = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:image-viewer:x"), 0);
java.lang.Object _xy = (java.lang.Object)request.getAttribute("alloy:image-viewer:xy");
java.lang.Number _y = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:image-viewer:y"), 0);
java.lang.Number _zIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:image-viewer:zIndex"), 0);
java.lang.Object _afterAlignChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterAlignChange");
java.lang.Object _afterAnim = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterAnim");
java.lang.Object _afterAnimChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterAnimChange");
java.lang.Object _afterArrowLeftElChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterArrowLeftElChange");
java.lang.Object _afterArrowRightElChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterArrowRightElChange");
java.lang.Object _afterBodyContentChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterBodyContentChange");
java.lang.Object _afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterBoundingBoxChange");
java.lang.Object _afterCaptionChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterCaptionChange");
java.lang.Object _afterCaptionElChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterCaptionElChange");
java.lang.Object _afterCaptionFromTitleChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterCaptionFromTitleChange");
java.lang.Object _afterCenteredChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterCenteredChange");
java.lang.Object _afterCloseElChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterCloseElChange");
java.lang.Object _afterConstrainChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterConstrainChange");
java.lang.Object _afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterContentBoxChange");
java.lang.Object _afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterCssClassChange");
java.lang.Object _afterCurrentIndexChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterCurrentIndexChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterDestroyedChange");
java.lang.Object _afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterDisabledChange");
java.lang.Object _afterFillHeightChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterFillHeightChange");
java.lang.Object _afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterFocusedChange");
java.lang.Object _afterFooterContentChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterFooterContentChange");
java.lang.Object _afterHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterHeaderContentChange");
java.lang.Object _afterHeightChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterHeightChange");
java.lang.Object _afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterHideClassChange");
java.lang.Object _afterIdChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterIdChange");
java.lang.Object _afterImageAnimChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterImageAnimChange");
java.lang.Object _afterImageChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterImageChange");
java.lang.Object _afterInfoElChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterInfoElChange");
java.lang.Object _afterInfoTemplateChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterInfoTemplateChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterInitializedChange");
java.lang.Object _afterLinksChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterLinksChange");
java.lang.Object _afterLoad = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterLoad");
java.lang.Object _afterLoaderChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterLoaderChange");
java.lang.Object _afterLoadingChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterLoadingChange");
java.lang.Object _afterLoadingElChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterLoadingElChange");
java.lang.Object _afterMaxHeightChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterMaxHeightChange");
java.lang.Object _afterMaxWidthChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterMaxWidthChange");
java.lang.Object _afterModalChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterModalChange");
java.lang.Object _afterPreloadAllImagesChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterPreloadAllImagesChange");
java.lang.Object _afterPreventOverlapChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterPreventOverlapChange");
java.lang.Object _afterRenderChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterRenderChange");
java.lang.Object _afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterRenderedChange");
java.lang.Object _afterRequest = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterRequest");
java.lang.Object _afterShimChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterShimChange");
java.lang.Object _afterShowArrowsChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterShowArrowsChange");
java.lang.Object _afterShowCloseChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterShowCloseChange");
java.lang.Object _afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterSrcNodeChange");
java.lang.Object _afterStringsChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterStringsChange");
java.lang.Object _afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterTabIndexChange");
java.lang.Object _afterTotalLinksChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterTotalLinksChange");
java.lang.Object _afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterVisibleChange");
java.lang.Object _afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterContentUpdate");
java.lang.Object _afterRender = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterRender");
java.lang.Object _afterWidthChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterWidthChange");
java.lang.Object _afterXChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterXChange");
java.lang.Object _afterXyChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterXyChange");
java.lang.Object _afterYChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterYChange");
java.lang.Object _afterZIndexChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:afterZIndexChange");
java.lang.Object _onAlignChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onAlignChange");
java.lang.Object _onAnim = (java.lang.Object)request.getAttribute("alloy:image-viewer:onAnim");
java.lang.Object _onAnimChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onAnimChange");
java.lang.Object _onArrowLeftElChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onArrowLeftElChange");
java.lang.Object _onArrowRightElChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onArrowRightElChange");
java.lang.Object _onBodyContentChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onBodyContentChange");
java.lang.Object _onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onBoundingBoxChange");
java.lang.Object _onCaptionChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onCaptionChange");
java.lang.Object _onCaptionElChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onCaptionElChange");
java.lang.Object _onCaptionFromTitleChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onCaptionFromTitleChange");
java.lang.Object _onCenteredChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onCenteredChange");
java.lang.Object _onCloseElChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onCloseElChange");
java.lang.Object _onConstrainChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onConstrainChange");
java.lang.Object _onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onContentBoxChange");
java.lang.Object _onCssClassChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onCssClassChange");
java.lang.Object _onCurrentIndexChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onCurrentIndexChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:image-viewer:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onDestroyedChange");
java.lang.Object _onDisabledChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onDisabledChange");
java.lang.Object _onFillHeightChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onFillHeightChange");
java.lang.Object _onFocusedChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onFocusedChange");
java.lang.Object _onFooterContentChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onFooterContentChange");
java.lang.Object _onHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onHeaderContentChange");
java.lang.Object _onHeightChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onHeightChange");
java.lang.Object _onHideClassChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onHideClassChange");
java.lang.Object _onIdChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onIdChange");
java.lang.Object _onImageAnimChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onImageAnimChange");
java.lang.Object _onImageChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onImageChange");
java.lang.Object _onInfoElChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onInfoElChange");
java.lang.Object _onInfoTemplateChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onInfoTemplateChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:image-viewer:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onInitializedChange");
java.lang.Object _onLinksChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onLinksChange");
java.lang.Object _onLoad = (java.lang.Object)request.getAttribute("alloy:image-viewer:onLoad");
java.lang.Object _onLoaderChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onLoaderChange");
java.lang.Object _onLoadingChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onLoadingChange");
java.lang.Object _onLoadingElChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onLoadingElChange");
java.lang.Object _onMaxHeightChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onMaxHeightChange");
java.lang.Object _onMaxWidthChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onMaxWidthChange");
java.lang.Object _onModalChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onModalChange");
java.lang.Object _onPreloadAllImagesChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onPreloadAllImagesChange");
java.lang.Object _onPreventOverlapChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onPreventOverlapChange");
java.lang.Object _onRenderChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onRenderChange");
java.lang.Object _onRenderedChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onRenderedChange");
java.lang.Object _onRequest = (java.lang.Object)request.getAttribute("alloy:image-viewer:onRequest");
java.lang.Object _onShimChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onShimChange");
java.lang.Object _onShowArrowsChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onShowArrowsChange");
java.lang.Object _onShowCloseChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onShowCloseChange");
java.lang.Object _onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onSrcNodeChange");
java.lang.Object _onStringsChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onStringsChange");
java.lang.Object _onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onTabIndexChange");
java.lang.Object _onTotalLinksChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onTotalLinksChange");
java.lang.Object _onVisibleChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onVisibleChange");
java.lang.Object _onContentUpdate = (java.lang.Object)request.getAttribute("alloy:image-viewer:onContentUpdate");
java.lang.Object _onRender = (java.lang.Object)request.getAttribute("alloy:image-viewer:onRender");
java.lang.Object _onWidthChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onWidthChange");
java.lang.Object _onXChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onXChange");
java.lang.Object _onXyChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onXyChange");
java.lang.Object _onYChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onYChange");
java.lang.Object _onZIndexChange = (java.lang.Object)request.getAttribute("alloy:image-viewer:onZIndexChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:image-viewer:align") != null) {
	scopedAttributes.put("align", _align);
}

if (request.getAttribute("alloy:image-viewer:anim") != null) {
	scopedAttributes.put("anim", _anim);
}

if (request.getAttribute("alloy:image-viewer:arrowLeftEl") != null) {
	scopedAttributes.put("arrowLeftEl", _arrowLeftEl);
}

if (request.getAttribute("alloy:image-viewer:arrowRightEl") != null) {
	scopedAttributes.put("arrowRightEl", _arrowRightEl);
}

if (request.getAttribute("alloy:image-viewer:imageviewerBodyContent") != null) {
	scopedAttributes.put("imageviewerBodyContent", _imageviewerBodyContent);
}

if (request.getAttribute("alloy:image-viewer:boundingBox") != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (request.getAttribute("alloy:image-viewer:caption") != null) {
	scopedAttributes.put("caption", _caption);
}

if (request.getAttribute("alloy:image-viewer:captionEl") != null) {
	scopedAttributes.put("captionEl", _captionEl);
}

if (request.getAttribute("alloy:image-viewer:captionFromTitle") != null) {
	scopedAttributes.put("captionFromTitle", _captionFromTitle);
}

if (request.getAttribute("alloy:image-viewer:centered") != null) {
	scopedAttributes.put("centered", _centered);
}

if (request.getAttribute("alloy:image-viewer:closeEl") != null) {
	scopedAttributes.put("closeEl", _closeEl);
}

if (request.getAttribute("alloy:image-viewer:constrain") != null) {
	scopedAttributes.put("constrain", _constrain);
}

if (request.getAttribute("alloy:image-viewer:contentBox") != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (request.getAttribute("alloy:image-viewer:cssClass") != null) {
	scopedAttributes.put("cssClass", _cssClass);
}

if (request.getAttribute("alloy:image-viewer:currentIndex") != null) {
	scopedAttributes.put("currentIndex", _currentIndex);
}

if (request.getAttribute("alloy:image-viewer:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:image-viewer:disabled") != null) {
	scopedAttributes.put("disabled", _disabled);
}

if (request.getAttribute("alloy:image-viewer:fillHeight") != null) {
	scopedAttributes.put("fillHeight", _fillHeight);
}

if (request.getAttribute("alloy:image-viewer:focused") != null) {
	scopedAttributes.put("focused", _focused);
}

if (request.getAttribute("alloy:image-viewer:footerContent") != null) {
	scopedAttributes.put("footerContent", _footerContent);
}

if (request.getAttribute("alloy:image-viewer:headerContent") != null) {
	scopedAttributes.put("headerContent", _headerContent);
}

if (request.getAttribute("alloy:image-viewer:height") != null) {
	scopedAttributes.put("height", _height);
}

if (request.getAttribute("alloy:image-viewer:hideClass") != null) {
	scopedAttributes.put("hideClass", _hideClass);
}

if (request.getAttribute("alloy:image-viewer:imageviewerId") != null) {
	scopedAttributes.put("imageviewerId", _imageviewerId);
}

if (request.getAttribute("alloy:image-viewer:image") != null) {
	scopedAttributes.put("image", _image);
}

if (request.getAttribute("alloy:image-viewer:imageAnim") != null) {
	scopedAttributes.put("imageAnim", _imageAnim);
}

if (request.getAttribute("alloy:image-viewer:infoEl") != null) {
	scopedAttributes.put("infoEl", _infoEl);
}

if (request.getAttribute("alloy:image-viewer:infoTemplate") != null) {
	scopedAttributes.put("infoTemplate", _infoTemplate);
}

if (request.getAttribute("alloy:image-viewer:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:image-viewer:links") != null) {
	scopedAttributes.put("links", _links);
}

if (request.getAttribute("alloy:image-viewer:loader") != null) {
	scopedAttributes.put("loader", _loader);
}

if (request.getAttribute("alloy:image-viewer:loading") != null) {
	scopedAttributes.put("loading", _loading);
}

if (request.getAttribute("alloy:image-viewer:loadingEl") != null) {
	scopedAttributes.put("loadingEl", _loadingEl);
}

if (request.getAttribute("alloy:image-viewer:maxHeight") != null) {
	scopedAttributes.put("maxHeight", _maxHeight);
}

if (request.getAttribute("alloy:image-viewer:maxWidth") != null) {
	scopedAttributes.put("maxWidth", _maxWidth);
}

if (request.getAttribute("alloy:image-viewer:modal") != null) {
	scopedAttributes.put("modal", _modal);
}

if (request.getAttribute("alloy:image-viewer:preloadAllImages") != null) {
	scopedAttributes.put("preloadAllImages", _preloadAllImages);
}

if (request.getAttribute("alloy:image-viewer:preventOverlap") != null) {
	scopedAttributes.put("preventOverlap", _preventOverlap);
}

if (request.getAttribute("alloy:image-viewer:render") != null) {
	scopedAttributes.put("render", _render);
}

if (request.getAttribute("alloy:image-viewer:rendered") != null) {
	scopedAttributes.put("rendered", _rendered);
}

if (request.getAttribute("alloy:image-viewer:shim") != null) {
	scopedAttributes.put("shim", _shim);
}

if (request.getAttribute("alloy:image-viewer:showArrows") != null) {
	scopedAttributes.put("showArrows", _showArrows);
}

if (request.getAttribute("alloy:image-viewer:showClose") != null) {
	scopedAttributes.put("showClose", _showClose);
}

if (request.getAttribute("alloy:image-viewer:srcNode") != null) {
	scopedAttributes.put("srcNode", _srcNode);
}

if (request.getAttribute("alloy:image-viewer:strings") != null) {
	scopedAttributes.put("strings", _strings);
}

if (request.getAttribute("alloy:image-viewer:tabIndex") != null) {
	scopedAttributes.put("tabIndex", _tabIndex);
}

if (request.getAttribute("alloy:image-viewer:totalLinks") != null) {
	scopedAttributes.put("totalLinks", _totalLinks);
}

if (request.getAttribute("alloy:image-viewer:visible") != null) {
	scopedAttributes.put("visible", _visible);
}

if (request.getAttribute("alloy:image-viewer:width") != null) {
	scopedAttributes.put("width", _width);
}

if (request.getAttribute("alloy:image-viewer:x") != null) {
	scopedAttributes.put("x", _x);
}

if (request.getAttribute("alloy:image-viewer:xy") != null) {
	scopedAttributes.put("xy", _xy);
}

if (request.getAttribute("alloy:image-viewer:y") != null) {
	scopedAttributes.put("y", _y);
}

if (request.getAttribute("alloy:image-viewer:zIndex") != null) {
	scopedAttributes.put("zIndex", _zIndex);
}

if (request.getAttribute("alloy:image-viewer:afterAlignChange") != null) {
	scopedAttributes.put("afterAlignChange", _afterAlignChange);
}

if (request.getAttribute("alloy:image-viewer:afterAnim") != null) {
	scopedAttributes.put("afterAnim", _afterAnim);
}

if (request.getAttribute("alloy:image-viewer:afterAnimChange") != null) {
	scopedAttributes.put("afterAnimChange", _afterAnimChange);
}

if (request.getAttribute("alloy:image-viewer:afterArrowLeftElChange") != null) {
	scopedAttributes.put("afterArrowLeftElChange", _afterArrowLeftElChange);
}

if (request.getAttribute("alloy:image-viewer:afterArrowRightElChange") != null) {
	scopedAttributes.put("afterArrowRightElChange", _afterArrowRightElChange);
}

if (request.getAttribute("alloy:image-viewer:afterBodyContentChange") != null) {
	scopedAttributes.put("afterBodyContentChange", _afterBodyContentChange);
}

if (request.getAttribute("alloy:image-viewer:afterBoundingBoxChange") != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
}

if (request.getAttribute("alloy:image-viewer:afterCaptionChange") != null) {
	scopedAttributes.put("afterCaptionChange", _afterCaptionChange);
}

if (request.getAttribute("alloy:image-viewer:afterCaptionElChange") != null) {
	scopedAttributes.put("afterCaptionElChange", _afterCaptionElChange);
}

if (request.getAttribute("alloy:image-viewer:afterCaptionFromTitleChange") != null) {
	scopedAttributes.put("afterCaptionFromTitleChange", _afterCaptionFromTitleChange);
}

if (request.getAttribute("alloy:image-viewer:afterCenteredChange") != null) {
	scopedAttributes.put("afterCenteredChange", _afterCenteredChange);
}

if (request.getAttribute("alloy:image-viewer:afterCloseElChange") != null) {
	scopedAttributes.put("afterCloseElChange", _afterCloseElChange);
}

if (request.getAttribute("alloy:image-viewer:afterConstrainChange") != null) {
	scopedAttributes.put("afterConstrainChange", _afterConstrainChange);
}

if (request.getAttribute("alloy:image-viewer:afterContentBoxChange") != null) {
	scopedAttributes.put("afterContentBoxChange", _afterContentBoxChange);
}

if (request.getAttribute("alloy:image-viewer:afterCssClassChange") != null) {
	scopedAttributes.put("afterCssClassChange", _afterCssClassChange);
}

if (request.getAttribute("alloy:image-viewer:afterCurrentIndexChange") != null) {
	scopedAttributes.put("afterCurrentIndexChange", _afterCurrentIndexChange);
}

if (request.getAttribute("alloy:image-viewer:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:image-viewer:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:image-viewer:afterDisabledChange") != null) {
	scopedAttributes.put("afterDisabledChange", _afterDisabledChange);
}

if (request.getAttribute("alloy:image-viewer:afterFillHeightChange") != null) {
	scopedAttributes.put("afterFillHeightChange", _afterFillHeightChange);
}

if (request.getAttribute("alloy:image-viewer:afterFocusedChange") != null) {
	scopedAttributes.put("afterFocusedChange", _afterFocusedChange);
}

if (request.getAttribute("alloy:image-viewer:afterFooterContentChange") != null) {
	scopedAttributes.put("afterFooterContentChange", _afterFooterContentChange);
}

if (request.getAttribute("alloy:image-viewer:afterHeaderContentChange") != null) {
	scopedAttributes.put("afterHeaderContentChange", _afterHeaderContentChange);
}

if (request.getAttribute("alloy:image-viewer:afterHeightChange") != null) {
	scopedAttributes.put("afterHeightChange", _afterHeightChange);
}

if (request.getAttribute("alloy:image-viewer:afterHideClassChange") != null) {
	scopedAttributes.put("afterHideClassChange", _afterHideClassChange);
}

if (request.getAttribute("alloy:image-viewer:afterIdChange") != null) {
	scopedAttributes.put("afterIdChange", _afterIdChange);
}

if (request.getAttribute("alloy:image-viewer:afterImageAnimChange") != null) {
	scopedAttributes.put("afterImageAnimChange", _afterImageAnimChange);
}

if (request.getAttribute("alloy:image-viewer:afterImageChange") != null) {
	scopedAttributes.put("afterImageChange", _afterImageChange);
}

if (request.getAttribute("alloy:image-viewer:afterInfoElChange") != null) {
	scopedAttributes.put("afterInfoElChange", _afterInfoElChange);
}

if (request.getAttribute("alloy:image-viewer:afterInfoTemplateChange") != null) {
	scopedAttributes.put("afterInfoTemplateChange", _afterInfoTemplateChange);
}

if (request.getAttribute("alloy:image-viewer:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:image-viewer:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:image-viewer:afterLinksChange") != null) {
	scopedAttributes.put("afterLinksChange", _afterLinksChange);
}

if (request.getAttribute("alloy:image-viewer:afterLoad") != null) {
	scopedAttributes.put("afterLoad", _afterLoad);
}

if (request.getAttribute("alloy:image-viewer:afterLoaderChange") != null) {
	scopedAttributes.put("afterLoaderChange", _afterLoaderChange);
}

if (request.getAttribute("alloy:image-viewer:afterLoadingChange") != null) {
	scopedAttributes.put("afterLoadingChange", _afterLoadingChange);
}

if (request.getAttribute("alloy:image-viewer:afterLoadingElChange") != null) {
	scopedAttributes.put("afterLoadingElChange", _afterLoadingElChange);
}

if (request.getAttribute("alloy:image-viewer:afterMaxHeightChange") != null) {
	scopedAttributes.put("afterMaxHeightChange", _afterMaxHeightChange);
}

if (request.getAttribute("alloy:image-viewer:afterMaxWidthChange") != null) {
	scopedAttributes.put("afterMaxWidthChange", _afterMaxWidthChange);
}

if (request.getAttribute("alloy:image-viewer:afterModalChange") != null) {
	scopedAttributes.put("afterModalChange", _afterModalChange);
}

if (request.getAttribute("alloy:image-viewer:afterPreloadAllImagesChange") != null) {
	scopedAttributes.put("afterPreloadAllImagesChange", _afterPreloadAllImagesChange);
}

if (request.getAttribute("alloy:image-viewer:afterPreventOverlapChange") != null) {
	scopedAttributes.put("afterPreventOverlapChange", _afterPreventOverlapChange);
}

if (request.getAttribute("alloy:image-viewer:afterRenderChange") != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (request.getAttribute("alloy:image-viewer:afterRenderedChange") != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
}

if (request.getAttribute("alloy:image-viewer:afterRequest") != null) {
	scopedAttributes.put("afterRequest", _afterRequest);
}

if (request.getAttribute("alloy:image-viewer:afterShimChange") != null) {
	scopedAttributes.put("afterShimChange", _afterShimChange);
}

if (request.getAttribute("alloy:image-viewer:afterShowArrowsChange") != null) {
	scopedAttributes.put("afterShowArrowsChange", _afterShowArrowsChange);
}

if (request.getAttribute("alloy:image-viewer:afterShowCloseChange") != null) {
	scopedAttributes.put("afterShowCloseChange", _afterShowCloseChange);
}

if (request.getAttribute("alloy:image-viewer:afterSrcNodeChange") != null) {
	scopedAttributes.put("afterSrcNodeChange", _afterSrcNodeChange);
}

if (request.getAttribute("alloy:image-viewer:afterStringsChange") != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (request.getAttribute("alloy:image-viewer:afterTabIndexChange") != null) {
	scopedAttributes.put("afterTabIndexChange", _afterTabIndexChange);
}

if (request.getAttribute("alloy:image-viewer:afterTotalLinksChange") != null) {
	scopedAttributes.put("afterTotalLinksChange", _afterTotalLinksChange);
}

if (request.getAttribute("alloy:image-viewer:afterVisibleChange") != null) {
	scopedAttributes.put("afterVisibleChange", _afterVisibleChange);
}

if (request.getAttribute("alloy:image-viewer:afterContentUpdate") != null) {
	scopedAttributes.put("afterContentUpdate", _afterContentUpdate);
}

if (request.getAttribute("alloy:image-viewer:afterRender") != null) {
	scopedAttributes.put("afterRender", _afterRender);
}

if (request.getAttribute("alloy:image-viewer:afterWidthChange") != null) {
	scopedAttributes.put("afterWidthChange", _afterWidthChange);
}

if (request.getAttribute("alloy:image-viewer:afterXChange") != null) {
	scopedAttributes.put("afterXChange", _afterXChange);
}

if (request.getAttribute("alloy:image-viewer:afterXyChange") != null) {
	scopedAttributes.put("afterXyChange", _afterXyChange);
}

if (request.getAttribute("alloy:image-viewer:afterYChange") != null) {
	scopedAttributes.put("afterYChange", _afterYChange);
}

if (request.getAttribute("alloy:image-viewer:afterZIndexChange") != null) {
	scopedAttributes.put("afterZIndexChange", _afterZIndexChange);
}

if (request.getAttribute("alloy:image-viewer:onAlignChange") != null) {
	scopedAttributes.put("onAlignChange", _onAlignChange);
}

if (request.getAttribute("alloy:image-viewer:onAnim") != null) {
	scopedAttributes.put("onAnim", _onAnim);
}

if (request.getAttribute("alloy:image-viewer:onAnimChange") != null) {
	scopedAttributes.put("onAnimChange", _onAnimChange);
}

if (request.getAttribute("alloy:image-viewer:onArrowLeftElChange") != null) {
	scopedAttributes.put("onArrowLeftElChange", _onArrowLeftElChange);
}

if (request.getAttribute("alloy:image-viewer:onArrowRightElChange") != null) {
	scopedAttributes.put("onArrowRightElChange", _onArrowRightElChange);
}

if (request.getAttribute("alloy:image-viewer:onBodyContentChange") != null) {
	scopedAttributes.put("onBodyContentChange", _onBodyContentChange);
}

if (request.getAttribute("alloy:image-viewer:onBoundingBoxChange") != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
}

if (request.getAttribute("alloy:image-viewer:onCaptionChange") != null) {
	scopedAttributes.put("onCaptionChange", _onCaptionChange);
}

if (request.getAttribute("alloy:image-viewer:onCaptionElChange") != null) {
	scopedAttributes.put("onCaptionElChange", _onCaptionElChange);
}

if (request.getAttribute("alloy:image-viewer:onCaptionFromTitleChange") != null) {
	scopedAttributes.put("onCaptionFromTitleChange", _onCaptionFromTitleChange);
}

if (request.getAttribute("alloy:image-viewer:onCenteredChange") != null) {
	scopedAttributes.put("onCenteredChange", _onCenteredChange);
}

if (request.getAttribute("alloy:image-viewer:onCloseElChange") != null) {
	scopedAttributes.put("onCloseElChange", _onCloseElChange);
}

if (request.getAttribute("alloy:image-viewer:onConstrainChange") != null) {
	scopedAttributes.put("onConstrainChange", _onConstrainChange);
}

if (request.getAttribute("alloy:image-viewer:onContentBoxChange") != null) {
	scopedAttributes.put("onContentBoxChange", _onContentBoxChange);
}

if (request.getAttribute("alloy:image-viewer:onCssClassChange") != null) {
	scopedAttributes.put("onCssClassChange", _onCssClassChange);
}

if (request.getAttribute("alloy:image-viewer:onCurrentIndexChange") != null) {
	scopedAttributes.put("onCurrentIndexChange", _onCurrentIndexChange);
}

if (request.getAttribute("alloy:image-viewer:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:image-viewer:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:image-viewer:onDisabledChange") != null) {
	scopedAttributes.put("onDisabledChange", _onDisabledChange);
}

if (request.getAttribute("alloy:image-viewer:onFillHeightChange") != null) {
	scopedAttributes.put("onFillHeightChange", _onFillHeightChange);
}

if (request.getAttribute("alloy:image-viewer:onFocusedChange") != null) {
	scopedAttributes.put("onFocusedChange", _onFocusedChange);
}

if (request.getAttribute("alloy:image-viewer:onFooterContentChange") != null) {
	scopedAttributes.put("onFooterContentChange", _onFooterContentChange);
}

if (request.getAttribute("alloy:image-viewer:onHeaderContentChange") != null) {
	scopedAttributes.put("onHeaderContentChange", _onHeaderContentChange);
}

if (request.getAttribute("alloy:image-viewer:onHeightChange") != null) {
	scopedAttributes.put("onHeightChange", _onHeightChange);
}

if (request.getAttribute("alloy:image-viewer:onHideClassChange") != null) {
	scopedAttributes.put("onHideClassChange", _onHideClassChange);
}

if (request.getAttribute("alloy:image-viewer:onIdChange") != null) {
	scopedAttributes.put("onIdChange", _onIdChange);
}

if (request.getAttribute("alloy:image-viewer:onImageAnimChange") != null) {
	scopedAttributes.put("onImageAnimChange", _onImageAnimChange);
}

if (request.getAttribute("alloy:image-viewer:onImageChange") != null) {
	scopedAttributes.put("onImageChange", _onImageChange);
}

if (request.getAttribute("alloy:image-viewer:onInfoElChange") != null) {
	scopedAttributes.put("onInfoElChange", _onInfoElChange);
}

if (request.getAttribute("alloy:image-viewer:onInfoTemplateChange") != null) {
	scopedAttributes.put("onInfoTemplateChange", _onInfoTemplateChange);
}

if (request.getAttribute("alloy:image-viewer:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:image-viewer:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:image-viewer:onLinksChange") != null) {
	scopedAttributes.put("onLinksChange", _onLinksChange);
}

if (request.getAttribute("alloy:image-viewer:onLoad") != null) {
	scopedAttributes.put("onLoad", _onLoad);
}

if (request.getAttribute("alloy:image-viewer:onLoaderChange") != null) {
	scopedAttributes.put("onLoaderChange", _onLoaderChange);
}

if (request.getAttribute("alloy:image-viewer:onLoadingChange") != null) {
	scopedAttributes.put("onLoadingChange", _onLoadingChange);
}

if (request.getAttribute("alloy:image-viewer:onLoadingElChange") != null) {
	scopedAttributes.put("onLoadingElChange", _onLoadingElChange);
}

if (request.getAttribute("alloy:image-viewer:onMaxHeightChange") != null) {
	scopedAttributes.put("onMaxHeightChange", _onMaxHeightChange);
}

if (request.getAttribute("alloy:image-viewer:onMaxWidthChange") != null) {
	scopedAttributes.put("onMaxWidthChange", _onMaxWidthChange);
}

if (request.getAttribute("alloy:image-viewer:onModalChange") != null) {
	scopedAttributes.put("onModalChange", _onModalChange);
}

if (request.getAttribute("alloy:image-viewer:onPreloadAllImagesChange") != null) {
	scopedAttributes.put("onPreloadAllImagesChange", _onPreloadAllImagesChange);
}

if (request.getAttribute("alloy:image-viewer:onPreventOverlapChange") != null) {
	scopedAttributes.put("onPreventOverlapChange", _onPreventOverlapChange);
}

if (request.getAttribute("alloy:image-viewer:onRenderChange") != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (request.getAttribute("alloy:image-viewer:onRenderedChange") != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
}

if (request.getAttribute("alloy:image-viewer:onRequest") != null) {
	scopedAttributes.put("onRequest", _onRequest);
}

if (request.getAttribute("alloy:image-viewer:onShimChange") != null) {
	scopedAttributes.put("onShimChange", _onShimChange);
}

if (request.getAttribute("alloy:image-viewer:onShowArrowsChange") != null) {
	scopedAttributes.put("onShowArrowsChange", _onShowArrowsChange);
}

if (request.getAttribute("alloy:image-viewer:onShowCloseChange") != null) {
	scopedAttributes.put("onShowCloseChange", _onShowCloseChange);
}

if (request.getAttribute("alloy:image-viewer:onSrcNodeChange") != null) {
	scopedAttributes.put("onSrcNodeChange", _onSrcNodeChange);
}

if (request.getAttribute("alloy:image-viewer:onStringsChange") != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (request.getAttribute("alloy:image-viewer:onTabIndexChange") != null) {
	scopedAttributes.put("onTabIndexChange", _onTabIndexChange);
}

if (request.getAttribute("alloy:image-viewer:onTotalLinksChange") != null) {
	scopedAttributes.put("onTotalLinksChange", _onTotalLinksChange);
}

if (request.getAttribute("alloy:image-viewer:onVisibleChange") != null) {
	scopedAttributes.put("onVisibleChange", _onVisibleChange);
}

if (request.getAttribute("alloy:image-viewer:onContentUpdate") != null) {
	scopedAttributes.put("onContentUpdate", _onContentUpdate);
}

if (request.getAttribute("alloy:image-viewer:onRender") != null) {
	scopedAttributes.put("onRender", _onRender);
}

if (request.getAttribute("alloy:image-viewer:onWidthChange") != null) {
	scopedAttributes.put("onWidthChange", _onWidthChange);
}

if (request.getAttribute("alloy:image-viewer:onXChange") != null) {
	scopedAttributes.put("onXChange", _onXChange);
}

if (request.getAttribute("alloy:image-viewer:onXyChange") != null) {
	scopedAttributes.put("onXyChange", _onXyChange);
}

if (request.getAttribute("alloy:image-viewer:onYChange") != null) {
	scopedAttributes.put("onYChange", _onYChange);
}

if (request.getAttribute("alloy:image-viewer:onZIndexChange") != null) {
	scopedAttributes.put("onZIndexChange", _onZIndexChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes,useMarkup"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>