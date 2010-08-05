<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:image-viewer:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:image-viewer:scopedAttributes");

java.lang.Boolean _anim = (java.lang.Boolean)request.getAttribute("alloy:image-viewer:anim");
java.lang.String _arrowLeftEl = (java.lang.String)request.getAttribute("alloy:image-viewer:arrowLeftEl");
java.lang.String _arrowRightEl = (java.lang.String)request.getAttribute("alloy:image-viewer:arrowRightEl");
java.lang.String _boundingBox = (java.lang.String)request.getAttribute("alloy:image-viewer:boundingBox");
java.lang.String _caption = (java.lang.String)request.getAttribute("alloy:image-viewer:caption");
java.lang.String _captionEl = (java.lang.String)request.getAttribute("alloy:image-viewer:captionEl");
java.lang.Boolean _captionFromTitle = (java.lang.Boolean)request.getAttribute("alloy:image-viewer:captionFromTitle");
java.lang.Boolean _centered = (java.lang.Boolean)request.getAttribute("alloy:image-viewer:centered");
java.lang.String _closeEl = (java.lang.String)request.getAttribute("alloy:image-viewer:closeEl");
java.lang.String _contentBox = (java.lang.String)request.getAttribute("alloy:image-viewer:contentBox");
java.lang.String _cssClass = (java.lang.String)request.getAttribute("alloy:image-viewer:cssClass");
java.lang.Number _currentIndex = (java.lang.Number)request.getAttribute("alloy:image-viewer:currentIndex");
java.lang.Boolean _destroyed = (java.lang.Boolean)request.getAttribute("alloy:image-viewer:destroyed");
java.lang.Boolean _disabled = (java.lang.Boolean)request.getAttribute("alloy:image-viewer:disabled");
java.lang.Boolean _focused = (java.lang.Boolean)request.getAttribute("alloy:image-viewer:focused");
java.lang.String _height = (java.lang.String)request.getAttribute("alloy:image-viewer:height");
java.lang.String _hideClass = (java.lang.String)request.getAttribute("alloy:image-viewer:hideClass");
java.lang.String _imageviewerId = (java.lang.String)request.getAttribute("alloy:image-viewer:imageviewerId");
java.lang.String _image = (java.lang.String)request.getAttribute("alloy:image-viewer:image");
java.lang.Object _imageAnim = (java.lang.Object)request.getAttribute("alloy:image-viewer:imageAnim");
java.lang.String _infoEl = (java.lang.String)request.getAttribute("alloy:image-viewer:infoEl");
java.lang.String _infoTemplate = (java.lang.String)request.getAttribute("alloy:image-viewer:infoTemplate");
java.lang.Boolean _initialized = (java.lang.Boolean)request.getAttribute("alloy:image-viewer:initialized");
java.lang.String _links = (java.lang.String)request.getAttribute("alloy:image-viewer:links");
java.lang.String _loader = (java.lang.String)request.getAttribute("alloy:image-viewer:loader");
java.lang.Boolean _loading = (java.lang.Boolean)request.getAttribute("alloy:image-viewer:loading");
java.lang.String _loadingEl = (java.lang.String)request.getAttribute("alloy:image-viewer:loadingEl");
java.lang.Number _maxHeight = (java.lang.Number)request.getAttribute("alloy:image-viewer:maxHeight");
java.lang.Number _maxWidth = (java.lang.Number)request.getAttribute("alloy:image-viewer:maxWidth");
java.lang.String _modal = (java.lang.String)request.getAttribute("alloy:image-viewer:modal");
java.lang.Boolean _preloadAllImages = (java.lang.Boolean)request.getAttribute("alloy:image-viewer:preloadAllImages");
java.lang.Boolean _render = (java.lang.Boolean)request.getAttribute("alloy:image-viewer:render");
java.lang.Boolean _rendered = (java.lang.Boolean)request.getAttribute("alloy:image-viewer:rendered");
java.lang.Boolean _showArrows = (java.lang.Boolean)request.getAttribute("alloy:image-viewer:showArrows");
java.lang.Boolean _showClose = (java.lang.Boolean)request.getAttribute("alloy:image-viewer:showClose");
java.lang.String _srcNode = (java.lang.String)request.getAttribute("alloy:image-viewer:srcNode");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:image-viewer:strings");
java.lang.Number _tabIndex = (java.lang.Number)request.getAttribute("alloy:image-viewer:tabIndex");
java.lang.Boolean _totalLinks = (java.lang.Boolean)request.getAttribute("alloy:image-viewer:totalLinks");
java.lang.Boolean _visible = (java.lang.Boolean)request.getAttribute("alloy:image-viewer:visible");
java.lang.String _width = (java.lang.String)request.getAttribute("alloy:image-viewer:width");
java.lang.String _afterAnim = (java.lang.String)request.getAttribute("alloy:image-viewer:afterAnim");
java.lang.String _afterAnimChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterAnimChange");
java.lang.String _afterArrowLeftElChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterArrowLeftElChange");
java.lang.String _afterArrowRightElChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterArrowRightElChange");
java.lang.String _afterBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterBoundingBoxChange");
java.lang.String _afterCaptionChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterCaptionChange");
java.lang.String _afterCaptionElChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterCaptionElChange");
java.lang.String _afterCaptionFromTitleChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterCaptionFromTitleChange");
java.lang.String _afterCenteredChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterCenteredChange");
java.lang.String _afterCloseElChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterCloseElChange");
java.lang.String _afterContentBoxChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterContentBoxChange");
java.lang.String _afterCssClassChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterCssClassChange");
java.lang.String _afterCurrentIndexChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterCurrentIndexChange");
java.lang.String _afterDestroy = (java.lang.String)request.getAttribute("alloy:image-viewer:afterDestroy");
java.lang.String _afterDestroyedChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterDestroyedChange");
java.lang.String _afterDisabledChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterDisabledChange");
java.lang.String _afterFocusedChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterFocusedChange");
java.lang.String _afterHeightChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterHeightChange");
java.lang.String _afterHideClassChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterHideClassChange");
java.lang.String _afterIdChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterIdChange");
java.lang.String _afterImageAnimChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterImageAnimChange");
java.lang.String _afterImageChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterImageChange");
java.lang.String _afterInfoElChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterInfoElChange");
java.lang.String _afterInfoTemplateChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterInfoTemplateChange");
java.lang.String _afterInit = (java.lang.String)request.getAttribute("alloy:image-viewer:afterInit");
java.lang.String _afterInitializedChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterInitializedChange");
java.lang.String _afterLinksChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterLinksChange");
java.lang.String _afterLoad = (java.lang.String)request.getAttribute("alloy:image-viewer:afterLoad");
java.lang.String _afterLoaderChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterLoaderChange");
java.lang.String _afterLoadingChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterLoadingChange");
java.lang.String _afterLoadingElChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterLoadingElChange");
java.lang.String _afterMaxHeightChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterMaxHeightChange");
java.lang.String _afterMaxWidthChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterMaxWidthChange");
java.lang.String _afterModalChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterModalChange");
java.lang.String _afterPreloadAllImagesChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterPreloadAllImagesChange");
java.lang.String _afterRenderChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterRenderChange");
java.lang.String _afterRenderedChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterRenderedChange");
java.lang.String _afterRequest = (java.lang.String)request.getAttribute("alloy:image-viewer:afterRequest");
java.lang.String _afterShowArrowsChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterShowArrowsChange");
java.lang.String _afterShowCloseChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterShowCloseChange");
java.lang.String _afterSrcNodeChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterSrcNodeChange");
java.lang.String _afterStringsChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterStringsChange");
java.lang.String _afterTabIndexChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterTabIndexChange");
java.lang.String _afterTotalLinksChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterTotalLinksChange");
java.lang.String _afterVisibleChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterVisibleChange");
java.lang.String _afterContentUpdate = (java.lang.String)request.getAttribute("alloy:image-viewer:afterContentUpdate");
java.lang.String _afterRender = (java.lang.String)request.getAttribute("alloy:image-viewer:afterRender");
java.lang.String _afterWidthChange = (java.lang.String)request.getAttribute("alloy:image-viewer:afterWidthChange");
java.lang.String _onAnim = (java.lang.String)request.getAttribute("alloy:image-viewer:onAnim");
java.lang.String _onAnimChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onAnimChange");
java.lang.String _onArrowLeftElChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onArrowLeftElChange");
java.lang.String _onArrowRightElChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onArrowRightElChange");
java.lang.String _onBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onBoundingBoxChange");
java.lang.String _onCaptionChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onCaptionChange");
java.lang.String _onCaptionElChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onCaptionElChange");
java.lang.String _onCaptionFromTitleChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onCaptionFromTitleChange");
java.lang.String _onCenteredChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onCenteredChange");
java.lang.String _onCloseElChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onCloseElChange");
java.lang.String _onContentBoxChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onContentBoxChange");
java.lang.String _onCssClassChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onCssClassChange");
java.lang.String _onCurrentIndexChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onCurrentIndexChange");
java.lang.String _onDestroy = (java.lang.String)request.getAttribute("alloy:image-viewer:onDestroy");
java.lang.String _onDestroyedChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onDestroyedChange");
java.lang.String _onDisabledChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onDisabledChange");
java.lang.String _onFocusedChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onFocusedChange");
java.lang.String _onHeightChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onHeightChange");
java.lang.String _onHideClassChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onHideClassChange");
java.lang.String _onIdChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onIdChange");
java.lang.String _onImageAnimChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onImageAnimChange");
java.lang.String _onImageChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onImageChange");
java.lang.String _onInfoElChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onInfoElChange");
java.lang.String _onInfoTemplateChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onInfoTemplateChange");
java.lang.String _onInit = (java.lang.String)request.getAttribute("alloy:image-viewer:onInit");
java.lang.String _onInitializedChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onInitializedChange");
java.lang.String _onLinksChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onLinksChange");
java.lang.String _onLoad = (java.lang.String)request.getAttribute("alloy:image-viewer:onLoad");
java.lang.String _onLoaderChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onLoaderChange");
java.lang.String _onLoadingChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onLoadingChange");
java.lang.String _onLoadingElChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onLoadingElChange");
java.lang.String _onMaxHeightChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onMaxHeightChange");
java.lang.String _onMaxWidthChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onMaxWidthChange");
java.lang.String _onModalChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onModalChange");
java.lang.String _onPreloadAllImagesChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onPreloadAllImagesChange");
java.lang.String _onRenderChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onRenderChange");
java.lang.String _onRenderedChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onRenderedChange");
java.lang.String _onRequest = (java.lang.String)request.getAttribute("alloy:image-viewer:onRequest");
java.lang.String _onShowArrowsChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onShowArrowsChange");
java.lang.String _onShowCloseChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onShowCloseChange");
java.lang.String _onSrcNodeChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onSrcNodeChange");
java.lang.String _onStringsChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onStringsChange");
java.lang.String _onTabIndexChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onTabIndexChange");
java.lang.String _onTotalLinksChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onTotalLinksChange");
java.lang.String _onVisibleChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onVisibleChange");
java.lang.String _onContentUpdate = (java.lang.String)request.getAttribute("alloy:image-viewer:onContentUpdate");
java.lang.String _onRender = (java.lang.String)request.getAttribute("alloy:image-viewer:onRender");
java.lang.String _onWidthChange = (java.lang.String)request.getAttribute("alloy:image-viewer:onWidthChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (_anim != null) {
	scopedAttributes.put("anim", _anim);
}

if (_arrowLeftEl != null) {
	scopedAttributes.put("arrowLeftEl", _arrowLeftEl);
}

if (_arrowRightEl != null) {
	scopedAttributes.put("arrowRightEl", _arrowRightEl);
}

if (_boundingBox != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (_caption != null) {
	scopedAttributes.put("caption", _caption);
}

if (_captionEl != null) {
	scopedAttributes.put("captionEl", _captionEl);
}

if (_captionFromTitle != null) {
	scopedAttributes.put("captionFromTitle", _captionFromTitle);
}

if (_centered != null) {
	scopedAttributes.put("centered", _centered);
}

if (_closeEl != null) {
	scopedAttributes.put("closeEl", _closeEl);
}

if (_contentBox != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (_cssClass != null) {
	scopedAttributes.put("cssClass", _cssClass);
}

if (_currentIndex != null) {
	scopedAttributes.put("currentIndex", _currentIndex);
}

if (_destroyed != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (_disabled != null) {
	scopedAttributes.put("disabled", _disabled);
}

if (_focused != null) {
	scopedAttributes.put("focused", _focused);
}

if (_height != null) {
	scopedAttributes.put("height", _height);
}

if (_hideClass != null) {
	scopedAttributes.put("hideClass", _hideClass);
}

if (_imageviewerId != null) {
	scopedAttributes.put("imageviewerId", _imageviewerId);
}

if (_image != null) {
	scopedAttributes.put("image", _image);
}

if (_imageAnim != null) {
	scopedAttributes.put("imageAnim", _imageAnim);
}

if (_infoEl != null) {
	scopedAttributes.put("infoEl", _infoEl);
}

if (_infoTemplate != null) {
	scopedAttributes.put("infoTemplate", _infoTemplate);
}

if (_initialized != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (_links != null) {
	scopedAttributes.put("links", _links);
}

if (_loader != null) {
	scopedAttributes.put("loader", _loader);
}

if (_loading != null) {
	scopedAttributes.put("loading", _loading);
}

if (_loadingEl != null) {
	scopedAttributes.put("loadingEl", _loadingEl);
}

if (_maxHeight != null) {
	scopedAttributes.put("maxHeight", _maxHeight);
}

if (_maxWidth != null) {
	scopedAttributes.put("maxWidth", _maxWidth);
}

if (_modal != null) {
	scopedAttributes.put("modal", _modal);
}

if (_preloadAllImages != null) {
	scopedAttributes.put("preloadAllImages", _preloadAllImages);
}

if (_render != null) {
	scopedAttributes.put("render", _render);
}

if (_rendered != null) {
	scopedAttributes.put("rendered", _rendered);
}

if (_showArrows != null) {
	scopedAttributes.put("showArrows", _showArrows);
}

if (_showClose != null) {
	scopedAttributes.put("showClose", _showClose);
}

if (_srcNode != null) {
	scopedAttributes.put("srcNode", _srcNode);
}

if (_strings != null) {
	scopedAttributes.put("strings", _strings);
}

if (_tabIndex != null) {
	scopedAttributes.put("tabIndex", _tabIndex);
}

if (_totalLinks != null) {
	scopedAttributes.put("totalLinks", _totalLinks);
}

if (_visible != null) {
	scopedAttributes.put("visible", _visible);
}

if (_width != null) {
	scopedAttributes.put("width", _width);
}

if (_afterAnim != null) {
	scopedAttributes.put("afterAnim", _afterAnim);
}

if (_afterAnimChange != null) {
	scopedAttributes.put("afterAnimChange", _afterAnimChange);
}

if (_afterArrowLeftElChange != null) {
	scopedAttributes.put("afterArrowLeftElChange", _afterArrowLeftElChange);
}

if (_afterArrowRightElChange != null) {
	scopedAttributes.put("afterArrowRightElChange", _afterArrowRightElChange);
}

if (_afterBoundingBoxChange != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
}

if (_afterCaptionChange != null) {
	scopedAttributes.put("afterCaptionChange", _afterCaptionChange);
}

if (_afterCaptionElChange != null) {
	scopedAttributes.put("afterCaptionElChange", _afterCaptionElChange);
}

if (_afterCaptionFromTitleChange != null) {
	scopedAttributes.put("afterCaptionFromTitleChange", _afterCaptionFromTitleChange);
}

if (_afterCenteredChange != null) {
	scopedAttributes.put("afterCenteredChange", _afterCenteredChange);
}

if (_afterCloseElChange != null) {
	scopedAttributes.put("afterCloseElChange", _afterCloseElChange);
}

if (_afterContentBoxChange != null) {
	scopedAttributes.put("afterContentBoxChange", _afterContentBoxChange);
}

if (_afterCssClassChange != null) {
	scopedAttributes.put("afterCssClassChange", _afterCssClassChange);
}

if (_afterCurrentIndexChange != null) {
	scopedAttributes.put("afterCurrentIndexChange", _afterCurrentIndexChange);
}

if (_afterDestroy != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (_afterDestroyedChange != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (_afterDisabledChange != null) {
	scopedAttributes.put("afterDisabledChange", _afterDisabledChange);
}

if (_afterFocusedChange != null) {
	scopedAttributes.put("afterFocusedChange", _afterFocusedChange);
}

if (_afterHeightChange != null) {
	scopedAttributes.put("afterHeightChange", _afterHeightChange);
}

if (_afterHideClassChange != null) {
	scopedAttributes.put("afterHideClassChange", _afterHideClassChange);
}

if (_afterIdChange != null) {
	scopedAttributes.put("afterIdChange", _afterIdChange);
}

if (_afterImageAnimChange != null) {
	scopedAttributes.put("afterImageAnimChange", _afterImageAnimChange);
}

if (_afterImageChange != null) {
	scopedAttributes.put("afterImageChange", _afterImageChange);
}

if (_afterInfoElChange != null) {
	scopedAttributes.put("afterInfoElChange", _afterInfoElChange);
}

if (_afterInfoTemplateChange != null) {
	scopedAttributes.put("afterInfoTemplateChange", _afterInfoTemplateChange);
}

if (_afterInit != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (_afterInitializedChange != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (_afterLinksChange != null) {
	scopedAttributes.put("afterLinksChange", _afterLinksChange);
}

if (_afterLoad != null) {
	scopedAttributes.put("afterLoad", _afterLoad);
}

if (_afterLoaderChange != null) {
	scopedAttributes.put("afterLoaderChange", _afterLoaderChange);
}

if (_afterLoadingChange != null) {
	scopedAttributes.put("afterLoadingChange", _afterLoadingChange);
}

if (_afterLoadingElChange != null) {
	scopedAttributes.put("afterLoadingElChange", _afterLoadingElChange);
}

if (_afterMaxHeightChange != null) {
	scopedAttributes.put("afterMaxHeightChange", _afterMaxHeightChange);
}

if (_afterMaxWidthChange != null) {
	scopedAttributes.put("afterMaxWidthChange", _afterMaxWidthChange);
}

if (_afterModalChange != null) {
	scopedAttributes.put("afterModalChange", _afterModalChange);
}

if (_afterPreloadAllImagesChange != null) {
	scopedAttributes.put("afterPreloadAllImagesChange", _afterPreloadAllImagesChange);
}

if (_afterRenderChange != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (_afterRenderedChange != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
}

if (_afterRequest != null) {
	scopedAttributes.put("afterRequest", _afterRequest);
}

if (_afterShowArrowsChange != null) {
	scopedAttributes.put("afterShowArrowsChange", _afterShowArrowsChange);
}

if (_afterShowCloseChange != null) {
	scopedAttributes.put("afterShowCloseChange", _afterShowCloseChange);
}

if (_afterSrcNodeChange != null) {
	scopedAttributes.put("afterSrcNodeChange", _afterSrcNodeChange);
}

if (_afterStringsChange != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (_afterTabIndexChange != null) {
	scopedAttributes.put("afterTabIndexChange", _afterTabIndexChange);
}

if (_afterTotalLinksChange != null) {
	scopedAttributes.put("afterTotalLinksChange", _afterTotalLinksChange);
}

if (_afterVisibleChange != null) {
	scopedAttributes.put("afterVisibleChange", _afterVisibleChange);
}

if (_afterContentUpdate != null) {
	scopedAttributes.put("afterContentUpdate", _afterContentUpdate);
}

if (_afterRender != null) {
	scopedAttributes.put("afterRender", _afterRender);
}

if (_afterWidthChange != null) {
	scopedAttributes.put("afterWidthChange", _afterWidthChange);
}

if (_onAnim != null) {
	scopedAttributes.put("onAnim", _onAnim);
}

if (_onAnimChange != null) {
	scopedAttributes.put("onAnimChange", _onAnimChange);
}

if (_onArrowLeftElChange != null) {
	scopedAttributes.put("onArrowLeftElChange", _onArrowLeftElChange);
}

if (_onArrowRightElChange != null) {
	scopedAttributes.put("onArrowRightElChange", _onArrowRightElChange);
}

if (_onBoundingBoxChange != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
}

if (_onCaptionChange != null) {
	scopedAttributes.put("onCaptionChange", _onCaptionChange);
}

if (_onCaptionElChange != null) {
	scopedAttributes.put("onCaptionElChange", _onCaptionElChange);
}

if (_onCaptionFromTitleChange != null) {
	scopedAttributes.put("onCaptionFromTitleChange", _onCaptionFromTitleChange);
}

if (_onCenteredChange != null) {
	scopedAttributes.put("onCenteredChange", _onCenteredChange);
}

if (_onCloseElChange != null) {
	scopedAttributes.put("onCloseElChange", _onCloseElChange);
}

if (_onContentBoxChange != null) {
	scopedAttributes.put("onContentBoxChange", _onContentBoxChange);
}

if (_onCssClassChange != null) {
	scopedAttributes.put("onCssClassChange", _onCssClassChange);
}

if (_onCurrentIndexChange != null) {
	scopedAttributes.put("onCurrentIndexChange", _onCurrentIndexChange);
}

if (_onDestroy != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (_onDestroyedChange != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (_onDisabledChange != null) {
	scopedAttributes.put("onDisabledChange", _onDisabledChange);
}

if (_onFocusedChange != null) {
	scopedAttributes.put("onFocusedChange", _onFocusedChange);
}

if (_onHeightChange != null) {
	scopedAttributes.put("onHeightChange", _onHeightChange);
}

if (_onHideClassChange != null) {
	scopedAttributes.put("onHideClassChange", _onHideClassChange);
}

if (_onIdChange != null) {
	scopedAttributes.put("onIdChange", _onIdChange);
}

if (_onImageAnimChange != null) {
	scopedAttributes.put("onImageAnimChange", _onImageAnimChange);
}

if (_onImageChange != null) {
	scopedAttributes.put("onImageChange", _onImageChange);
}

if (_onInfoElChange != null) {
	scopedAttributes.put("onInfoElChange", _onInfoElChange);
}

if (_onInfoTemplateChange != null) {
	scopedAttributes.put("onInfoTemplateChange", _onInfoTemplateChange);
}

if (_onInit != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (_onInitializedChange != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (_onLinksChange != null) {
	scopedAttributes.put("onLinksChange", _onLinksChange);
}

if (_onLoad != null) {
	scopedAttributes.put("onLoad", _onLoad);
}

if (_onLoaderChange != null) {
	scopedAttributes.put("onLoaderChange", _onLoaderChange);
}

if (_onLoadingChange != null) {
	scopedAttributes.put("onLoadingChange", _onLoadingChange);
}

if (_onLoadingElChange != null) {
	scopedAttributes.put("onLoadingElChange", _onLoadingElChange);
}

if (_onMaxHeightChange != null) {
	scopedAttributes.put("onMaxHeightChange", _onMaxHeightChange);
}

if (_onMaxWidthChange != null) {
	scopedAttributes.put("onMaxWidthChange", _onMaxWidthChange);
}

if (_onModalChange != null) {
	scopedAttributes.put("onModalChange", _onModalChange);
}

if (_onPreloadAllImagesChange != null) {
	scopedAttributes.put("onPreloadAllImagesChange", _onPreloadAllImagesChange);
}

if (_onRenderChange != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (_onRenderedChange != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
}

if (_onRequest != null) {
	scopedAttributes.put("onRequest", _onRequest);
}

if (_onShowArrowsChange != null) {
	scopedAttributes.put("onShowArrowsChange", _onShowArrowsChange);
}

if (_onShowCloseChange != null) {
	scopedAttributes.put("onShowCloseChange", _onShowCloseChange);
}

if (_onSrcNodeChange != null) {
	scopedAttributes.put("onSrcNodeChange", _onSrcNodeChange);
}

if (_onStringsChange != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (_onTabIndexChange != null) {
	scopedAttributes.put("onTabIndexChange", _onTabIndexChange);
}

if (_onTotalLinksChange != null) {
	scopedAttributes.put("onTotalLinksChange", _onTotalLinksChange);
}

if (_onVisibleChange != null) {
	scopedAttributes.put("onVisibleChange", _onVisibleChange);
}

if (_onContentUpdate != null) {
	scopedAttributes.put("onContentUpdate", _onContentUpdate);
}

if (_onRender != null) {
	scopedAttributes.put("onRender", _onRender);
}

if (_onWidthChange != null) {
	scopedAttributes.put("onWidthChange", _onWidthChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>